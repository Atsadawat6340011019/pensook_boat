import {
  ArrowBackIosRounded,
  CheckCircleOutline,
  EditOutlined,
  ModeEditOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Divider,
  Grid,
  IconButton,
  OutlinedInput,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  handleGetMyProfile,
  handleUpdateProfile,
} from "../../../services/profileServices";
import { AddUserData } from "../../../store/userSlice";
import ImageCropperDialog from "./imageCropperDialog";
import Resizer from "react-image-file-resizer";
import { setMenuMobile } from "../../../store/mobileSlice";

export const Profile = () => {
  const userData = useSelector((state) => state.user.userData);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [stateEdit, setStateEdit] = useState(false);
  const [errorNoti, setErrorNoti] = useState();
  const [dialogToggle, setDialogToggle] = useState(false);
  const [imageProflieFile, setImageProflieFile] = useState();
  const [imageProflieCoverFile, setImageProflieCoverFile] = useState();
  const [fileProfile, setFileProfile] = React.useState();
  const [fileProfileCover, setFileProfileCover] = React.useState();

  // Crop start
  const [cropperProps, setCropperProps] = useState({
    imagePath: "",
    imageObject: undefined,
    aspectRatio: 1 / 1,
    sharp: "rect",
    action: "",
  });
  const [openCropper, setOpenCropper] = useState(false);

  const handleEditLogo = (image) => {
    if (image) {
      setCropperProps({
        imagePath: URL.createObjectURL(image),
        imageObject: image,
        aspectRatio: 1 / 1,
        sharp: "round",
        action: "logo",
      });
      setOpenCropper(true);
    }
  };

  const handleEditCover = (image) => {
    if (image) {
      setCropperProps({
        imagePath: URL.createObjectURL(image),
        imageObject: image,
        aspectRatio: 3 / 1,
        sharp: "rect",
        action: "cover",
      });
      setOpenCropper(true);
    }
  };

  // const handleImageChange = (data) => {
  //   if (cropperProps.action === "logo") {
  //     setImageProflieFile(data);
  //     setFileProfile(data);
  //   } else if (cropperProps.action === "cover") {
  //     setImageProflieCoverFile(data);
  //     setFileProfileCover(data);
  //   }
  // };

  const handleImageChange = (data) => {
    const maxSize = 2 * 1024 * 1024; // 2MB

    // Convert base64 data URI to Blob
    const byteString = atob(data.split(",")[1]);
    const mimeString = data.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });

    // Resize the image
    Resizer.imageFileResizer(
      blob,
      300, // Width (adjust as needed)
      300, // Height (adjust as needed)
      "JPEG", // Output format (you can change it to 'PNG' or others)
      100, // Quality (adjust as needed)
      0, // Rotation (0 for no rotation)
      (resizedImage) => {
        // Check if resized image is under 2MB
        const reader = new FileReader();
        reader.readAsDataURL(resizedImage);
        reader.onloadend = () => {
          const base64Data = reader.result;

          // Check if resized image is under 2MB
          if (resizedImage.size <= maxSize) {
            if (cropperProps.action === "logo") {
              setImageProflieFile(base64Data);
              setFileProfile(base64Data);
            } else if (cropperProps.action === "cover") {
              setImageProflieCoverFile(base64Data);
              setFileProfileCover(base64Data);
            }
          } else {
            console.error("Resized image exceeds 2MB limit.");
            // Handle the case where the resized image is still too large
          }
        };
      },
      "blob", // Output type ('blob' or 'base64')
      0, // Cross-Origin Access Control (CORS) setting (0 for no CORS)
      (error) => {
        console.error("Error resizing image:", error);
        // Handle the error
      }
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
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
  }, [dispatch, navigate, stateEdit]);

  const convertToBase64ForProfileCover = (selectedFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setImageProflieCoverFile(reader.result);
    };
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

    const firstName = data.get("firstName");
    const lastName = data.get("lastName");

    const onlyCharactersRegex = /^[A-Za-zก-๙]+$/;

    if (
      !onlyCharactersRegex.test(firstName) ||
      !onlyCharactersRegex.test(lastName)
    ) {
      setErrorNoti("ชื่อ และนามสกุล สามารถใช้ได้เพียงตัวอักษร");
      return;
    }

    const dataUpdate = {
      firstName: firstName,
      lastName: lastName,
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
      console.log("เกิดข้อผิดพลาด:", error.error);
      setErrorNoti("กำลังปรับปรุงระบบ");
      setTimeout(() => {
        setErrorNoti("");
      }, 1500);
    }
  };

  return (
    <Box
      component="form"
      noValidate={false}
      onSubmit={handleSubmit}
      bgcolor="#fff"
      sx={{
        height: "auto",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      <IconButton
        sx={{
          display: { xs: "block", sm: "none" },
          position: "absolute",
          top: 10,
          left: 5,
        }}
        onClick={() => {
          dispatch(setMenuMobile(true));
          navigate("/feed");
        }}
      >
        <ArrowBackIosRounded sx={{ color: "#000", width: 30, height: 30 }} />
      </IconButton>
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
          pb: stateEdit ? 15 : 20,
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
            <Box
              sx={{
                position: "relative",
              }}
            >
              <img
                src={fileProfile ? fileProfile : userData?.profileImagePath}
                style={{
                  width: 150,
                  height: 150,
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginTop: "30px",
                }}
                alt="ProfileImage"
              />
              <Box
                sx={{
                  backgroundColor: "#007dfc",
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  top: 150,
                  right: 10,
                  cursor: "pointer",
                  opacity: "80%",
                }}
              >
                <label
                  htmlFor="imagePF"
                  style={{ cursor: "pointer", width: 30, height: 30 }}
                >
                  <ModeEditOutlined
                    sx={{ width: 30, height: 30 }}
                    style={{ color: "#ffff" }}
                  />
                </label>
                <input
                  style={{ display: "none", visibility: "none" }}
                  id="imagePF"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => handleEditLogo(e.target.files[0])}
                />
                <ImageCropperDialog
                  open={openCropper}
                  onClose={() => {
                    setOpenCropper(false);
                  }}
                  callback={handleImageChange}
                  imagePath={cropperProps.imagePath}
                  aspectRatio={cropperProps.aspectRatio}
                  shape={cropperProps.sharp}
                />
              </Box>
            </Box>

            <Typography
              align="center"
              sx={{ fontWeight: "500", fontSize: 18, pt: 3 }}
            >
              ชื่อผู้ใช้งาน
            </Typography>
            <Grid
              container
              justifyContent={"center"}
              spacing={2}
              sx={{ pt: 2, pb: 3 }}
            >
              <Grid item>
                <OutlinedInput
                  sx={{ height: 50, fontWeight: "500", borderRadius: "8px" }}
                  defaultValue={userData.firstName}
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                />
              </Grid>
              <Grid item>
                <OutlinedInput
                  sx={{ height: 50, fontWeight: "500", borderRadius: "8px" }}
                  defaultValue={userData.lastName}
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                />
              </Grid>
            </Grid>
            <Typography
              align="center"
              sx={{ fontWeight: "500", fontSize: 18, pt: 2, pb: 2 }}
            >
              ภาพปก
            </Typography>
            <Box sx={{ position: "relative" }}>
              <img
                src={
                  fileProfileCover
                    ? fileProfileCover
                    : userData.profileCover
                    ? userData.profileCoverPath
                    : "https://images.squarespace-cdn.com/content/v1/5b7fcdb28ab722e3da4af3cc/1592215617998-RGLPH8B4W7F4T2PBIGW1/Dust+Grey.jpeg"
                }
                style={{
                  maxWidth: 640,
                  width: "100%",
                  maxHeight: 200,
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                alt="coverImage"
              />
              <Box
                sx={{
                  backgroundColor: "#007dfc",
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  bottom: -10,
                  right: -20,
                  cursor: "pointer",
                  opacity: "80%",
                }}
              >
                <label
                  htmlFor="imagePFC"
                  style={{ cursor: "pointer", width: 30, height: 30 }}
                >
                  <ModeEditOutlined
                    sx={{ width: 30, height: 30 }}
                    style={{ color: "#ffff" }}
                  />
                </label>
                <input
                  style={{ display: "none", visibility: "none" }}
                  id="imagePFC"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => handleEditCover(e.target.files[0])}
                />
              </Box>
            </Box>
            <Typography align="center" sx={{ mt: 1, color: "red" }}>
              {errorNoti && errorNoti}
            </Typography>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 2,
                pb: { xs: 2 },
              }}
            >
              <Grid
                item
                sx={{
                  mr: { xs: 0, md: 1 },
                  mb: { xs: 1, md: 0 },
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    height: 50,
                    width: 250,
                    borderRadius: "8px",
                    fontSize: 16,
                  }}
                  style={{ color: "#ffff" }}
                  onClick={() => {
                    setStateEdit(false);
                    setFileProfile(null);
                    setFileProfileCover(null);
                  }}
                >
                  ยกเลิก
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    height: 50,
                    width: 250,
                    borderRadius: "8px",
                    fontSize: 16,
                  }}
                >
                  บันทึก
                </Button>
              </Grid>
            </Grid>
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
                right: { xs: 25, md: 100 },
              }}
              startIcon={<EditOutlined />}
              onClick={() => setStateEdit(true)}
            >
              แก้ไข
            </Button>

            <img
              src={userData?.profileImagePath}
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
              {userData?.firstName} {userData?.lastName}
            </Typography>
            <img
              src={
                userData.profileCover
                  ? userData.profileCoverPath
                  : "https://images.squarespace-cdn.com/content/v1/5b7fcdb28ab722e3da4af3cc/1592215617998-RGLPH8B4W7F4T2PBIGW1/Dust+Grey.jpeg"
              }
              style={{
                maxWidth: 640,
                width: "100%",
                maxHeight: 200,
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
              alt="coverImage"
            />
          </>
        )}
      </Box>

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
      <Toolbar sx={{ display: { xs: "block", md: "none" } }} />
    </Box>
  );
};
