import React from "react";
import { Feed } from "../components/Logged/Feed";
import { Rightbar } from "../components/Logged/Rightbar";
export const FeedAndCommentsPage = ({ setCommentData, commentData }) => {
  return (
    <>
      <Feed setCommentData={setCommentData} />
      <Rightbar commentData={commentData} />
    </>
  );
};