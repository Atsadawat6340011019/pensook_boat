import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LogoPensook from "../../../assets/PENSOOK_logo_32.png";
import { ReplyCommentCardSecond } from "./ReplyCommentCardSecond";
import parse from "html-react-parser";
import { formatTimestamp } from "../../../utils/functions";
import "./CommentCard.css";
import { ImageShow } from "./CommentImageShow/ImageShow";
import { ImageSlideShow } from "./CommentImageShow/ImageSlideShow";
import { TfiCommentAlt } from "react-icons/tfi";
import { CiFaceSmile } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export const ReplyCommentCard = ({ data }) => {
  const [replyCommentToggle, setReplyCommentToggle] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [imageSelect, setImageSelect] = useState();
  const navigate = useNavigate();
  
  return (
    <Box mb={1}>
      <Box sx={{ display: "flex" }}>
        <Avatar
          src={data.isAnonymous ? LogoPensook : data.userImagePath}
          sx={{ width: 40, height: 40 }}
          alt="avatar"
        />

        <Box sx={{ ml: 2 }}>
          <Typography sx={{ fontWeight: "500", fontSize: 16 }}>
            {data.isAnonymous ? "สมาชิกไม่เปิดเผยตัวตน" : data.fullName}
          </Typography>
          <Typography
            sx={{ fontWeight: "400", fontSize: 10, color: "#808080" }}
          >
            {formatTimestamp(data.createTime)}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 2, pl: 7 }}>
        <Typography
          sx={{ fontWeight: "400", fontSize: 16 }}
          className="testComment"
        >
          {showMore
            ? parse(data.content)
            : parse(data.contentText.substring(0, 250))}
          {data.content?.length > 250 && (
            <span
              style={{ cursor: "pointer", color: "#007DFC" }}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "แสดงน้อยลง" : "แสดงเพิ่มเติม"}
            </span>
          )}
        </Typography>
        {!showMore && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                maxWidth: 600,
              }}
            >
              {!imageSelect && (
                <ImageShow
                  imageData={data.attachImageList}
                  setImageSelect={setImageSelect}
                />
              )}
              {imageSelect && (
                <ImageSlideShow
                  imageData={data.attachImageList}
                  imageSelectData={imageSelect}
                  setImageSelect={setImageSelect}
                />
              )}
            </Box>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",

          px: 7,
          py: 2,
        }}
      >
        <Button
          startIcon={<CiFaceSmile size={25} />}
          sx={{
            border: "1px solid #000",
            borderRadius: "8px",
            color: "#000",
            height: 32,
            "&:hover": {
              bgcolor: "#ededed",
            },
          }}
          onClick={() => navigate("/login")}
        >
          {data.upVote}
        </Button>
        <Box sx={{ display: "flex", alignItems: "center", height: 30 }}>
          <IconButton
            sx={{
              width: 35,
              height: 35,
              "&:hover": {
                bgcolor: "#ededed",
              },
            }}
            onClick={() => setReplyCommentToggle(!replyCommentToggle)}
          >
            <TfiCommentAlt size={35} color="#000" />
          </IconButton>
          <Typography sx={{ fontWeight: "400", fontSize: 16, ml: 2 }}>
            {data.commentList.length}
          </Typography>
        </Box>
      </Box>
      <Divider />
      {replyCommentToggle &&
        data?.commentList &&
        data.commentList.length > 0 && (
          <Box sx={{ pl: 8, mt: 1 }}>
            {data?.commentList.map((item, index) => (
              <ReplyCommentCardSecond key={index} data={item} />
            ))}
          </Box>
        )}
    </Box>
  );
};
