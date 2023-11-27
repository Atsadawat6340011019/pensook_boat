import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AddKeepPostId,
  AddSearchKeyword,
  CheckNoti,
} from "../../../../store/selectSlice";
import { UpdataCommentData } from "../../../../store/userSlice";

export const MenuNameCard = () => {
  const keepPostId = useSelector((state) => state.select.keepPostIdSelect);
  const checkNoti = useSelector((state) => state.select.checkNoti);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      {currentURL === "/setting" ||
      currentURL === "/profile" ||
      currentURL === "/keeppost" ||
      currentURL === "/mypost" ||
      currentURL === "/myanonymouspost" ||
      currentURL === "/myreplypost" ||
      currentURL === "/search" ||
      currentURL.includes("/feed/") ? (
        <IconButton
          sx={{ color: "#000", mr: 2 }}
          onClick={() => {
            navigate("/feed");
            dispatch(AddKeepPostId());
            dispatch(UpdataCommentData());
            dispatch(CheckNoti(false));
            dispatch(AddSearchKeyword(undefined));
          }}
        >
          <ArrowBackIosNewRounded />
        </IconButton>
      ) : null}

      <Typography sx={{ fontWeight: "500", fontSize: 18 }}>
        {currentURL === "/feed" && "หน้าหลัก"}
        {currentURL === "/profile" && "บัญชีของคุณ"}
        {currentURL === "/setting" && "การตั้งค่า"}
        {currentURL === "/keeppost" && "โพสต์ที่คุณ Keep"}
        {currentURL === "/mypost" && "โพสต์ของคุณ"}
        {currentURL === "/myanonymouspost" && "โพสต์ของคุณ"}
        {currentURL === "/myreplypost" && "โพสต์ของคุณ"}
        {currentURL === "/search" && "ผลการค้นหา"}
        {currentURL.includes("/feed/") &&
          !keepPostId &&
          !checkNoti &&
          "หน้าหลัก"}
        {currentURL.includes("/feed/") && keepPostId && "โพสต์ที่คุณ Keep"}
        {currentURL.includes("/feed/") && checkNoti && "การแจ้งเตือน"}
      </Typography>
    </Box>
  );
};
