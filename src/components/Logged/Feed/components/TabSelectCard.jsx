import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const TabSelectCard = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      bgcolor="#fff"
      sx={{
        height: 47,
        borderRadius: "8px",
        mb: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="โพสต์ทั้งหมด"
            {...a11yProps(0)}
            sx={{
              fontSize: { xs: 14, md: 18 },
              "&.MuiButtonBase-root:hover": {
                color: "#000",
                borderBottom: "2px solid #007DFC",
              },

              "&.Mui-selected:hover": {
                borderBottom: "none",
                color: "#007DFC",
              },
            }}
            onClick={() => navigate("/mypost")}
          />
          <Tab
            label="โพสต์ที่ไม่เปิดเผยตัวตน"
            {...a11yProps(1)}
            sx={{
              fontSize: { xs: 14, md: 18 },
              "&.MuiButtonBase-root:hover": {
                color: "#000",
                borderBottom: "2px solid #007DFC",
              },

              "&.Mui-selected:hover": {
                borderBottom: "none",
                color: "#007DFC",
              },
            }}
            onClick={() => navigate("/myanonymouspost")}
          />
          <Tab
            label="การตอบกลับ"
            {...a11yProps(2)}
            sx={{
              fontSize: { xs: 14, md: 18 },
              "&.MuiButtonBase-root:hover": {
                color: "#000",
                borderBottom: "2px solid #007DFC",
              },

              "&.Mui-selected:hover": {
                borderBottom: "none",
                color: "#007DFC",
              },
            }}
            onClick={() => navigate("/myreplypost")}
          />
        </Tabs>
      </Box>
    </Box>
  );
};
