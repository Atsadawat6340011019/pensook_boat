import React from "react";
import { Feed } from "../components/Logged/Feed";
import { Rightbar } from "../components/Logged/Rightbar";
import { Box, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SearchMB } from "../components/Logged/Mobile/SearchMB";
import { setCommentMobile } from "../store/mobileSlice";
import { CommentMB } from "../components/Logged/Mobile/CommentMB";
export const MyPostPage = ({ setCommentData, commentData }) => {
  const dispatch = useDispatch();
  const mobileSearchToggle = useSelector((state) => state.mobile.searchMobile);
  const mobileCommentToggle = useSelector(
    (state) => state.mobile.commentMobile
  );

  return (
    <>
      <Box
        maxWidth={1000}
        sx={{
          width: "100%",
          display: { xs: "none", sm: "block" },
        }}
      >
        <Feed setCommentData={setCommentData} />
      </Box>

      <Box
        maxWidth={1000}
        sx={{
          width: "100%",
          display: { xs: "block", sm: "none", md: "none" },
        }}
      >
        <Feed setCommentData={setCommentData} />
      </Box>
      {mobileSearchToggle && <SearchMB />}
      <Modal
        open={mobileCommentToggle}
        onClose={() => dispatch(setCommentMobile(false))}
      >
        <CommentMB commentData={commentData} setCommentData={setCommentData} />
      </Modal>
      <Rightbar commentData={commentData} setCommentData={setCommentData} />
    </>
  );
};
