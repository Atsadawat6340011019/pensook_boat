import {
  NavigateNextRounded,
  PersonOutlineOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMenuMobile } from "../../../store/mobileSlice";

export const MenuMB = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box
      bgcolor="#fff"
      maxWidth={600}
      sx={{
        display: { xs: "block", sm: "none", md: "none" },
        height: "auto",
        borderRadius: "8px",
        width: "100%",
        height: "80vh",
      }}
    >
      <Typography
        align="center"
        sx={{ fontSize: 18, fontWeight: "500", py: 2 }}
      >
        เมนู
      </Typography>
      <Divider />
      <MenuList>
        <MenuItem
          sx={{ display: "flex", justifyContent: "space-between" }}
          onClick={() => {
            navigate("/mypost");
            dispatch(setMenuMobile(false));
          }}
        >
          <Box sx={{ display: "flex" }}>
            <ListItemIcon>
              <Avatar
                src={userData?.profileImagePath}
                sx={{ width: 30, height: 30 }}
                alt="avatar"
              />
            </ListItemIcon>
            <Typography sx={{ fontWeight: "500", fontSize: 18 }}>
              {userData?.firstName + " " + userData?.lastName}
            </Typography>
          </Box>
          <NavigateNextRounded sx={{ width: 40, height: 40 }} />
        </MenuItem>
        <MenuItem
          sx={{ display: "flex", justifyContent: "space-between" }}
          onClick={() => {
            navigate("/profile");
            dispatch(setMenuMobile(false));
          }}
        >
          <Box sx={{ display: "flex" }}>
            <ListItemIcon>
              <PersonOutlineOutlined fontSize="medium" sx={{ color: "#000" }} />
            </ListItemIcon>
            <Typography sx={{ fontWeight: "500", fontSize: 18 }}>
              บัญชีของคุณ
            </Typography>
          </Box>
          <NavigateNextRounded sx={{ width: 40, height: 40 }} />
        </MenuItem>
        <MenuItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "&:hover": {
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            },
          }}
          onClick={() => {
            navigate("/setting");
            dispatch(setMenuMobile(false));
          }}
        >
          <Box sx={{ display: "flex" }}>
            <ListItemIcon>
              <SettingsOutlined fontSize="medium" sx={{ color: "#000" }} />
            </ListItemIcon>
            <Typography sx={{ fontWeight: "500", fontSize: 18 }}>
              การตั้งค่า
            </Typography>
          </Box>
          <NavigateNextRounded sx={{ width: 40, height: 40 }} />
        </MenuItem>
      </MenuList>
    </Box>
  );
};
