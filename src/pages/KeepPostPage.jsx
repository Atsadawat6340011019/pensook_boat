import React from "react";
import { Feed } from "../components/Logged/Feed";
import { Rightbar } from "../components/Logged/Rightbar";
import { Box } from "@mui/material";
export const KeepPostPage = ({ setCommentData, commentData }) => {
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

      <Rightbar commentData={commentData} setCommentData={setCommentData} />
    </>
  );
};
