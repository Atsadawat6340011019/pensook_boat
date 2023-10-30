import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Feed } from "./components/Feed";
import { Rightbar } from "./components/Rightbar";
import { Box, Stack } from "@mui/material";
import { Navbar } from "./components/Navbar";

function App() {
  const [commentData, setCommentData] = useState();
  const [keepPostData, setKeepPostData] = useState();

  return (
    <Box bgcolor="#F1F1F1" sx={{ height: "100vh" }}>
      <Navbar />
      <Stack direction="row" spacing={1.8} justifyContent={"space-between"}>
        <Sidebar keepPostData={keepPostData} />
        <Feed
          setCommentData={setCommentData}
          setKeepPostData={setKeepPostData}
        />
        <Rightbar commentData={commentData} />
      </Stack>
    </Box>
  );
}

export default App;
