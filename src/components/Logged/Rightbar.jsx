import { Box, Typography } from "@mui/material";
import React from "react";
import { CommentCard } from "./Rightbar/components/CommentCard";

export const Rightbar = ({ commentData }) => {
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
        <Box
          sx={{
            px: 2,
            height: 740,
            overflow: "auto",
            ...(commentData?.length === 0 && {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }),
          }}
        >
          {commentData?.length > 0 ? (
            commentData?.map((item, index) => (
              <CommentCard key={index} data={item} />
            ))
          ) : (
            <Typography align="center" sx={{ fontSize: 18, fontWeight: "500" }}>
              ยังไม่มีความคิดเห็น
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};
