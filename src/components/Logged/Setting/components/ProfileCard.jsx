import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";

export const ProfileCard = ({ setDialogToggleWarn }) => {
  const userData = useSelector((state) => state.user.userData);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
          px: 5,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Avatar
            src={userData.profileImagePath}
            sx={{ width: 80, height: 80 }}
            alt="avatar"
          />

          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontWeight: "500", fontSize: 25 }}>
              {userData?.firstName} {userData?.lastName}
            </Typography>
            <Typography
              sx={{ fontWeight: "400", fontSize: 16, color: "#808080" }}
            >
              {userData?.email}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="error"
          startIcon={<RiDeleteBin6Line />}
          sx={{ width: 124, height: 40, borderRadius: "8px", fontSize: 16 }}
          onClick={() => setDialogToggleWarn(true)}
        >
          ลบบัญชี
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Divider sx={{ width: "92%" }} />
      </Box>
    </>
  );
};
