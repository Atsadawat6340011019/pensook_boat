import React from "react";
import { IconButton, Dialog, DialogContent } from "@mui/material";
import SuccessIcon from "../../../../../assets/success-icon.png";

const sharePostDialogCopied = () => {
  return (
    <Dialog open={true} fullWidth>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "250px",
        }}
      >
        <img src={SuccessIcon} alt="Success Icon" />
        <p
          style={{
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "24px",
            lineHeight: "150%",
            letterSpacing: "-0.019em",
          }}
        >
          คัดลอกสำเร็จ
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default sharePostDialogCopied;
