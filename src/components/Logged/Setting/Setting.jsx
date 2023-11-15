import { ErrorOutline } from "@mui/icons-material";
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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleGetMyProfile } from "../../../services/profileServices";
import { AddUserData } from "../../../store/userSlice";
import { ProfileCard } from "./components/ProfileCard";
import { ModalDeleteUser } from "./components/ModalDeleteUser";

export const Setting = () => {
  const token = localStorage.getItem("token");
  const ModalRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dialogToggleWarn, setDialogToggleWarn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fectProfileData = async (token) => {
      try {
        const response = await handleGetMyProfile(token);
        dispatch(AddUserData(response.data.session));
      } catch (error) {
        console.log("เกิดข้อผิดพลาด :", error.error);
        if (error.error === "Token not found") {
          localStorage.removeItem("token");
          navigate("/");
        }
      }
    };

    fectProfileData(token);
  }, [dispatch, navigate, token]);

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
