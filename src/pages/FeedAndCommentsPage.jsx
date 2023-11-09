import React from "react";
import { Feed } from "../components/Logged/Feed";
import { Rightbar } from "../components/Logged/Rightbar";
export const FeedAndCommentsPage = ({
  setCommentData,
  commentData,
  setRefleshKeepPost,
}) => {
  return (
    <>
      <Feed
        setCommentData={setCommentData}
        setRefleshKeepPost={setRefleshKeepPost}
      />
      <Rightbar commentData={commentData} setCommentData={setCommentData} />
    </>
  );
};
