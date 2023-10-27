import { Box, Typography } from "@mui/material";
import React from "react";
import LogoPensook from "../../../assets/PENSOOK_logo_32.png";
export const PostStatus = () => {
  return (
    <Box
      bgcolor="#fff"
      sx={{
        display: "flex",
        alignItems: "center",
        height: 70,
        px: 2,
        borderRadius: "8px",
      }}
    >
      <img
        src={LogoPensook}
        width={40}
        height={40}
        style={{ borderRadius: "50%" }}
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
        <Typography>ช่วงนี้คุณเป็นยังไงบ้าง...</Typography>
      </Box>
    </Box>
  );
};
