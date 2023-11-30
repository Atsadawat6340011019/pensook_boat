import {
  AppBar,
  Avatar,
  Box,
  Dialog,
  IconButton,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CommentCard } from "../Rightbar/components/CommentCard";
import { CommentStatus } from "../Rightbar/components/CommentStatus";
import { useDispatch, useSelector } from "react-redux";
import { handleGetComment } from "../../../services/feedServices";
import { AddUserData } from "../../../store/userSlice";
import { AddCommentId, CheckSecondComment } from "../../../store/selectSlice";
import ReportDialog from "../Rightbar/components/Dialog/reportDialog";
import { setCommentMobile } from "../../../store/mobileSlice";
import { PostRichTextModal } from "../Rightbar/components/PostRichText/PostRichTextModal";
import { PostRichTextModalEdit } from "../Rightbar/components/PostRichTextEditor/PostRichTextModalEdit";
import { Close } from "@mui/icons-material";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 500,
  height: "80vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const CommentMB = ({ commentData, setCommentData }) => {
  const token = localStorage.getItem("token");
  const [richTextModalToggle, setRichTextModalToggle] = useState(false);
  const [richTextEditModalToggle, setRichTextEditModalToggle] = useState(false);
  const [htmlContent, setHtmlContent] = useState();
  const [openReport, setOpenReport] = useState(false);
  const userData = useSelector((state) => state.user.userData);
  const postId = useSelector((state) => state.select.postIdSelect);
  const updateComment = useSelector((state) => state.user.updateCommentData);
  const mobileCommentToggle = useSelector(
    (state) => state.mobile.commentMobile
  );
  const dispatch = useDispatch();
  console.log(postId);
  console.log(commentData);
  console.log(updateComment);

  useEffect(() => {
    const fecthData = async () => {
      const response = await handleGetComment(token, postId);
      console.log(response);
      dispatch(AddUserData(response.data.session));
      setCommentData(response.data.response);
    };
    if (updateComment && postId) {
      fecthData();
    }
  }, [updateComment]);

  return (
    <Box sx={style}>
      <Box
        minWidth={350}
        maxWidth={500}
        sx={{
          display: { xs: "block", lg: "none" },
          position: "relative",
          width: "100%",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10 }}
          onClick={() => dispatch(setCommentMobile(false))}
        >
          <Close sx={{ color: "#000" }} />
        </IconButton>
        <Box
          bgcolor="#fff"
          sx={{
            height: "80vh",
            borderRadius: "8px",
          }}
        >
          <Typography
            sx={{ fontWeight: "500", fontSize: 18, pt: 6, pl: 4, pb: 2 }}
          >
            ความคิดเห็น
          </Typography>
          <Box
            sx={{
              px: 2,
              height: "60vh",
              overflow: "auto",
              ...(commentData?.length === 0 && {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }),
            }}
          >
            {commentData?.length > 0 ? (
              commentData?.map((item, index) => (
                <CommentCard
                  key={index}
                  data={item}
                  setRichTextModalToggle={setRichTextModalToggle}
                  setRichTextEditModalToggle={setRichTextEditModalToggle}
                  setHtmlContent={setHtmlContent}
                  setOpenReport={setOpenReport}
                />
              ))
            ) : (
              <Typography
                align="center"
                sx={{ fontSize: 18, fontWeight: "500" }}
              >
                ยังไม่มีความคิดเห็น
              </Typography>
            )}
            <Toolbar sx={{ display: { xs: "block", md: "none" } }} />
          </Box>
          {token && (
            <Box
              bgcolor="#fff"
              sx={{
                display: "flex",
                alignItems: "center",
                height: 70,
                px: 2,
                borderRadius: "8px",
                cursor: "pointer",
                position: "absolute",
                bottom: 0,
                maxWidth: "100%",
                width: "90%",
              }}
              onClick={() => {
                setRichTextModalToggle(true);
                dispatch(AddCommentId(""));
              }}
            >
              <Avatar
                src={userData?.profileImagePath}
                sx={{ width: 40, height: 40 }}
                alt="avatar"
              />
              <Box
                bgcolor="#F1F1F1"
                sx={{
                  ml: 2,
                  height: 40,
                  borderRadius: "30px",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  px: 2,
                }}
              >
                <Typography sx={{ userSelect: "none" }}>
                  ความคิดเห็นของคุณ...
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
        <Modal
          open={richTextModalToggle}
          onClose={() => {
            setRichTextModalToggle(false);
            dispatch(CheckSecondComment(false));
          }}
        >
          <PostRichTextModal onClose={() => setRichTextModalToggle(false)} />
        </Modal>
        <Modal
          open={richTextEditModalToggle}
          onClose={() => {
            setRichTextEditModalToggle(false);
            dispatch(CheckSecondComment(false));
          }}
        >
          <PostRichTextModalEdit
            onClose={() => setRichTextEditModalToggle(false)}
            html={htmlContent}
          />
        </Modal>
        <ReportDialog open={openReport} onClose={() => setOpenReport(false)} />
      </Box>
    </Box>
  );
};
