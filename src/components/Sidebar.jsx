import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { KeepPostCard } from "./Sidebar/components/KeepPostCard";
import { useNavigate } from "react-router-dom";

export const Sidebar = ({ keepPostData }) => {
  const navigate = useNavigate();

  return (
    <Box flex={1.5} sx={{ display: { xs: "none", sm: "block" }, pl: 2 }}>
      <Box
        bgcolor="#fff"
        sx={{
          height: 280,
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: "500", fontSize: 18 }}>
          เข้าสู่ระบบเพื่อถามคำถาม
        </Typography>
        <Typography sx={{ fontWeight: "500", fontSize: 18 }}>
          เกี่ยวกับสุขภาพที่คุณสงสัย
        </Typography>
        <Button
          variant="contained"
          sx={{
            fontSize: 16,
            height: 50,
            width: 156,
            borderRadius: "8px",
            mt: 2,
          }}
          onClick={() => navigate("/login")}
        >
          เข้าสู่ระบบ
        </Button>
      </Box>
      <Box bgcolor="#fff" sx={{ borderRadius: "8px", mt: 2 }}>
        <Typography
          sx={{ fontWeight: "500", fontSize: 18, pt: 2, pl: 2, mb: 2 }}
        >
          โพสต์ที่คุณอาจสนใจ
        </Typography>
        <Box sx={{ px: 2, overflow: "auto", height: 485 }}>
          {keepPostData?.map((item, index) => (
            <KeepPostCard key={index} data={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
