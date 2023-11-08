import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LogoPensook from "../../../../assets/PENSOOK_logo_32.png";
import {
  ArrowDropDown,
  ArrowDropUp,
  BookmarkBorderOutlined,
  CommentOutlined,
} from "@mui/icons-material";
import parse from "html-react-parser";
import { formatTimestamp } from "../../../../utils/functions";
import { ImageShow } from "./PostCard/ImageShow";
import { ImageSlideShow } from "./PostCard/ImageSlideShow";
import "./PostCard.css";
import { PiShareFat } from "react-icons/pi";
import {
  handleDownVotePost,
  handleUnVotePost,
  handleUpVotePost,
} from "../../../../services/feedServices";

export const PostCard = ({
  data,
  index,
  setCommentData,
  selectIndexComment,
  setSelectIndexComment,
  reflesh,
}) => {
  const token = localStorage.getItem("token");
  const [showMore, setShowMore] = useState(false);
  const [imageSelect, setImageSelect] = useState();
  const [voteValue, setVoteValue] = useState();
  const [upVoteCountCurrent, setUpVoteCountCurrent] = useState(0);
  console.log(voteValue);

  useEffect(() => {
    if (voteValue === "Up") {
      const handleVote = async () => {
        const vote = await handleUpVotePost(token, data?.postId);
        console.log(vote);
        if (data?.voteCurrent === "Up") {
          setUpVoteCountCurrent(0);
        } else {
          setUpVoteCountCurrent(1);
        }
      };
      handleVote();
    } else if (voteValue === "Down") {
      const handleVote = async () => {
        const vote = await handleDownVotePost(token, data?.postId);
        console.log(vote);
        if (data?.voteCurrent === "Down") {
          setUpVoteCountCurrent(0);
        } else if (data?.upVote > 0) {
          setUpVoteCountCurrent(-1);
        } else {
          setUpVoteCountCurrent(0);
        }
      };
      handleVote();
    } else if (voteValue === "unvote") {
      const handleVote = async () => {
        const vote = await handleUnVotePost(token, data?.postId);
        console.log(vote);
        if (data?.voteCurrent === null) {
          setUpVoteCountCurrent(0);
        } else if (data?.upVote > 0) {
          setUpVoteCountCurrent(-1);
        } else {
          setUpVoteCountCurrent(0);
        }
      };
      handleVote();
    }
  }, [voteValue]);

  useEffect(() => {
    setVoteValue("");
    setUpVoteCountCurrent(0);
  }, [reflesh]);

  const handleChangeVote = (value) => {
    console.log("defualtValue", data?.voteCurrent);
    console.log("valueClick", value);
    console.log("votevale", voteValue);
    if (value === (voteValue || data?.voteCurrent)) {
      setVoteValue("unvote");
    } else {
      setVoteValue(value);
    }
  };

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
      <Box maxWidth={850}>
        <Typography
          sx={{ fontWeight: "600", fontSize: 18, mt: 2 }}
          style={{ wordWrap: "break-word" }}
        >
          {data.label}
        </Typography>
      </Box>
      <Box sx={{ fontWeight: "400", fontSize: 16, mt: 2 }} className="test">
        {showMore ? parse(data.content) : parse(data.content.substring(0, 250))}
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

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            startIcon={<ArrowDropUp sx={{ width: 30, height: 30 }} />}
            sx={{
              border: "1px solid #bfbfbf",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
              color: voteValue
                ? voteValue === "Up"
                  ? "#007DFC"
                  : "#000"
                : data?.voteCurrent === "Up"
                ? "#007DFC"
                : "#000",
              bgcolor: voteValue
                ? voteValue === "Up"
                  ? "#E4F1FF"
                  : ""
                : data?.voteCurrent === "Up"
                ? "#E4F1FF"
                : "",
              height: 32,
              "&:hover": {
                bgcolor: voteValue
                  ? voteValue === "Up"
                    ? "#E4F1FF"
                    : "#ededed"
                  : data?.voteCurrent === "Up"
                  ? "#E4F1FF"
                  : "#ededed",
              },
            }}
            onClick={() => handleChangeVote("Up")}
          >
            {data.upVote + upVoteCountCurrent} Up Vote
          </Button>
          <Button
            sx={{
              border: "1px solid #bfbfbf",
              borderTopRightRadius: "8px",
              borderBottomRightRadius: "8px",
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
              color: voteValue
                ? voteValue === "Down"
                  ? "#FF0000"
                  : "#000"
                : data?.voteCurrent === "Down"
                ? "#FF0000"
                : "#000",
              bgcolor: voteValue
                ? voteValue === "Down"
                  ? "#FFE9E9"
                  : ""
                : data?.voteCurrent === "Down"
                ? "#FFE9E9"
                : "",
              minWidth: 10,
              height: 32,
              padding: 0,
              "&:hover": {
                bgcolor: voteValue
                  ? voteValue === "Down"
                    ? "#FFE9E9"
                    : "#ededed"
                  : data?.voteCurrent === "Down"
                  ? "#FFE9E9"
                  : "#ededed",
              },
            }}
            onClick={() => handleChangeVote("Down")}
          >
            <ArrowDropDown sx={{ width: 30, height: 30 }} />
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
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
              {data?.commentList?.length}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <IconButton
              sx={{
                width: 30,
                height: 30,
                "&:hover": {
                  bgcolor: "#ededed",
                },
              }}
            >
              <BookmarkBorderOutlined
                sx={{
                  width: 25,
                  height: 25,
                  color: "#000",
                }}
              />
            </IconButton>

            <Typography sx={{ fontWeight: "400", fontSize: 16, ml: 1 }}>
              {data?.keepCount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <IconButton
              sx={{
                width: 40,
                height: 40,
                "&:hover": {
                  bgcolor: "#ededed",
                },
              }}
            >
              <PiShareFat color="#000" size={"60px"} />
            </IconButton>

            <Typography sx={{ fontWeight: "500", fontSize: 16, ml: 1 }}>
              แชร์
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
