import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LogoPensook from "../../../../assets/PENSOOK_logo_32.png";
import {
  ArrowDropDown,
  ArrowDropUp,
  CommentOutlined,
} from "@mui/icons-material";
import { ReplyCommentCardSecond } from "./ReplyCommentCardSecond";
import { ImageShow } from "./CommentImageShow/ImageShow";
import { ImageSlideShow } from "./CommentImageShow/ImageSlideShow";
import parse from "html-react-parser";
import { formatTimestamp } from "../../../../utils/functions";
import { useDispatch } from "react-redux";
import { AddCommentId } from "../../../../store/selectSlice";
import {
  handleDownVoteComment,
  handleUnVoteComment,
  handleUpVoteComment,
} from "../../../../services/feedServices";
import "./CommentCard.css";

export const ReplyCommentCard = ({ data, setRichTextModalToggle }) => {
  const token = localStorage.getItem("token");
  const [replyCommentToggle, setReplyCommentToggle] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [imageSelect, setImageSelect] = useState();
  const [voteValue, setVoteValue] = useState();
  const [upVoteCountCurrent, setUpVoteCountCurrent] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (voteValue === "Up") {
      const handleVote = async () => {
        const vote = await handleUpVoteComment(token, data?.commentId);
        console.log(vote);
        if (vote.response.status === "success") {
          setUpVoteCountCurrent(vote.response.result.upVote.toString());
        }
      };
      handleVote();
    } else if (voteValue === "Down") {
      const handleVote = async () => {
        const vote = await handleDownVoteComment(token, data?.commentId);
        console.log(vote);
        if (vote.response.status === "success") {
          setUpVoteCountCurrent(vote.response.result.upVote.toString());
        }
      };
      handleVote();
    } else if (voteValue === "unvote") {
      const handleVote = async () => {
        const vote = await handleUnVoteComment(token, data?.commentId);
        console.log(vote);
        if (vote.response.status === "success") {
          setUpVoteCountCurrent(vote.response.result.upVote.toString());
        }
      };
      handleVote();
    }
  }, [voteValue]);

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
            : parse(data.content.substring(0, 250))}
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
        <Box>
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
            {upVoteCountCurrent ? upVoteCountCurrent : data?.upVote} Up Vote
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
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", height: 30 }}>
          <IconButton
            sx={{
              width: 30,
              height: 30,
              "&:hover": {
                bgcolor: "#ededed",
              },
            }}
            onClick={() => setReplyCommentToggle(!replyCommentToggle)}
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
      <Typography
        align="right"
        sx={{
          fontSize: 14,
          color: "#007DFC",
          cursor: "pointer",
          "&:hover": {
            textDecoration: "underline",
            fontWeight: "500",
          },
          mr: 7,
          mb: 1,
        }}
        onClick={() => {
          dispatch(AddCommentId(data?.commentId));
          setRichTextModalToggle(true);
        }}
      >
        ตอบกลับ
      </Typography>
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
