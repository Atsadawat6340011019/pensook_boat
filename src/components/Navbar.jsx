import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";

import LogoPensook from "../assets/LogoPensook.png";
import LogoPensook32 from "../assets/PENSOOK_logo_32.png";
import { Logout, NotificationsNone, Settings } from "@mui/icons-material";

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
  const open = Boolean(anchorEl);
  const login = false;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          {login ? (
            <>
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
              <Avatar sx={{ width: 40, height: 40 }} onClick={handleClick}>
                P
              </Avatar>{" "}
            </>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                sx={{
                  fontSize: 16,
                  height: 50,
                  width: 156,
                  borderRadius: "8px",
                }}
              >
                เข้าสู่ระบบ
              </Button>
            </Box>
          )}
        </Icons>

        <UserBox>
          <Avatar sx={{ width: 40, height: 40 }}>P</Avatar>
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
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};
