import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import LogoPensook from "../../../assets/PENSOOK_logo_32.png";
import parse from "html-react-parser";
import { formatTimestamp } from "../../../utils/functions";
import { ImageShow } from "./PostCard/ImageShow";
import { ImageSlideShow } from "./PostCard/ImageSlideShow";
import "./PostCard.css";
import { useNavigate } from "react-router-dom";
import { CiFaceSmile } from "react-icons/ci";
import { TfiCommentAlt } from "react-icons/tfi";

export const PostCard = ({
  data,
  setCommentData,
  index,
  selectIndexComment,
  setSelectIndexComment,
}) => {
  const [showMore, setShowMore] = useState(false);
  const [imageSelect, setImageSelect] = useState();
  const navigate = useNavigate();

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
      <Typography
        sx={{ fontWeight: "600", fontSize: 18, mt: 2, wordBreak: "break-word" }}
      >
        {data.label}
      </Typography>
      <Box sx={{ fontWeight: "400", fontSize: 16, mt: 2 }} className="test">
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
      </Box>
      {!showMore && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: data.attachImageList.length > 1 ? 630 : "100%",
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

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            sx={{
              width: 35,
              height: 35,
              "&:hover": {
                bgcolor: "#ededed",
              },
            }}
            onClick={() => {
              setCommentData(data.commentList);
              setSelectIndexComment(index);
            }}
          >
            <TfiCommentAlt size={35} color="#000" />
          </IconButton>

          <Typography sx={{ fontWeight: "400", fontSize: 16, ml: 2 }}>
            {data.commentList.length}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
