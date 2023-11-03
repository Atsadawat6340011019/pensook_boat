import { PersonOutlineOutlined, SettingsOutlined } from "@mui/icons-material";
import {
  Box,
  ListItemIcon,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProfileCard = () => {
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  return (
    <Box
      bgcolor="#fff"
      sx={{
        height: 280,
        borderRadius: "8px",
        position: "relative",
      }}
    >
      <img
        src={
          userData.profileCover
            ? userData.profileCoverPath
            : "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
        }
        style={{
          width: "100%",
          height: 120,
          objectFit: "cover",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
        alt="coverImage"
      />
      <Box sx={{ width: "100%" }}>
        <Box
          bgcolor="#fff"
          sx={{
            width: 87,
            height: 87,
            borderRadius: "50%",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
        >
          <Box
            sx={{
              width: 83,
              height: 83,
            }}
          >
            <img
              src={userData?.profileImagePath}
              style={{
                width: 83,
                height: 83,
                objectFit: "cover",
                borderRadius: "50%",
              }}
              alt="coverImage"
            />
          </Box>
        </Box>
      </Box>
      <Typography
        align="center"
        sx={{ fontWeight: "500", fontSize: 25, mt: 2, mb: 4, height: 20 }}
      >
        {userData?.firstName} {userData?.lastName}
      </Typography>
      <MenuList sx={{ mt: 1.5 }}>
        <MenuItem onClick={() => navigate("/profile")}>
          <ListItemIcon>
            <PersonOutlineOutlined fontSize="medium" sx={{ color: "#000" }} />
          </ListItemIcon>
          <Typography sx={{ fontWeight: "500", fontSize: 18 }}>
            บัญชีของคุณ
          </Typography>
        </MenuItem>
        <MenuItem
          sx={{
            "&:hover": {
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            },
          }}
          onClick={() => navigate("/setting")}
        >
          <ListItemIcon>
            <SettingsOutlined fontSize="medium" sx={{ color: "#000" }} />
          </ListItemIcon>
          <Typography sx={{ fontWeight: "500", fontSize: 18 }}>
            การตั้งค่า
          </Typography>
        </MenuItem>
      </MenuList>
    </Box>
  );
};
