import React, { useState, useEffect } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SharePostDialogCopied from "./sharePostDialogCopied";

const SharePostDialog = ({ open, onClose, postId }) => {
  const [link, setLink] = useState(`${window.location.host}/${postId}`);
  const [showCopiedDialog, setShowCopiedDialog] = useState(false);

  const handleCopy = () => {
    if (window.isSecureContext) {
      navigator.clipboard.writeText(link);
      setShowCopiedDialog(true);
    } else {
      alert('คัดลอกลิงค์สามารถใช้ได้สำหรับ Server Production เท่านั้น')
    }
    
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
          },
        }}
      >
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            ...customFontStyle,
          }}
        >
          แชร์
          <IconButton color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              ...customFontStyle,
              width: "100%",
              textAlign: "center",
              marginTop: "2px",
            }}
          >
            คัดลอกเพื่อแชร์โพสต์
          </div>
          <div
            style={{
              ...customFontStyle,
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              width: "99%",
              textAlign: "left",
              height: "70px",
              borderRadius: "8px",
              border: "2px solid black",
              marginTop: "5%",
              pointerEvents: "none",
            }}
          >
            <p style={{ paddingLeft: "8px" }}>{link}</p>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCopy}
            style={{
              ...customFontStyle,
              width: "100%",
              marginTop: "5%",
              height: "50px",
              fontWeight: 500,
              borderRadius: "8px",
            }}
          >
            คัดลอก
          </Button>
        </DialogContent>
      </Dialog>
      {showCopiedDialog && (
        <SharePostDialogCopied
          open={showCopiedDialog}
          onClose={() => setShowCopiedDialog(false)}
        />
      )}
    </div>
  );
};

export default SharePostDialog;
