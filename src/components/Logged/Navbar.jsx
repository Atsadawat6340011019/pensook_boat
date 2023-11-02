import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LogoPensook from "../../assets/LogoPensook.png";
import LogoPensook32 from "../../assets/PENSOOK_logo_32.png";
import { NotificationsNone } from "@mui/icons-material";
import { auth } from "../../services/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddUserData } from "../../store/userSlice";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  padding: "0 10px",
  borderRadius: "8px",
  border: "1px #E7EAEE solid",
  width: "50%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState();
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    auth.signOut();
    dispatch(AddUserData([]));
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar position="sticky" sx={{ background: "#fff", mb: 2 }}>
      <StyledToolbar>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            height: 64,
            width: 600,
            justifyContent: "space-between",
          }}
        >
          <img src={LogoPensook} width={125} height={28} alt="logoPensook" />
          <Search>
            <InputBase fullWidth placeholder="ค้นหา....." />
          </Search>
        </Box>
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            alignItems: "center",
            height: 64,
          }}
        >
          <img src={LogoPensook32} width={40} height={40} alt="logoPensook" />
        </Box>

        <Icons>
          <IconButton
            sx={{
              "& .MuiBadge-standard": {
                mt: 1,
                mr: 1,
              },
              "&:hover": {
                background: "#D5EAFF",
              },
            }}
          >
            <Badge badgeContent={4} color="error">
              <NotificationsNone
                sx={{
                  width: 40,
                  height: 40,
                  color: "#000",
                  cursor: "pointer",
                  "&:hover": {
                    color: "#007DFC",
                  },
                }}
              />
            </Badge>
          </IconButton>
          <Avatar
            src={userData?.profileImagePath}
            alt="userImage"
            sx={{ width: 40, height: 40 }}
            onClick={handleClick}
          />
        </Icons>

        <UserBox>
          <Avatar
            src={userData?.profileImagePath}
            sx={{ width: 40, height: 40 }}
          />
        </UserBox>
      </StyledToolbar>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          "& .MuiPopover-paper": {
            borderRadius: "8px",
            width: 332,
            height: 125,
          },
        }}
      >
        <Box px={4} py={2}>
          <Typography sx={{ fontWeight: "600", fontSize: 18 }}>
            {userData?.firstName} {userData?.lastName}
          </Typography>
          <Typography sx={{ fontSize: 12, color: "#808080" }}>
            {userData.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{
            display: "flex",
            justifyContent: "center",
            "&:hover": {
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            },
          }}
        >
          <Typography sx={{ fontWeight: "500", fontSize: 18 }}>
            ออกจากระบบ
          </Typography>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};
