import { Box, Modal } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { PostStatus } from "./Feed/components/PostStatus";
import { PostCard } from "./Feed/components/PostCard";
import {
  handleGetFeed,
  handleGetKeepPost,
  handleGetMyAnonymousPost,
  handleGetMyPost,
  handleGetMyReplyPost,
} from "../../services/feedServices";
import { useDispatch } from "react-redux";
import { AddUserData } from "../../store/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { PostRichTextModal } from "./Feed/components/PostRichText/PostRichTextModal";
import { AddPostId } from "../../store/selectSlice";
import { TabSelectCard } from "./Feed/components/TabSelectCard";

export const Feed = ({ setCommentData, setRefleshKeepPost }) => {
  const ModalRef = useRef(null);
  const [feedData, setFeedData] = useState([]);
  const [selectIndexComment, setSelectIndexComment] = useState(0);
  const [richTextModalToggle, setRichTextModalToggle] = useState(false);
  const [reflesh, setReflesh] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentURL = location.pathname;

  console.log(feedData);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fectFeedData = async (token) => {
      try {
        if (currentURL === "/feed") {
          const response = await handleGetFeed(token);
          dispatch(AddUserData(response.data.session));
          setFeedData(response.data.response);
          setCommentData(response.data.response[0].commentList);
          dispatch(AddPostId(response.data.response[0].postId));
        } else if (currentURL === "/keeppost") {
          const response = await handleGetKeepPost(token);
          dispatch(AddUserData(response.data.session));
          setFeedData(response.data.response);
          setCommentData(response.data.response[0].commentList);
          dispatch(AddPostId(response.data.response[0].postId));
        } else if (currentURL === "/mypost") {
          const response = await handleGetMyPost(token);
          dispatch(AddUserData(response.data.session));
          setFeedData(response.data.response);
          setCommentData(response.data.response[0].commentList);
          dispatch(AddPostId(response.data.response[0].postId));
        } else if (currentURL === "/myanonymouspost") {
          const response = await handleGetMyAnonymousPost(token);
          dispatch(AddUserData(response.data.session));
          setFeedData(response.data.response);
          setCommentData(response.data.response[0].commentList);
          dispatch(AddPostId(response.data.response[0].postId));
        } else if (currentURL === "/myreplypost") {
          const response = await handleGetMyReplyPost(token);
          dispatch(AddUserData(response.data.session));
          setFeedData(response.data.response);
          setCommentData(response.data.response[0].commentList);
          dispatch(AddPostId(response.data.response[0].postId));
        }
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
  }, [setCommentData, dispatch, navigate, reflesh]);

  return (
    <Box flex={3} maxWidth={1000}>
      {(currentURL === "/mypost" && <TabSelectCard />) ||
        (currentURL === "/myanonymouspost" && <TabSelectCard />) ||
        (currentURL === "/myreplypost" && <TabSelectCard />)}

      <PostStatus
        ModalRef={ModalRef}
        setRichTextModalToggle={setRichTextModalToggle}
      />
      <Box
        sx={{
          mt: 1,
          maxWidth: 1000,
          height:
            currentURL === "/mypost" ||
            currentURL === "/myanonymouspost" ||
            currentURL === "/myreplypost"
              ? 700
              : 750,
          overflow: "auto",
          overflowX: "hidden",
        }}
      >
        {feedData?.map((item, index) => (
          <PostCard
            key={index}
            index={index}
            data={item}
            setCommentData={setCommentData}
            selectIndexComment={selectIndexComment}
            setSelectIndexComment={setSelectIndexComment}
            reflesh={reflesh}
            setReflesh={setReflesh}
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
          setReflesh={setReflesh}
        />
      </Modal>
    </Box>
  );
};
