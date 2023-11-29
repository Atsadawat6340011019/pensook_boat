import { Box, Button, Grid, OutlinedInput, Typography } from "@mui/material";
//import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import React, { forwardRef } from "react";
import LogoPensook from "../../../../assets/LogoPensook.png";
//import { CheckCircleOutline } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleDeleteProfile } from "../../../../services/profileServices";
import { auth } from "../../../../services/firebase";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 800,
  height: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const ModalDeleteUser = forwardRef(({ ModalRef, onClose }) => {
  const userData = useSelector((state) => state.user.userData);
  const [email, setEmail] = React.useState("");
  const [errorNoti, setErrorNoti] = React.useState("");
  //const [dialogToggle, setDialogToggle] = React.useState(false);

  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleKeyDown = async (event) => {
    event.key === "Enter" && (await EnterSubmit(event));
  };

  const EnterSubmit = async (event) => {
    await handleSubmitDelete(event);
  };

  const handleSubmitDelete = async (event) => {
    event.preventDefault();
    try {
      if (isValidEmail(email)) {
        if (email === userData.email) {
          console.log("ตรง", email);
          setErrorNoti(null);
          const token = localStorage.getItem("token");
          const deleteProfileFinal = await handleDeleteProfile(token);
          console.log(deleteProfileFinal);
          if (deleteProfileFinal.response.status === "success") {
            auth.currentUser
              .delete()
              .then(() => {
                localStorage.removeItem("token");
                navigate("/");
              })
              .catch((error) => {
                console.log(error);
                setErrorNoti("กำลังปรับปรุงระบบ");
              });
          }
        } else {
          setErrorNoti("Email ไม่ตรงกับที่เข้าสู่ระบบ");
        }
      } else if (!isValidEmail(email)) {
        setErrorNoti("รูปแบบ Email ไม่ถูกต้อง");
      }
    } catch (error) {
      console.log(error.error);
    }
  };

  return (
    <Box ref={ModalRef} component="form" noValidate={false} sx={style}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 8,
        }}
      >
        <img width={200} src={LogoPensook} alt="pensook-logo" />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 400,
          mt: 5,
        }}
      >
        <Typography sx={{ fontSize: 24, fontWeight: "600" }}>
          ลบบัญชี
        </Typography>
        <Typography sx={{ fontSize: 12 }}>
          หากคุณต้องการลบบัญชี โปรดกรอกอีเมลอีกครั้งเพื่อเป็นการยืนยัน
        </Typography>
        <Typography
          sx={{ mt: 8, fontSize: 18, fontWeight: "regular" }}
          component="h2"
          variant="subtitle1"
        >
          อีเมล
        </Typography>
        <OutlinedInput
          ref={ModalRef}
          sx={{
            borderRadius: "8px",
            maxWidth: 400,
            width: "100%",
            height: 50,
            fontWeight: "500",
          }}
          required
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Box>
      <Typography align="center" sx={{ mt: 1, color: "red" }}>
        {errorNoti && errorNoti}
      </Typography>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", pt: 25 }}
      >
        <Grid
          item
          sx={{
            mr: { xs: 0, md: 1 },
            pb: { xs: 1, md: 0 },
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{
              height: 50,
              width: 290,
              borderRadius: "8px",
              fontSize: 16,
            }}
            style={{ color: "#ffff" }}
            onClick={onClose}
          >
            ยกเลิก
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={EnterSubmit}
            variant="contained"
            color="primary"
            sx={{
              height: 50,
              width: 290,
              borderRadius: "8px",
              fontSize: 16,
            }}
          >
            ยืนยัน
          </Button>
        </Grid>
      </Grid>
      {/*<Dialog
        open={dialogToggle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiPaper-root": { borderRadius: 5 },
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 5,
            px: 8,
          }}
        >
          <CheckCircleOutline
            sx={{
              width: 63,
              height: 63,
              color: "#75f24c",
            }}
          />
          <DialogContentText
            id="alert-dialog-description"
            align="center"
            sx={{ fontSize: 24 }}
          >
            ออกจากทีมสำเร็จ
          </DialogContentText>
        </DialogContent>
      </Dialog>*/}
    </Box>
  );
});
