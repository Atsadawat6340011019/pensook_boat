import { EditOutlined } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export const Profile = () => {
  const userData = useSelector((state) => state.user.userData);
  const [stateEdit, setStateEdit] = useState(false);

  return (
    <Box
      bgcolor="#fff"
      sx={{
        height: 830,
        borderRadius: "8px",
      }}
    >
      <Typography
        align="center"
        sx={{ fontWeight: "500", fontSize: 18, pt: 3 }}
      >
        บัญชีของคุณ
      </Typography>
      <Divider sx={{ pt: 3 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {stateEdit ? (
          <>
            <Typography
              align="center"
              sx={{ fontWeight: "500", fontSize: 18, pt: 3 }}
            >
              ภาพโปรไฟล์
            </Typography>
            <img
              src={userData?.photoURL}
              style={{
                width: 150,
                height: 150,
                objectFit: "cover",
                borderRadius: "50%",
                marginTop: "30px",
              }}
              alt="coverImage"
            />
            <Typography
              align="center"
              sx={{ fontWeight: "500", fontSize: 18, pt: 3 }}
            >
              ชื่อผู้ใช้งาน
            </Typography>
            <Typography
              align="center"
              sx={{ fontWeight: "500", fontSize: 25, py: 10 }}
            >
              {userData.displayName}
            </Typography>
            <img
              src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
              style={{
                width: 640,
                height: 200,
                objectFit: "cover",
                borderRadius: "8px",
              }}
              alt="coverImage"
            />
          </>
        ) : (
          <>
            <Button
              variant="contained"
              sx={{
                fontSize: 16,
                height: 40,
                width: 106,
                borderRadius: "8px",
                position: "absolute",
                top: 10,
                right: 100,
              }}
              startIcon={<EditOutlined />}
              onClick={() => setStateEdit(true)}
            >
              แก้ไข
            </Button>

            <img
              src={userData?.photoURL}
              style={{
                width: 150,
                height: 150,
                objectFit: "cover",
                borderRadius: "50%",
                marginTop: "50px",
              }}
              alt="coverImage"
            />
            <Typography
              align="center"
              sx={{ fontWeight: "500", fontSize: 25, py: 10 }}
            >
              {userData.displayName}
            </Typography>
            <img
              src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
              style={{
                width: 640,
                height: 200,
                objectFit: "cover",
                borderRadius: "8px",
              }}
              alt="coverImage"
            />
          </>
        )}
      </Box>
    </Box>
  );
};
