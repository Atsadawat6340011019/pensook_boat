import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import LogoPensook from "../assets/LogoPensook.png";
import LogoPensook32 from "../assets/PENSOOK_logo_32.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@mui/icons-material";

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
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

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
          <Box
            sx={{ display: "flex", alignItems: "center", position: "relative" }}
            onClick={() => navigate("/login")}
          >
            <Typography
              sx={{
                bgcolor: "#007DFC",
                fontSize: 14,
                fontWeight: 500,
                px: 1,
                height: 40,
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              ค้นหา
            </Typography>
            <InputBase
              fullWidth
              placeholder="ช่วงนี้คุณเป็นยังไงบ้าง..."
              sx={{
                border: "1px solid #E7EAEE",
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
                height: 40,
                fontSize: 14,
                width: 300,
                pl: 2,
                pr: 1,
              }}
              endAdornment={
                <IconButton>
                  <SearchOutlined sx={{ color: "#000" }} />
                </IconButton>
              }
            />
          </Box>
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              sx={{
                fontSize: 16,
                height: 50,
                width: 156,
                borderRadius: "8px",
              }}
              onClick={() => navigate("/login")}
            >
              เข้าสู่ระบบ
            </Button>
          </Box>
        </Icons>

        <UserBox>
          <Avatar src={userData?.photoURL} sx={{ width: 40, height: 40 }} />
        </UserBox>
      </StyledToolbar>
    </AppBar>
  );
};
