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
          px: { xs: 3, md: 5 },
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Avatar
            src={userData.profileImagePath}
            sx={{ width: { xs: 40, md: 80 }, height: { xs: 40, md: 80 } }}
            alt="avatar"
          />

          <Box sx={{ ml: 2 }}>
            <Typography
              sx={{ fontWeight: "500", fontSize: { xs: 16, md: 25 } }}
            >
              {userData?.firstName} {userData?.lastName}
            </Typography>
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: { xs: 12, md: 16 },
                color: "#808080",
              }}
            >
              {userData?.email}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="error"
          startIcon={<RiDeleteBin6Line />}
          sx={{
            width: { xs: 100, md: 124 },
            height: 40,
            borderRadius: "8px",
            fontSize: { xs: 12, md: 16 },
          }}
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
