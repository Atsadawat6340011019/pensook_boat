import {
  Box,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LogoPensook from "../../../../assets/PENSOOK_logo_32.png";
import {
  ArrowDropDown,
  ArrowDropUp,
  Bookmark,
  BookmarkBorderOutlined,
  CheckCircleOutline,
  CommentOutlined,
  EditOutlined,
} from "@mui/icons-material";
import parse from "html-react-parser";
import { formatTimestamp } from "../../../../utils/functions";
import { ImageShow } from "./PostCard/ImageShow";
import { ImageSlideShow } from "./PostCard/ImageSlideShow";
import "./PostCard.css";
import { PiShareFat } from "react-icons/pi";
import {
  handleDeletePost,
  handleDownVotePost,
  handleKeepPost,
  handleUnKeepPost,
  handleUnVotePost,
  handleUpVotePost,
} from "../../../../services/feedServices";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UpdateData } from "../../../../store/userSlice";
import SharePostDialog from "./PostDialog/sharePostDialog";
import ReportDialog from "./PostDialog/reportDialog";
import { MoreHoriz } from "@mui/icons-material";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { AddPostId } from "../../../../store/selectSlice";
import { RiDeleteBin6Line } from "react-icons/ri";

export const PostCard = ({
  data,
  index,
  setCommentData,
  selectIndexComment,
  setSelectIndexComment,
  reflesh,
  setReflesh,
}) => {
  const token = localStorage.getItem("token");
  const userData = useSelector((state) => state.user.userData);
  const [showMore, setShowMore] = useState(false);
  const [imageSelect, setImageSelect] = useState();
  const [voteValue, setVoteValue] = useState();
  const [upVoteCountCurrent, setUpVoteCountCurrent] = useState();
  const [keepPostValue, setKeepPostValue] = useState();
  const [keepPostCountCurrent, setKeepPostCountCurrent] = useState(0);
  const dispatch = useDispatch();
  const location = useLocation();
  const currentURL = location.pathname;
  const resultKeep = data?.isKeep ? "t" : "f";
  const [open, setOpen] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogToggle, setDialogToggle] = useState(false);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenReport(true);
  };

  const handleMenuClosed = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (voteValue === "Up") {
      const handleVote = async () => {
        const vote = await handleUpVotePost(token, data?.postId);
        console.log(vote);
        if (vote.response.status === "success") {
          setUpVoteCountCurrent(vote.response.result.upVote.toString());
        }
      };
      handleVote();
    } else if (voteValue === "Down") {
      const handleVote = async () => {
        const vote = await handleDownVotePost(token, data?.postId);
        console.log(vote);
        if (vote.response.status === "success") {
          setUpVoteCountCurrent(vote.response.result.upVote.toString());
        }
      };
      handleVote();
    } else if (voteValue === "unvote") {
      const handleVote = async () => {
        const vote = await handleUnVotePost(token, data?.postId);
        console.log(vote);
        if (vote.response.status === "success") {
          setUpVoteCountCurrent(vote.response.result.upVote.toString());
        }
      };
      handleVote();
    }
  }, [voteValue]);

  useEffect(() => {
    if (keepPostValue === "t") {
      const handleKeepPostFinal = async () => {
        const keepPost = await handleKeepPost(token, data?.postId);
        console.log(keepPost);
        if (keepPost.response.status === "success") {
          setKeepPostCountCurrent(
            keepPost.response.result.keepCount.toString()
          );
          dispatch(UpdateData(Math.floor(Math.random() * 101)));
        }
      };
      handleKeepPostFinal();
    } else if (keepPostValue === "f") {
      const handleKeepPostFinal = async () => {
        const keepPost = await handleUnKeepPost(token, data?.postId);
        console.log("Unkeep");
        console.log(keepPost);
        if (keepPost.response.status === "success") {
          setKeepPostCountCurrent(
            keepPost.response.result.keepCount.toString()
          );
          dispatch(UpdateData(Math.floor(Math.random() * 101)));
          if (keepPost.response.result.isKeep === false) {
            if (currentURL === "/keeppost") {
              setReflesh(Math.floor(Math.random() * 101));
            }
          }
        }
      };
      handleKeepPostFinal();
    }
  }, [keepPostValue]);

  useEffect(() => {
    setVoteValue("");
    setUpVoteCountCurrent(0);
    setKeepPostValue("");
    setKeepPostCountCurrent(0);
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

  const handleChangeKeepPost = (value) => {
    const result = data?.isKeep ? "t" : "f";
    if (value === (keepPostValue || result)) {
      setKeepPostValue("f");
    } else {
      setKeepPostValue(value);
    }
  };

  const handleRemovePost = async () => {
    const deletePost = await handleDeletePost(token, data?.postId);
    console.log(deletePost);
    if (deletePost.response.status === "success") {
      setReflesh(Math.floor(Math.random() * 100) + 1);
      setDialogToggle(true);
      setTimeout(() => {
        setDialogToggle(false);
      }, 4000);
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
      <IconButton
        aria-controls="post-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        style={{ position: "absolute", top: 10, right: 10 }}
      >
        <MoreHoriz />
      </IconButton>
      {userData?.userId !== data?.userId && (
        <Menu
          id="post-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClosed}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <div
            style={{
              width: "317px",
              height: "60px",
            }}
          >
            <div
              style={{
                paddingLeft: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "90%",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "26px",
              }}
            >
              เพิ่มเติม
              <IconButton
                color="inherit"
                onClick={handleMenuClosed}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <MenuItem
            onClick={handleMenuClose}
            style={{
              width: "317px",
              height: "50px",
            }}
          >
            <ReportOutlinedIcon />
            <div
              style={{
                paddingLeft: "5px",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "26px",
              }}
            >
              รายงาน
            </div>
          </MenuItem>
        </Menu>
      )}

      {userData?.userId === data?.userId && (
        <Menu
          id="post-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClosed}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <div
            style={{
              width: "317px",
              height: "60px",
            }}
          >
            <div
              style={{
                paddingLeft: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "90%",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "26px",
              }}
            >
              เพิ่มเติม
              <IconButton
                color="inherit"
                onClick={handleMenuClosed}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <MenuItem
            onClick={handleMenuClose}
            style={{
              width: "317px",
              height: "50px",
            }}
          >
            <EditOutlined />
            <div
              style={{
                paddingLeft: "5px",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "26px",
              }}
            >
              แก้ไขโพสต์
            </div>
          </MenuItem>
          <MenuItem
            onClick={handleRemovePost}
            style={{
              width: "317px",
              height: "50px",
            }}
          >
            <RiDeleteBin6Line size={20} />
            <div
              style={{
                paddingLeft: "10px",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "26px",
              }}
            >
              ลบโพสต์
            </div>
          </MenuItem>
        </Menu>
      )}

      <ReportDialog
        open={openReport}
        onClose={() => setOpenReport(false)}
        postId={data?.postId}
      />

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
                setCommentData(data?.commentList);
                setSelectIndexComment(index);
                dispatch(AddPostId(data?.postId));
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
              onClick={() => handleChangeKeepPost("t")}
            >
              {keepPostValue ? (
                keepPostValue === "t" ? (
                  <Bookmark
                    sx={{
                      width: 25,
                      height: 25,
                      color: "#000",
                    }}
                  />
                ) : (
                  <BookmarkBorderOutlined
                    sx={{
                      width: 25,
                      height: 25,
                      color: "#000",
                    }}
                  />
                )
              ) : resultKeep === "t" ? (
                <Bookmark
                  sx={{
                    width: 25,
                    height: 25,
                    color: "#000",
                  }}
                />
              ) : (
                <BookmarkBorderOutlined
                  sx={{
                    width: 25,
                    height: 25,
                    color: "#000",
                  }}
                />
              )}
            </IconButton>

            <Typography sx={{ fontWeight: "400", fontSize: 16, ml: 1 }}>
              {keepPostCountCurrent ? keepPostCountCurrent : data?.keepCount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <IconButton
              onClick={handleClick}
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
            <SharePostDialog
              open={open}
              onClose={() => setOpen(false)}
              postId={data?.postId}
            />

            <Typography sx={{ fontWeight: "500", fontSize: 16, ml: 1 }}>
              แชร์
            </Typography>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={dialogToggle}
        sx={{
          "& .MuiPaper-root": { borderRadius: "8px" },
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 5,
            px: 8,
          }}
        >
          <CheckCircleOutline
            sx={{
              width: 63,
              height: 63,
              color: "#75f24c",
            }}
          />
          <DialogContentText
            id="alert-dialog-description"
            align="center"
            sx={{ fontSize: 24 }}
          >
            ลบโพสต์สำเร็จ
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
