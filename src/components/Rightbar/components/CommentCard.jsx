import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import LogoPensook from "../../../assets/PENSOOK_logo_32.png";
import { ArrowDropUp, CommentOutlined } from "@mui/icons-material";
import { ReplyCommentCard } from "./ReplyCommentCard";
export const CommentCard = () => {
  const [replyCommentToggle, setReplyCommentToggle] = useState(false);
  return (
    <Box sx={{ mb: 1 }}>
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
      <Box sx={{ px: 7, py: 2 }}>
        <Typography sx={{ fontWeight: "400", fontSize: 16 }}>
          หากเคยมีประวัติกระเพาะปัสสาวะอักเสบมาก่อนก็อาจ
          เป็นไปได้ที่จะมีอาการกลับมาเป็นซ้ำได้ค่ะ โดยเฉพาะถ้ามี
          การกลั้นปัสสาวะบ่อย ๆ ร่วมกับมีอาการปัสสาวะแสบ เหมือนปัสสาวะไม่สุด
          เบื้องต้นให้ดื่มน้ำเยอะ ๆ หากปวดมาก ปัสสาวะไม่ออกก็ต้องไปพบแพทย์นะคะ
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
      <Divider />
      {replyCommentToggle && (
        <Box sx={{ pl: 7, pt: 2 }}>
          <ReplyCommentCard />
          <ReplyCommentCard />
        </Box>
      )}
    </Box>
  );
};
