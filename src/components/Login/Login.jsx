import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import shape from "../../assets/bgLogin/shape.png";
import shape1 from "../../assets/bgLogin/shape1.png";
import LogoPensook from "../../assets/LogoPensook.png";
import { FcGoogle } from "react-icons/fc";
import { Checkbox, Divider, IconButton, Modal } from "@mui/material";
import { ArrowBackIosNewRounded, Close } from "@mui/icons-material";
import { auth, googleAuthProvider } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { handleCreateUser, handleLogin } from "../../services/authServices";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 858,
  height: 761,
  bgcolor: "background.paper",
  borderRadius: 10,
  p: 4,
};

export const Login = () => {
  const [checked, setChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleLoginByGoogle = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        console.log(result);
        const { additionalUserInfo } = result;
        const { user } = result;
        const idToken = await user.getIdTokenResult();
        const nameParts = user.displayName.split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ");
        console.log("isNewUser", additionalUserInfo.isNewUser);
        if (additionalUserInfo.isNewUser) {
          console.log("isNewUser", additionalUserInfo.isNewUser);
          const googleImage = user.photoURL;
          const coverttobase64 = async (image) => {
            try {
              const response = await fetch(image);
              if (!response.ok) {
                throw new Error(
                  `Failed to fetch the image. Status: ${response.status}`
                );
              }

              const blob = await response.blob();

              return new Promise((resolve) => {
                const reader = new FileReader();

                reader.onloadend = () => {
                  resolve(reader.result);
                };

                reader.readAsDataURL(blob);
              });
            } catch (error) {
              throw new Error(`An error occurred: ${error.message}`);
            }
          };

          coverttobase64(googleImage)
            .then(async (base64) => {
              try {
                const createUser = await handleCreateUser(
                  user.email,
                  firstName,
                  lastName,
                  base64
                );
                console.log("สร้างโปรไฟล์", createUser);

                if (createUser.status === "success") {
                  const loginRespone = await handleLogin(
                    user.email,
                    idToken.token
                  );
                  console.log("เข้าสู่ระบบ", loginRespone);

                  if (loginRespone.status === "success") {
                    const googleToken = idToken.token;
                    localStorage.setItem("token", JSON.stringify(googleToken));
                    navigate("/feed");
                  }
                }
              } catch (error) {
                console.error(error);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          const loginRespone = await handleLogin(user.email, idToken.token);
          console.log(loginRespone);
          if (loginRespone.status === "success") {
            const googleToken = idToken.token;
            localStorage.setItem("token", JSON.stringify(googleToken));
            navigate("/feed");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <IconButton
            sx={{ position: "absolute", left: 0, width: 60, height: 60 }}
            onClick={() => navigate("/")}
          >
            <ArrowBackIosNewRounded
              sx={{ width: 56, height: 56, color: "#000" }}
            />
          </IconButton>
          <img
            src={LogoPensook}
            style={{ width: 229, height: 55, objectFit: "cover" }}
            alt="LogoPensook"
          />

          <Typography
            align="center"
            sx={{ fontWeight: "500", fontSize: 18, pt: 15, pb: 10, width: 200 }}
          >
            เข้าสู่ระบบเพื่อถามคำถาม เกี่ยวกับสุขภาพที่คุณสงสัย
          </Typography>

          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 3,
              mb: 2,
              maxWidth: 466,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: "600",
            }}
            startIcon={<FcGoogle />}
            disabled={!checked}
            onClick={handleLoginByGoogle}
          >
            Continue with Google
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 10,
            }}
          >
            <Checkbox checked={checked} onChange={handleChange} />
            <Typography sx={{ color: "#000" }}>
              ยอมรับ
              <Typography
                sx={{
                  color: "#007DFC",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                variant="span"
                component="span"
                onClick={() => setModalOpen(true)}
              >
                เงื่อนไข
              </Typography>
              ทุกอย่าง
            </Typography>
          </Box>
          <Typography align="center" sx={{ color: "#000", maxWidth: 500 }}>
            <Typography
              sx={{
                color: "#007DFC",
              }}
              variant="span"
              component="span"
            >
              Pensook health care technology Co.,Ltd
            </Typography>{" "}
            เป็นบริษัท health care startup ของประเทศไทย
            ที่มีความมุ่งหวังอยากจะทำให้ผู้คน มีคุณภาพชีวิตที่ดี
            เข้าถึงการรักษาพยาบาลได้ง่าย และมีอายุขัยที่ยืนยาวขึ้น
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={5}
        style={{
          background:
            "linear-gradient(232.86deg, #7CCAFE 40.91%, rgba(139, 146, 255, 0.83) 89.49%)",
        }}
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            opacity: { xs: "0%", sm: "100%" },
            position: "absolute",
            right: 0,
            bottom: 0,
          }}
        >
          <img
            style={{ position: "absolute", right: 0, bottom: 0 }}
            src={shape}
            alt="shapeImage"
          />
        </Box>

        <Box
          sx={{
            opacity: { xs: "0%", sm: "100%" },
            position: "absolute",
            right: "60%",
            top: 0,
          }}
        >
          <img src={shape1} alt="shapeImage" />
        </Box>
        <Box
          sx={{
            width: 500,
            color: "#fff",
            display: { xs: "none", sm: "block" },
          }}
        >
          <Typography sx={{ fontWeight: "600", fontSize: 60, lineHeight: 1 }}>
            Welcome to our community
          </Typography>
          <Typography sx={{ fontWeight: "400", fontSize: 18, pt: 2 }}>
            Lorem ipsum clarity gives you the blocks & components you need to
            create a truly professional website.
          </Typography>
        </Box>
      </Grid>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={style}>
          <IconButton
            sx={{ position: "absolute", right: 20, width: 56, height: 56 }}
            onClick={() => setModalOpen(false)}
          >
            <Close sx={{ width: 56, height: 56, color: "#000" }} />
          </IconButton>
          <Grid container>
            <Grid item>
              <DescriptionOutlinedIcon
                sx={{ width: 67, height: 67, color: "#007DFC" }}
              />
            </Grid>
            <Grid item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ color: "#4F4F4F" }}
              >
                Terms and Condition
              </Typography>
              <Typography sx={{ color: "#4F4F4F" }}>
                Last updated July 21, 2023
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Typography
            component="h3"
            sx={{ fontSize: 20, color: "#4F4F4F", mt: 2 }}
          >
            Terms
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim
          </Typography>
          <Typography
            component="h3"
            sx={{ fontSize: 20, color: "#4F4F4F", mt: 2 }}
          >
            Condition
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim
          </Typography>
        </Box>
      </Modal>
    </Grid>
  );
};
