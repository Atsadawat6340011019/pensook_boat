import { Box, Typography } from "@mui/material";
import React from "react";
import { CommentCard } from "./Rightbar/components/CommentCard";

export const Rightbar = () => {
  return (
    <Box flex={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box
        bgcolor="#fff"
        sx={{
          height: 830,
          borderRadius: "8px",
        }}
      >
        <Typography
          sx={{ fontWeight: "500", fontSize: 18, pt: 6, pl: 4, pb: 2 }}
        >
          ความคิดเห็น
        </Typography>
        <Box sx={{ px: 2, height: 740, overflow: "auto" }}>
          <CommentCard />
          <CommentCard />
          <CommentCard />
        </Box>
      </Box>
    </Box>
  );
};
