import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CommentCard } from "./Rightbar/components/CommentCard";
import { PostRichTextModal } from "./Rightbar/components/PostRichText/PostRichTextModal";
import { CommentStatus } from "./Rightbar/components/CommentStatus";
import { handleGetComment } from "../../services/feedServices";
import { useDispatch, useSelector } from "react-redux";
import { AddUserData } from "../../store/userSlice";
import { CheckSecondComment } from "../../store/selectSlice";

export const Rightbar = ({ commentData, setCommentData }) => {
  const token = localStorage.getItem("token");
  const [richTextModalToggle, setRichTextModalToggle] = useState(false);
  const postId = useSelector((state) => state.select.postIdSelect);
  const updateComment = useSelector((state) => state.user.updateCommentData);
  const dispatch = useDispatch();
  console.log(postId);
  console.log(commentData);
  console.log(updateComment);

  useEffect(() => {
    const fecthData = async () => {
      const response = await handleGetComment(token, postId);
      console.log(response);
      dispatch(AddUserData(response.data.session));
      setCommentData(response.data.response);
    };
    if (updateComment && postId) {
      fecthData();
    }
  }, [updateComment]);
  return (
    <Box
      flex={2}
      sx={{ display: { xs: "none", sm: "block" }, position: "relative" }}
      maxWidth={500}
    >
      <Box
        bgcolor="#fff"
        sx={{
          height: 830,
          borderRadius: "8px",
        }}
      >
        <Typography
          sx={{ fontWeight: "500", fontSize: 18, pt: 6, pl: 4, pb: 2 }}
        >
          ความคิดเห็น
        </Typography>
        <Box
          sx={{
            px: 2,
            height: 680,
            overflow: "auto",
            ...(commentData?.length === 0 && {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }),
          }}
        >
          {commentData?.length > 0 ? (
            commentData?.map((item, index) => (
              <CommentCard
                key={index}
                data={item}
                setRichTextModalToggle={setRichTextModalToggle}
              />
            ))
          ) : (
            <Typography align="center" sx={{ fontSize: 18, fontWeight: "500" }}>
              ยังไม่มีความคิดเห็น
            </Typography>
          )}
        </Box>
        <CommentStatus setRichTextModalToggle={setRichTextModalToggle} />
      </Box>
      <Modal
        open={richTextModalToggle}
        onClose={() => {
          setRichTextModalToggle(false);
          dispatch(CheckSecondComment(false));
        }}
      >
        <PostRichTextModal onClose={() => setRichTextModalToggle(false)} />
      </Modal>
    </Box>
  );
};
