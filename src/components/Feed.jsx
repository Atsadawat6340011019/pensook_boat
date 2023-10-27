import { Box } from "@mui/material";
import React from "react";
import { PostStatus } from "./Feed/components/PostStatus";
import { PostCard } from "./Feed/components/PostCard";

export const Feed = () => {
  return (
    <Box flex={3}>
      <PostStatus />
      <Box sx={{ mt: 1, height: 750, overflow: "auto" }}>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </Box>
    </Box>
  );
};
