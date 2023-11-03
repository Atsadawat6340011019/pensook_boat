import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  handleGetMyProfile,
  handleUpdateProfile,
} from "../../../services/profileServices";
import { AddUserData } from "../../../store/userSlice";
import { ProfileCard } from "./components/ProfileCard";
import { ModalDeleteUser } from "./components/ModalDeleteUser";

export const Setting = () => {
  const userData = useSelector((state) => state.user.userData);
  const token = localStorage.getItem("token");
  const ModalRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [stateEdit, setStateEdit] = useState(false);
  const [errorNoti, setErrorNoti] = useState();
  const [dialogToggle, setDialogToggle] = useState(false);
  const [dialogToggleWarn, setDialogToggleWarn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageProflieFile, setImageProflieFile] = useState();
  const [imageProflieCoverFile, setImageProflieCoverFile] = useState();
  const [fileProfile, setFileProfile] = React.useState();
  const [fileProfileCover, setFileProfileCover] = React.useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fectProfileData = async (token) => {
      try {
        const response = await handleGetMyProfile(token);
        dispatch(AddUserData(response.data.session));
      } catch (error) {
        const { response } = error;
        console.error("เกิดข้อผิดพลาด :", response?.data.error);
        if (response?.data.error === "Token not found") {
          localStorage.removeItem("token");
          navigate("/");
        }
      }
    };

    fectProfileData(token);
  }, [dispatch, navigate, stateEdit]);

  const convertToBase64ForProfile = (selectedFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setImageProflieFile(reader.result);
    };
  };

  const convertToBase64ForProfileCover = (selectedFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setImageProflieCoverFile(reader.result);
    };
  };

  const handleChangeFileProfile = (e) => {
    if (e.target.files[0]) {
      setFileProfile(URL.createObjectURL(e.target.files[0]));
      convertToBase64ForProfile(e.target.files[0]);
    } else {
      setFileProfile(null);
    }
  };

  const handleChangeFileProfileCover = (e) => {
    if (e.target.files[0]) {
      setFileProfileCover(URL.createObjectURL(e.target.files[0]));
      convertToBase64ForProfileCover(e.target.files[0]);
    } else {
      setFileProfileCover(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const dataUpdate = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      profileImage: imageProflieFile,
      profileCover: imageProflieCoverFile,
    };

    console.log(dataUpdate);
    setErrorNoti("");
    handleUpdateProfileFinal(token, dataUpdate);
  };

  const handleUpdateProfileFinal = async (token, dataUpdate) => {
    try {
      const UpdateData = await handleUpdateProfile(token, dataUpdate);
      console.log(UpdateData);
      if (UpdateData.response.status === "success") {
        setDialogToggle(true);
        setTimeout(() => {
          setDialogToggle(false);
          setStateEdit(false);
        }, 2000);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error.error);
      setErrorNoti("กำลังปรับปรุงระบบ");
    }
  };

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
        การตั้งค่า
      </Typography>
      <Divider sx={{ pt: 3 }} />
      <ProfileCard setDialogToggleWarn={setDialogToggleWarn} />

      <Dialog
        open={dialogToggle}
        sx={{
          "& .MuiPaper-root": { borderRadius: "8px" },
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
            บันทึกข้อมูลสำเร็จ
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        open={dialogToggleWarn}
        sx={{
          "& .MuiPaper-root": { borderRadius: "8px", px: -2 },
          py: 5,
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
          <ErrorOutline
            sx={{
              width: 63,
              height: 63,
              color: "#007dfc",
            }}
          />
          <DialogContentText
            id="alert-dialog-description"
            align="center"
            sx={{ fontSize: 24, color: "#000" }}
          >
            ยืนยันที่จะลบบัญชีหรือไม่
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 0 }}>
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  height: 60,
                  width: 200,
                  fontSize: 18,
                  borderRadius: 0,
                }}
                style={{ color: "#ffff" }}
                onClick={() => setDialogToggleWarn(false)}
              >
                ยกเลิก
              </Button>
            </Grid>
            <Grid item>
              <Button
                ref={ModalRef}
                variant="contained"
                color="primary"
                sx={{
                  height: 60,
                  width: 200,
                  borderRadius: 0,
                  fontSize: 18,
                }}
                onClick={() => setModalOpen(true)}
              >
                ยืนยัน
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalDeleteUser
          ModalRef={ModalRef}
          onClose={() => setModalOpen(false)}
        />
      </Modal>
    </Box>
  );
};
