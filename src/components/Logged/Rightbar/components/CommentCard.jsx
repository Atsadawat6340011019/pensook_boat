import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import LogoPensook from "../../../../assets/PENSOOK_logo_32.png";
import { ArrowDropUp, CommentOutlined } from "@mui/icons-material";
import { ReplyCommentCard } from "./ReplyCommentCard";
import { formatTimestamp } from "../../../../utils/functions";
import parse from "html-react-parser";

export const CommentCard = ({ data }) => {
  const [replyCommentToggle, setReplyCommentToggle] = useState(false);
  return (
    <Box sx={{ mb: 1 }}>
      <Box sx={{ display: "flex" }}>
        <img
          src={data.isAnonymous ? LogoPensook : data.displayImagePath}
          width={40}
          height={40}
          style={{ borderRadius: "50%" }}
          alt="avatar"
        />
        <Box sx={{ ml: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: "500", fontSize: 16 }}>
            {data.isAnonymous ? "สมาชิกไม่เปิดเผยตัวตน" : data.fullName}
          </Typography>
          <Typography
            sx={{ fontWeight: "400", fontSize: 10, color: "#808080" }}
          >
            {formatTimestamp(data.createTime)}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ px: 7, py: 2 }}>
        <Typography sx={{ fontWeight: "400", fontSize: 16 }}>
          {parse(data.content)}
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
          {data.upVote} Up Vote
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
            {data.commentList.length}
          </Typography>
        </Box>
      </Box>
      <Divider />
      {replyCommentToggle && (
        <Box sx={{ pl: 7, pt: 2 }}>
          {data?.commentList.map((item, index) => (
            <ReplyCommentCard key={index} data={item} />
          ))}
        </Box>
      )}
    </Box>
  );
};
