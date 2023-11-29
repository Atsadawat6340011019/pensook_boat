import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { RiHomeLine } from "react-icons/ri";
import { PiBookmarkSimple } from "react-icons/pi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMenuMobile, setNotiMobile } from "../../store/mobileSlice";
export const BottomNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentURL = location.pathname;
  const mobileNotiToggle = useSelector(
    (state) => state.mobile.notificationMobile
  );
  const mobileMenuToggle = useSelector((state) => state.mobile.menuMobile);

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
          onClick={() => {
            navigate("/feed");
            dispatch(setNotiMobile(false));
            dispatch(setMenuMobile(false));
          }}
        >
          <RiHomeLine
            color={
              currentURL === "/feed" && !mobileNotiToggle && !mobileMenuToggle
                ? "#007DFC"
                : "#000"
            }
          />
          <Typography
            sx={{
              fontSize: 12,
              color:
                currentURL === "/feed" && !mobileNotiToggle && !mobileMenuToggle
                  ? "#007DFC"
                  : "#000",
            }}
          >
            หน้าหลัก
          </Typography>
        </IconButton>
        <IconButton
          sx={{ display: "flex", flexDirection: "column" }}
          onClick={() => {
            navigate("/keeppost");
            dispatch(setNotiMobile(false));
            dispatch(setMenuMobile(false));
          }}
        >
          <PiBookmarkSimple
            color={currentURL === "/keeppost" ? "#007DFC" : "#000"}
          />
          <Typography
            sx={{
              fontSize: 12,
              color: currentURL === "/keeppost" ? "#007DFC" : "#000",
            }}
          >
            โพสต์ที่ Keep
          </Typography>
        </IconButton>
        <IconButton
          sx={{ display: "flex", flexDirection: "column" }}
          onClick={() => {
            navigate("/feed");
            dispatch(setMenuMobile(false));
            dispatch(setNotiMobile(true));
          }}
        >
          <IoMdNotificationsOutline
            color={
              currentURL === "/feed" && mobileNotiToggle ? "#007DFC" : "#000"
            }
          />
          <Typography
            sx={{
              fontSize: 12,
              color:
                currentURL === "/feed" && mobileNotiToggle ? "#007DFC" : "#000",
            }}
          >
            แจ้งเตือน
          </Typography>
        </IconButton>
        <IconButton
          sx={{ display: "flex", flexDirection: "column" }}
          onClick={() => {
            navigate("/feed");
            dispatch(setNotiMobile(false));
            dispatch(setMenuMobile(true));
          }}
        >
          <IoMenu
            color={
              currentURL === "/feed" && mobileMenuToggle ? "#007DFC" : "#000"
            }
          />
          <Typography
            sx={{
              fontSize: 12,
              color:
                currentURL === "/feed" && mobileMenuToggle ? "#007DFC" : "#000",
            }}
          >
            เมนู
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
