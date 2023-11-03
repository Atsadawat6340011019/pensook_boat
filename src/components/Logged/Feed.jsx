import { Box, Modal } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { PostStatus } from "./Feed/components/PostStatus";
import { PostCard } from "./Feed/components/PostCard";
import { handleGetFeed } from "../../services/feedServices";
import { useDispatch } from "react-redux";
import { AddUserData } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { PostRichTextModal } from "./Feed/components/PostRichText/PostRichTextModal";

export const Feed = ({ setCommentData }) => {
  const ModalRef = useRef(null);
  const [feedData, setFeedData] = useState([]);
  const [selectIndexComment, setSelectIndexComment] = useState(0);
  const [richTextModalToggle, setRichTextModalToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(richTextModalToggle);
  console.log(feedData);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fectFeedData = async (token) => {
      try {
        const response = await handleGetFeed(token);
        dispatch(AddUserData(response.data.session));
        setFeedData(response.data.response);
        setCommentData(response.data.response[0].commentList);
      } catch (error) {
        const { response } = error;
        console.error("เกิดข้อผิดพลาด :", response?.data.error);
        if (response?.data.error === "Token not found") {
          localStorage.removeItem("token");
          navigate("/");
        }
      }
    };

    fectFeedData(token);
  }, [setCommentData, dispatch, navigate]);

  return (
    <Box flex={3}>
      <PostStatus
        ModalRef={ModalRef}
        setRichTextModalToggle={setRichTextModalToggle}
      />
      <Box sx={{ mt: 1, height: 750, overflow: "auto" }}>
        {feedData?.map((item, index) => (
          <PostCard
            key={index}
            index={index}
            data={item}
            setCommentData={setCommentData}
            selectIndexComment={selectIndexComment}
            setSelectIndexComment={setSelectIndexComment}
          />
        ))}
      </Box>
      <Modal
        open={richTextModalToggle}
        onClose={() => setRichTextModalToggle(false)}
      >
        <PostRichTextModal
          ModalRef={ModalRef}
          onClose={() => setRichTextModalToggle(false)}
        />
      </Modal>
    </Box>
  );
};
