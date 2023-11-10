import { Avatar, Box, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";

export const PostStatus = forwardRef(({ setRichTextModalToggle, ModalRef }) => {
  const userData = useSelector((state) => state.user.userData);

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
      }}
      onClick={() => setRichTextModalToggle(true)}
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
        ช่วงนี้คุณเป็นยังไงบ้าง...
        </Typography>
      </Box>
    </Box>
  );
});
