import styled from "@emotion/styled";
import { Close } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Switch,
  Typography,
} from "@mui/material";
import React, { forwardRef, useState } from "react";
import { useSelector } from "react-redux";
import { RichTextEditor } from "./Components/RichTextEditor";
import LogoPensook from "../../../../../assets/PENSOOK_logo_32.png";
import { handleCreatePost } from "../../../../../services/feedServices";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 785,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 23,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#007DFC" : "#007DFC",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 16,
    height: 16,
    borderRadius: 10,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export const PostRichTextModal = forwardRef(({ ModalRef, onClose }) => {
  const userData = useSelector((state) => state.user.userData);
  const token = localStorage.getItem("token");
  const [content, setContent] = useState();
  const [labelText, setLabelText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  console.log(content);

  const handleSubmit = async () => {
    const AllContent = {
      isAnonymous: isAnonymous,
      label: labelText,
      content: content,
    };
    console.log(AllContent);
    try {
      const postData = await handleCreatePost(token, AllContent);
      console.log(postData);
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error.error);
    }
  };
  return (
    <Box sx={style} ref={ModalRef}>
      <IconButton
        sx={{ position: "absolute", top: 15, right: 15 }}
        onClick={onClose}
      >
        <Close sx={{ color: "#000", width: 29, height: 29 }} />
      </IconButton>
      <Typography
        align="center"
        sx={{ fontWeight: "500", fontSize: 18, pt: 3 }}
      >
        สร้างโพสต์
      </Typography>
      <Box
        sx={{
          border: "1px #808080 solid",
          borderRadius: "8px",
          height: 70,
          width: 750,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Typography
          align="center"
          sx={{ fontWeight: "400", fontSize: 16, px: 6 }}
        >
          โพสต์โดยไม่เปิดเผยตัวตน
        </Typography>
        <Box sx={{ px: 9 }}>
          <AntSwitch onClick={() => setIsAnonymous(!isAnonymous)} />
        </Box>
      </Box>
      <Box
        sx={{
          width: 750,
          display: "flex",
          justifyContent: "space-between",
          mt: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={isAnonymous ? LogoPensook : userData.profileImagePath}
            sx={{ width: 40, height: 40 }}
            alt="avatar"
          />
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontWeight: "500", fontSize: 16 }}>
              {isAnonymous
                ? "สมาชิกไม่เปิดเผยตัวตน"
                : userData?.firstName + " " + userData?.lastName}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: 103, height: 40, borderRadius: "8px", fontSize: 16 }}
          onClick={handleSubmit}
        >
          โพสต์
        </Button>
      </Box>
      <Box
        sx={{
          width: 750,
          mt: 3,
        }}
      >
        <InputBase
          placeholder="หัวข้อ"
          value={labelText}
          onChange={(e) => setLabelText(e.target.value)}
          sx={{ width: 750, px: 7, fontWeight: "500", fontSize: 42 }}
        />
      </Box>
      <Box sx={{ width: 750, height: 380, mt: 3, border: "1px red solid" }}>
        <Box sx={{ position: "relative", px: 7, height: 380 }}>
          <RichTextEditor setContent={setContent} />
        </Box>
      </Box>
    </Box>
  );
});
