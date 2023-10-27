import React from "react";
import { Sidebar } from "./components/Sidebar";
import { Feed } from "./components/Feed";
import { Rightbar } from "./components/Rightbar";
import { Box, Stack } from "@mui/material";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <Box bgcolor="#F1F1F1" sx={{ height: "100vh" }}>
      <Navbar />
      <Stack direction="row" spacing={1.8} justifyContent={"space-between"}>
        <Sidebar />
        <Feed />
        <Rightbar />
      </Stack>
    </Box>
  );
}

export default App;
