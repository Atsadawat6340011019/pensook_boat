import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ArrowDropUp, CommentOutlined } from "@mui/icons-material";

export const KeepPostCard = ({ data }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      bgcolor="#F1F1F1"
      sx={{
        minWidth: 200,
        maxWidth: 500,
        height: 80,
        borderRadius: "8px",
        px: 0.5,
        display: "flex",
        alignItems: "center",
        mb: 1,
      }}
    >
      {data.attachImageList.length > 0 && (
        <img
          src={data.attachImageList[0]}
          alt="columnPicture"
          width={85}
          height={70}
          style={{ objectFit: "cover", borderRadius: "8px" }}
        />
      )}

      <Box sx={{ px: 2, pt: 1 }}>
        <Typography sx={{ fontWeight: "600", fontSize: 10, color: "#007DFC" }}>
          {data.isAnonymous ? "สมาชิกไม่เปิดเผยตัวตน" : data.fullName}
        </Typography>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: 12,
            maxWidth: windowSize.width / 12,
          }}
          noWrap
        >
          {data.label}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
            <ArrowDropUp sx={{ width: 30, height: 30 }} />
            <Typography sx={{ fontWeight: "400", fontSize: 10 }}>
              {data.upVote} Up Vote
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CommentOutlined sx={{ width: 15, height: 15 }} />
            <Typography sx={{ fontWeight: "400", fontSize: 10, ml: 2 }}>
              {data.commentList.length}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
