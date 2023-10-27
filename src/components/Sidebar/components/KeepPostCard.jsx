import { Box, Typography } from "@mui/material";
import React from "react";
import LogoPensook from "../../../assets/columnpicture.png";
import { ArrowDropUp, CommentOutlined } from "@mui/icons-material";

export const KeepPostCard = () => {
  return (
    <Box
      bgcolor="#F1F1F1"
      sx={{
        width: 355,
        height: 80,
        borderRadius: "8px",
        px: 0.5,
        display: "flex",
        alignItems: "center",
        mb: 1,
      }}
    >
      <img
        src={LogoPensook}
        alt="columnPicture"
        width={85}
        height={70}
        style={{ objectFit: "cover", borderRadius: "8px" }}
      />
      <Box sx={{ px: 2, pt: 1 }}>
        <Typography sx={{ fontWeight: "600", fontSize: 10, color: "#007DFC" }}>
          สมาชิกไม่เปิดเผยตัวตน
        </Typography>
        <Typography sx={{ fontWeight: "600", fontSize: 12 }}>
          โรควิตกกังวลเป็นโรคทางจิตที่พบได้มากที่สุดโรคหนึ่ง
          สาเหตุเกิดได้ทั้งจาก 2 ปัจจัยหลักดังนี้
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
            <ArrowDropUp sx={{ width: 30, height: 30 }} />
            <Typography sx={{ fontWeight: "400", fontSize: 10 }}>
              116 Up Vote
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CommentOutlined sx={{ width: 15, height: 15 }} />
            <Typography sx={{ fontWeight: "400", fontSize: 10, ml: 2 }}>
              5
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
