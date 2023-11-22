import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import LogoPensook from "../../../../assets/PENSOOK_logo_32.png";
import { ReplyCommentCardSecond } from "./ReplyCommentCardSecond";
import { ImageShow } from "./CommentImageShow/ImageShow";
import { ImageSlideShow } from "./CommentImageShow/ImageSlideShow";
import parse from "html-react-parser";
import { formatTimestamp } from "../../../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import {
  AddCommentId,
  CheckSecondComment,
} from "../../../../store/selectSlice";
import {
  handleDeleteComment,
  handleDownVoteComment,
  handleUnVoteComment,
  handleUpVoteComment,
} from "../../../../services/feedServices";
import "./CommentCard.css";
import { CiFaceSmile } from "react-icons/ci";
import { PiSmileySadThin } from "react-icons/pi";
import { TfiCommentAlt } from "react-icons/tfi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { UpdataCommentData } from "../../../../store/userSlice";
import {
  CheckCircleOutline,
  Close,
  EditOutlined,
  MoreHoriz,
  ReportOutlined,
} from "@mui/icons-material";

const GrayTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#F1F1F1",
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}));

export const ReplyCommentCard = ({
  data,
  setRichTextModalToggle,
  setRichTextEditModalToggle,
  setHtmlContent,
  setOpenReport,
}) => {
  const token = localStorage.getItem("token");
  const userData = useSelector((state) => state.user.userData);
  const [replyCommentToggle, setReplyCommentToggle] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [imageSelect, setImageSelect] = useState();
  const [voteValue, setVoteValue] = useState();
  const [upVoteCountCurrent, setUpVoteCountCurrent] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogToggle, setDialogToggle] = useState(false);
  const dispatch = useDispatch();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClosed = () => {
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenReport(true);
  };

  useEffect(() => {
    if (voteValue === "Up") {
      const handleVote = async () => {
        try {
          const vote = await handleUpVoteComment(token, data?.commentId);
          console.log(vote);
          if (vote.response.status === "success") {
            setUpVoteCountCurrent(vote.response.result.upVote.toString());
          }
        } catch (error) {
          console.log(error.error);
        }
      };
      handleVote();
    } else if (voteValue === "Down") {
      const handleVote = async () => {
        try {
          const vote = await handleDownVoteComment(token, data?.commentId);
          console.log(vote);
          if (vote.response.status === "success") {
            setUpVoteCountCurrent(vote.response.result.upVote.toString());
          }
        } catch (error) {
          console.log(error.error);
        }
      };
      handleVote();
    } else if (voteValue === "unvote") {
      const handleVote = async () => {
        try {
          const vote = await handleUnVoteComment(token, data?.commentId);
          console.log(vote);
          if (vote.response.status === "success") {
            setUpVoteCountCurrent(vote.response.result.upVote.toString());
          }
        } catch (error) {
          console.log(error.error);
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

  const handleRemoveComment = async () => {
    try {
      const deletePost = await handleDeleteComment(token, data?.commentId);
      console.log(deletePost);
      if (deletePost.response.status === "success") {
        dispatch(UpdataCommentData(Math.floor(Math.random() * 100) + 1));
        setDialogToggle(true);
        setTimeout(() => {
          setDialogToggle(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error.error);
    }
  };

  return (
    <Box mb={1} sx={{ position: "relative" }}>
      <IconButton
        aria-controls="post-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        style={{ position: "absolute", top: 0, right: 10 }}
      >
        <MoreHoriz />
      </IconButton>

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
                <Close />
              </IconButton>
            </div>
          </div>
          <MenuItem
            onClick={() => {
              setRichTextEditModalToggle(true);
              handleMenuClosed();
              setHtmlContent(data?.content);
              dispatch(AddCommentId(data?.commentId));
            }}
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
              แก้ไขความคิดเห็น
            </div>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleRemoveComment();
              handleMenuClosed();
            }}
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
              ลบความคิดเห็น
            </div>
          </MenuItem>
        </Menu>
      )}

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
                <Close />
              </IconButton>
            </div>
          </div>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              dispatch(AddCommentId(data?.commentId));
            }}
            style={{
              width: "317px",
              height: "50px",
            }}
          >
            <ReportOutlined />
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
        <Box>
          <GrayTooltip title="ชอบ" placement="top">
            <Button
              startIcon={<CiFaceSmile size={25} />}
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
              {upVoteCountCurrent ? upVoteCountCurrent : data?.upVote}
            </Button>
          </GrayTooltip>
          <GrayTooltip title="ไม่ชอบ" placement="top">
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
              <PiSmileySadThin size={25} />
            </Button>
          </GrayTooltip>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", height: 30 }}>
          <GrayTooltip title="ความคิดเห็น" placement="top">
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
          </GrayTooltip>
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
          dispatch(CheckSecondComment(true));
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
              <ReplyCommentCardSecond
                key={index}
                data={item}
                setRichTextEditModalToggle={setRichTextEditModalToggle}
                setHtmlContent={setHtmlContent}
                setOpenReport={setOpenReport}
              />
            ))}
          </Box>
        )}
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
            ลบความคิดเห็นสำเร็จ
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
