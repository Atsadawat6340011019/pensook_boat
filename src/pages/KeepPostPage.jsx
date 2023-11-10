import React from "react";
import { Feed } from "../components/Logged/Feed";
import { Rightbar } from "../components/Logged/Rightbar";
export const KeepPostPage = ({ setCommentData, commentData }) => {
  return (
    <>
      <Feed setCommentData={setCommentData} />
      <Rightbar commentData={commentData} setCommentData={setCommentData} />
    </>
  );
};
