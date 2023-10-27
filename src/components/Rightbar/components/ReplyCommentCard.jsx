import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import LogoPensook from "../../../assets/PENSOOK_logo_32.png";
import { ArrowDropUp, CommentOutlined } from "@mui/icons-material";
import { ReplyCommentCardSecond } from "./ReplyCommentCardSecond";
export const ReplyCommentCard = () => {
  const [replyCommentToggle, setReplyCommentToggle] = useState(false);

  return (
    <Box>
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
      <Box sx={{ mt: 2, pl: 7 }}>
        <Typography sx={{ fontWeight: "400", fontSize: 16 }}>
          ขอบคุณสำหรับคำตอบ
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",

          px: 7,
          py: 2,
        }}
      >
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
        <Box sx={{ display: "flex", alignItems: "center", height: 30 }}>
          <IconButton
            sx={{
              width: 30,
              height: 30,
              "&:hover": {
                bgcolor: "#ededed",
              },
            }}
            onClick={() => setReplyCommentToggle(!replyCommentToggle)}
          >
            <CommentOutlined
              sx={{
                width: 20,
                height: 20,
                color: "#000",
              }}
            />
          </IconButton>
          <Typography sx={{ fontWeight: "400", fontSize: 16, ml: 2 }}>
            5
          </Typography>
        </Box>
      </Box>
      {replyCommentToggle && (
        <Box sx={{ pl: 8 }}>
          <ReplyCommentCardSecond />
          <ReplyCommentCardSecond />
        </Box>
      )}
    </Box>
  );
};
