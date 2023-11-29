import { Box, Toolbar } from "@mui/material";
import React from "react";
import { Profile } from "../components/Logged/Profile/Profile";

export const ProfilePage = () => {
  return (
    <Box flex={5}>
      <Profile />
    </Box>
  );
};
