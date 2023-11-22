import { PersonOutlineOutlined, SettingsOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  ListItemIcon,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddKeepPostId } from "../../../../store/selectSlice";
import { UpdataCommentData } from "../../../../store/userSlice";

export const ProfileCard = () => {
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
            : "https://images.squarespace-cdn.com/content/v1/5b7fcdb28ab722e3da4af3cc/1592215617998-RGLPH8B4W7F4T2PBIGW1/Dust+Grey.jpeg"
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
            <Avatar
              src={userData?.profileImagePath}
              sx={{
                width: 83,
                height: 83,
                cursor: "pointer",
                "&:hover": {
                  opacity: "80%",
                },
              }}
              alt="coverImage"
              onClick={() => {
                navigate("/mypost");
                dispatch(AddKeepPostId());
                dispatch(UpdataCommentData());
              }}
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
        <MenuItem
          onClick={() => {
            navigate("/profile");
            dispatch(AddKeepPostId());
            dispatch(UpdataCommentData());
          }}
        >
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
          onClick={() => {
            navigate("/setting");
            dispatch(AddKeepPostId());
            dispatch(UpdataCommentData());
          }}
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
