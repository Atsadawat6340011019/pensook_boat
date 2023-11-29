import {
  AppBar,
  Box,
  Dialog,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CommentCard } from "../Rightbar/components/CommentCard";
import { CommentStatus } from "../Rightbar/components/CommentStatus";
import { useDispatch, useSelector } from "react-redux";
import { handleGetComment } from "../../../services/feedServices";
import { AddUserData } from "../../../store/userSlice";
import { CheckSecondComment } from "../../../store/selectSlice";
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
  height: 785,
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
            height: 830,
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
              height: 680,
              overflow: "auto",
              ...(commentData?.length === 0 && {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
          </Box>

          {token && (
            <CommentStatus setRichTextModalToggle={setRichTextModalToggle} />
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
