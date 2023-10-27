import { Box, Button, Typography } from "@mui/material";
import React from "react";
import LogoPensook from "../../../assets/PENSOOK_logo_32.png";
import { ArrowDropUp, CommentOutlined } from "@mui/icons-material";

export const PostCard = () => {
  return (
    <Box
      bgcolor="#fff"
      sx={{
        px: 2,
        py: 1,
        borderRadius: "8px",
        mb: 1,
      }}
    >
      <Box sx={{ display: "flex" }}>
        <img
          src={LogoPensook}
          width={40}
          height={40}
          style={{ borderRadius: "50%" }}
          alt="avatar"
        />
        <Box sx={{ ml: 2 }}>
          <Typography sx={{ fontWeight: "500", fontSize: 16 }}>
            Jeremy Caldwell
          </Typography>
          <Typography
            sx={{ fontWeight: "400", fontSize: 10, color: "#808080" }}
          >
            3 ตุลาคม 2566 , 09:13 น.
          </Typography>
        </Box>
      </Box>
      <Typography sx={{ fontWeight: "600", fontSize: 18, mt: 2 }}>
        การฉีดวัคซีน ป้องกันไข้หวัดใหญ่
      </Typography>
      <Typography sx={{ fontWeight: "400", fontSize: 16, mt: 2 }}>
        การป้องกันที่ดีคือ การฉีดวัคซีนป้องกันไข้หวัดใหญ่
        ซึ่งเป็นวัคซีนที่ทำมาจากเชื้อที่ตาย แล้ว โดยฉีดที่แขนปีละครั้ง หลังฉีด 2
        สัปดาห์ภูมิคุ้มกันจึงจะสูงพอที่จะป้องกันการติด เชื้อ
        ผู้ที่มีประวัติแพ้สารโปรตีนประเภทไข่ ห้ามฉีดวัคซีนชนิดนี้
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button
          startIcon={<ArrowDropUp sx={{ width: 30, height: 30 }} />}
          sx={{
            border: "1px solid #000",
            borderRadius: "8px",
            color: "#000",
            height: 32,
            "&:hover": {
              bgcolor: "#ededed",
            },
          }}
        >
          135 Up Vote
        </Button>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CommentOutlined sx={{ width: 20, height: 20 }} />
          <Typography sx={{ fontWeight: "400", fontSize: 16, ml: 2 }}>
            5
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
