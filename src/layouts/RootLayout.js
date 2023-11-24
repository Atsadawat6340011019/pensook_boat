import React from "react";
import { Sidebar } from "../components/Logged/Sidebar";
import { Navbar } from "../components/Logged/Navbar";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import { BottomNavbar } from "../components/Logged/BottomNavbar";

export const RootLayout = ({ refleshKeepPost }) => {
  return (
    <>
      <Navbar />
      <Stack
        direction="row"
        spacing={1.8}
        justifyContent={"space-between"}
        sx={{
          bgcolor: "#F1F1F1",
          "&.MuiStack-root": {
            mr: "14.4px",
          },
        }}
      >
        <Sidebar refleshKeepPost={refleshKeepPost} />
        <Outlet />
      </Stack>
      <BottomNavbar />
    </>
  );
};
