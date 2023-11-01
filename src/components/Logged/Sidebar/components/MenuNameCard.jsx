import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const MenuNameCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentURL = location.pathname;
  return (
    <Box
      bgcolor="#fff"
      sx={{
        height: 47,
        borderRadius: "8px",
        mb: 1,
        display: "flex",
        alignItems: "center",
        pl: 2,
      }}
    >
      {currentURL === "/setting" || currentURL === "/profile" ? (
        <IconButton
          sx={{ color: "#000", mr: 2 }}
          onClick={() => navigate("/feed")}
        >
          <ArrowBackIosNewRounded />
        </IconButton>
      ) : null}

      <Typography sx={{ fontWeight: "500", fontSize: 18 }}>
        {currentURL === "/feed" && "หน้าหลัก"}
        {currentURL === "/profile" && "บัญชีของคุณ"}
        {currentURL === "/setting" && "การตั้งค่า"}
      </Typography>
    </Box>
  );
};
