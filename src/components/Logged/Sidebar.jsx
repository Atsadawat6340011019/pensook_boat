import { Box, Typography } from "@mui/material";
import React from "react";
import { KeepPostCard } from "./Sidebar/components/KeepPostCard";
import { MenuNameCard } from "./Sidebar/components/MenuNameCard";
import { ProfileCard } from "./Sidebar/components/ProfileCard";

export const Sidebar = ({ keepPostData }) => {
  return (
    <Box flex={1.5} sx={{ display: { xs: "none", sm: "block" }, pl: 2 }}>
      <MenuNameCard />
      <ProfileCard />
      <Box bgcolor="#fff" sx={{ borderRadius: "8px", mt: 1 }}>
        <Typography
          sx={{ fontWeight: "500", fontSize: 18, pt: 2, pl: 2, mb: 2 }}
        >
          โพสต์ที่คุณ Keep
        </Typography>
        <Box sx={{ px: 2, overflow: "auto", height: 430 }}>
          {keepPostData?.map((item, index) => (
            <KeepPostCard key={index} data={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
