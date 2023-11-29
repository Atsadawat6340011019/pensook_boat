import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { RiHomeLine } from "react-icons/ri";
import { PiBookmarkSimple } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMenuMobile, setNotiMobile } from "../store/mobileSlice";
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
        px: 5,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          sx={{ display: "flex", flexDirection: "column" }}
          onClick={() => {
            navigate("/");
            dispatch(setNotiMobile(false));
            dispatch(setMenuMobile(false));
          }}
        >
          <RiHomeLine
            color={
              currentURL === "/" && !mobileNotiToggle && !mobileMenuToggle
                ? "#007DFC"
                : "#000"
            }
          />
          <Typography
            sx={{
              fontSize: 12,
              color:
                currentURL === "/" && !mobileNotiToggle && !mobileMenuToggle
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
            navigate("/featuredpost");
            dispatch(setNotiMobile(false));
            dispatch(setMenuMobile(false));
          }}
        >
          <CiHeart
            color={currentURL === "/featuredpost" ? "#007DFC" : "#000"}
          />
          <Typography
            sx={{
              fontSize: 12,
              color: currentURL === "/featuredpost" ? "#007DFC" : "#000",
            }}
          >
            โพสต์ที่คุณอาจสนใจ
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
