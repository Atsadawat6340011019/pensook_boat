import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PostStatus } from "./Feed/components/PostStatus";
import { PostCard } from "./Feed/components/PostCard";
import {
  handleGetFeed,
  handleGetFeedWithPostId,
} from "../services/getDataServices";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { SEO } from "../utils/SEO";

export const Feed = ({ setCommentData, setKeepPostData }) => {
  const token = localStorage.getItem("token");
  const postIdSelect = useSelector((state) => state.select.postIdSelect);
  const [feedData, setFeedData] = useState([]);
  const [selectIndexComment, setSelectIndexComment] = useState(0);
  const { id } = useParams();
  const location = useLocation();
  const currentURL = location.pathname;

  useEffect(() => {
    const fectFeedData = async () => {
      if (id) {
        try {
          const response = await handleGetFeedWithPostId(id);
          setFeedData(response.data.response);
          setCommentData(response.data.response[0].commentList);
        } catch (error) {
          console.error("เกิดข้อผิดพลาด :", error.error);
        }
      } else {
        try {
          const response = await handleGetFeed();
          setFeedData(response.data.response);
          setCommentData(response.data.response[0].commentList);
        } catch (error) {
          console.error("เกิดข้อผิดพลาด :", error.error);
        }
      }
    };

    const fetchFeedDataPost = async () => {
      try {
        const response = await handleGetFeed();
        setKeepPostData(response.data.response);
      } catch (error) {
        console.error("เกิดข้อผิดพลาด :", error.error);
      }
    };

    fectFeedData();
    fetchFeedDataPost();
  }, [setCommentData, setKeepPostData, postIdSelect]);

  return (
    <Box flex={3} maxWidth={1000}>
      {currentURL.includes("/") && id ? (
        <SEO
          title={feedData[0]?.label}
          description={feedData[0]?.contentText}
          image={feedData[0]?.attachImageList[0]}
        />
      ) : (
        <SEO
          title="Pensook Social"
          description="ชีวิตดี ๆ เริ่มต้นที่เป็นสุข"
        />
      )}

      <PostStatus />
      <Box sx={{ mt: 1, height: 760, overflow: "auto" }}>
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
