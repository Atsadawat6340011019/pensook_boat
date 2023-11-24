import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { RiHomeLine } from "react-icons/ri";
import { PiBookmarkSimple } from "react-icons/pi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
export const BottomNavbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      sx={{
        display: { xs: "block", sm: "none", md: "none" },
        top: "auto",
        bottom: 0,
        background: "#fff",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          sx={{ display: "flex", flexDirection: "column" }}
          onClick={() => navigate("/feed")}
        >
          <RiHomeLine color="#000" />
          <Typography sx={{ fontSize: 12, color: "#000" }}>หน้าหลัก</Typography>
        </IconButton>
        <IconButton
          sx={{ display: "flex", flexDirection: "column" }}
          onClick={() => navigate("/keeppost")}
        >
          <PiBookmarkSimple color="#000" />
          <Typography sx={{ fontSize: 12, color: "#000" }}>
            โพสต์ที่ Keep
          </Typography>
        </IconButton>
        <IconButton sx={{ display: "flex", flexDirection: "column" }}>
          <IoMdNotificationsOutline color="#000" />
          <Typography sx={{ fontSize: 12, color: "#000" }}>
            แจ้งเตือน
          </Typography>
        </IconButton>
        <IconButton sx={{ display: "flex", flexDirection: "column" }}>
          <IoMenu color="#000" />
          <Typography sx={{ fontSize: 12, color: "#000" }}>เมนู</Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
