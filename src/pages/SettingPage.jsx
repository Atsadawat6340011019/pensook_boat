import { Box } from "@mui/material";
import React from "react";
import { Setting } from "../components/Logged/Setting/Setting";
import { useSelector } from "react-redux";
import { SearchMB } from "../components/Logged/Mobile/SearchMB";

export const SettingPage = () => {
  const mobileSearchToggle = useSelector((state) => state.mobile.searchMobile);

  return (
    <Box flex={5}>
      <Setting />
      {mobileSearchToggle && <SearchMB />}
    </Box>
  );
};
