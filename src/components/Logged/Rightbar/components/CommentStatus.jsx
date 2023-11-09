import { Avatar, Box, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddCommentId } from "../../../../store/selectSlice";

export const CommentStatus = forwardRef(
  ({ setRichTextModalToggle, ModalRef }) => {
    const userData = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();

    return (
      <Box
        ref={ModalRef}
        bgcolor="#fff"
        sx={{
          display: "flex",
          alignItems: "center",
          height: 70,
          px: 2,
          borderRadius: "8px",
          cursor: "pointer",
          position: "absolute",
          bottom: 5,
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
    );
  }
);
