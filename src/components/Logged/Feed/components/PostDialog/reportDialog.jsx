import React, { useState, useEffect } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import ReportDialogReported from "./reportDialogReported";
import { handleSendReport } from "../../../../../services/feedServices";

const ReportDialog = ({ open, onClose, postId, commentId }) => {
  const token = localStorage.getItem("token");
  const userData = useSelector((state) => state.user.userData);
  const [description, setDescription] = useState();
  const [reportType, setReportType] = useState("none");
  const navigate = useNavigate();
  const [showCopiedDialog, setShowCopiedDialog] = useState(false);

  const handleCopy = async () => {
    const content = {
      postId: postId,
      reportType: reportType,
      description: description,
    };

    console.log(content);

    const sendReport = await handleSendReport(token, content);
    console.log(sendReport);
    if (sendReport.session) {
      setShowCopiedDialog(true);
    }
  };

  const handleSelectReportType = (event) => {
    setReportType(event.target.value);
  };

  useEffect(() => {
    if (showCopiedDialog) {
      const timeout = setTimeout(() => {
        setShowCopiedDialog(false);
        onClose();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [showCopiedDialog, onClose]);

  const customFontStyle = {
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "20px",
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        PaperProps={{
          style: {
            borderRadius: "8px",
            maxWidth: "550px",
          },
        }}
      >
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            borderBottom: "1px solid #F1F1F1",
            ...customFontStyle,
          }}
        >
          <div
            style={{
              flex: 1,
              textAlign: "center",
              position: "absolute",
              zIndex: 999,
              width: "80%",
            }}
          >
            รายงาน
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
              width: "100%",
            }}
          >
            <IconButton
              color="inherit"
              onClick={() => {
                onClose();
                setReportType("none");
                setDescription("");
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            ...customFontStyle,
            // height: "760px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "70px",
              display: "flex",
              alignItems: "center",
              textAlign: "left",
            }}
          >
            <Avatar
              src={userData?.profileImagePath}
              sx={{
                width: 40,
                height: 40,
                cursor: "pointer",
                "&:hover": {
                  opacity: "80%",
                },
              }}
              alt="coverImage"
              onClick={() => navigate("/mypost")}
            />
            <p style={{ paddingLeft: "10px" }}>
              {`${userData?.firstName} ${userData?.lastName}`.trim()}
            </p>
          </div>
          <div
            style={{
              width: "80%",
              display: "flex",
              alignItems: "left",
            }}
          >
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                style={{
                  ...customFontStyle,
                }}
                value={reportType}
                onChange={handleSelectReportType}
              >
                <FormControlLabel
                  value="ความรุนแรง"
                  control={<Radio />}
                  label="ความรุนแรง"
                />
                <FormControlLabel
                  value="ข้อมูลเท็จ"
                  control={<Radio />}
                  label="ข้อมูลเท็จ"
                />
                <FormControlLabel
                  value="การก่อการร้าย"
                  control={<Radio />}
                  label="การก่อการร้าย"
                />
                <FormControlLabel
                  value="การคุกคาม"
                  control={<Radio />}
                  label="การคุกคาม"
                />
                <FormControlLabel
                  value="การขายที่ไม่ได้รับอนุญาต"
                  control={<Radio />}
                  label="การขายที่ไม่ได้รับอนุญาต"
                />
                <FormControlLabel
                  value="ภาพโป๊เปลือย"
                  control={<Radio />}
                  label="ภาพโป๊เปลือย"
                />
                <FormControlLabel
                  value="การฆ่าตัวตายหรือทำร้ายตัวเอง"
                  control={<Radio />}
                  label="การฆ่าตัวตายหรือทำร้ายตัวเอง"
                />
                <FormControlLabel
                  value="คำพูดที่แสดงถึงความเกลียดชัง"
                  control={<Radio />}
                  label="คำพูดที่แสดงถึงความเกลียดชัง"
                />
                <FormControlLabel
                  value="สแปม"
                  control={<Radio />}
                  label="สแปม"
                />
                <FormControlLabel
                  value="อื่น ๆ"
                  control={<Radio />}
                  label="อื่น ๆ"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="เขียนอธิบายบางอย่างว่าเกิดอะไรขึ้นกับโพสต์ หรือความคิดเห็นนี้..."
            style={{ marginTop: "5%", width: "80%" }}
            variant="standard"
            InputProps={{ disableUnderline: true }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCopy}
            style={{
              ...customFontStyle,
              width: "100px",
              marginTop: "5%",
              height: "50px",
              fontWeight: 500,
              borderRadius: "8px",
            }}
          >
            รายงาน
          </Button>
        </DialogContent>
      </Dialog>
      {showCopiedDialog && (
        <ReportDialogReported
          open={showCopiedDialog}
          onClose={() => setShowCopiedDialog(false)}
        />
      )}
    </div>
  );
};

export default ReportDialog;
