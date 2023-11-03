import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import LogoPensook from "../../../../assets/PENSOOK_logo_32.png";
import { ArrowDropUp, CommentOutlined } from "@mui/icons-material";
import parse from "html-react-parser";
import { formatTimestamp } from "../../../../utils/functions";
import { ImageShow } from "./PostCard/ImageShow";
import { ImageSlideShow } from "./PostCard/ImageSlideShow";

export const PostCard = ({
  data,
  index,
  setCommentData,
  selectIndexComment,
  setSelectIndexComment,
}) => {
  const [showMore, setShowMore] = useState(false);
  const [imageSelect, setImageSelect] = useState();

  return (
    <Box
      bgcolor="#fff"
      sx={{
        px: 2,
        py: 1.5,
        borderRadius: "8px",
        mb: 1,
        position: "relative",
      }}
    >
      {selectIndexComment === index && (
        <Box
          sx={{
            position: "absolute",
            bgcolor: "#007DFC",
            height: 7,
            width: "100%",
            top: 0,
            ml: -2,
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        ></Box>
      )}
      <Box sx={{ display: "flex" }}>
        <img
          src={data.isAnonymous ? LogoPensook : data.userImagePath}
          width={40}
          height={40}
          style={{ borderRadius: "50%", objectFit: "cover" }}
          alt="avatar"
          referrerPolicy="no-referrer"
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
      <Typography sx={{ fontWeight: "600", fontSize: 18, mt: 2 }}>
        {data.label}
      </Typography>
      <Box sx={{ fontWeight: "400", fontSize: 16, mt: 2 }}>
        {showMore ? parse(data.content) : parse(data.content.substring(0, 200))}
        <span
          style={{ cursor: "pointer", color: "#007DFC" }}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "แสดงน้อยลง" : "ดูเพิ่มเติม"}
        </span>
      </Box>
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

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button
          startIcon={<ArrowDropUp sx={{ width: 30, height: 30 }} />}
          sx={{
            border: "1px solid #000",
            borderRadius: "8px",
            color: "#000",
            height: 32,
            "&:hover": {
              bgcolor: "#ededed",
            },
          }}
        >
          {data.upVote} Up Vote
        </Button>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            sx={{
              width: 30,
              height: 30,
              "&:hover": {
                bgcolor: "#ededed",
              },
            }}
            onClick={() => {
              setCommentData(data.commentList);
              setSelectIndexComment(index);
            }}
          >
            <CommentOutlined
              sx={{
                width: 20,
                height: 20,
                color: "#000",
              }}
            />
          </IconButton>

          <Typography sx={{ fontWeight: "400", fontSize: 16, ml: 2 }}>
            {data.commentList.length}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
