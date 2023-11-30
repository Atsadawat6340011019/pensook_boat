import { Box, Toolbar } from "@mui/material";
import React from "react";
import { Profile } from "../components/Logged/Profile/Profile";
import { useSelector } from "react-redux";
import { SearchMB } from "../components/Logged/Mobile/SearchMB";

export const ProfilePage = () => {
  const mobileSearchToggle = useSelector((state) => state.mobile.searchMobile);

  return (
    <Box flex={5}>
      <Profile />
      {mobileSearchToggle && <SearchMB />}
    </Box>
  );
};
