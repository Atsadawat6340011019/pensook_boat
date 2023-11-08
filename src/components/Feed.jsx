import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PostStatus } from "./Feed/components/PostStatus";
import { PostCard } from "./Feed/components/PostCard";
import { handleGetFeed } from "../services/getDataServices";

export const Feed = ({ setCommentData, setKeepPostData }) => {
  const [feedData, setFeedData] = useState([]);
  const [selectIndexComment, setSelectIndexComment] = useState(0);

  useEffect(() => {
    const fectFeedData = async () => {
      try {
        const response = await handleGetFeed();
        setFeedData(response.data.response);
        setKeepPostData(response.data.response);
        setCommentData(response.data.response[0].commentList);
      } catch (error) {
        console.error("เกิดข้อผิดพลาด :", error);
      }
    };

    fectFeedData();
  }, [setCommentData, setKeepPostData]);

  return (
    <Box flex={3} maxWidth={750}>
      <PostStatus />
      <Box sx={{ mt: 1, maxWidth: 750, height: 760, overflow: "auto" }}>
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
    </Box>
  );
};
