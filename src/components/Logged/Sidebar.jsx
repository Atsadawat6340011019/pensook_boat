import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { KeepPostCard } from "./Sidebar/components/KeepPostCard";
import { MenuNameCard } from "./Sidebar/components/MenuNameCard";
import { ProfileCard } from "./Sidebar/components/ProfileCard";
import { useNavigate } from "react-router-dom";
import { handleGetKeepPost } from "../../services/feedServices";
import { useSelector } from "react-redux";

export const Sidebar = ({}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [keepPostData, setKeepPostData] = useState();
  const UpdateData = useSelector((state) => state.user.updateData);

  useEffect(() => {
    const fecthData = async (token) => {
      const response = await handleGetKeepPost(token);
      setKeepPostData(response.data.response);
    };
    fecthData(token);
  }, [UpdateData]);
  return (
    <Box
      flex={1.5}
      sx={{ display: { xs: "none", sm: "block" }, pl: 2 }}
      maxWidth={350}
    >
      <MenuNameCard />
      <ProfileCard />
      <Box bgcolor="#fff" sx={{ borderRadius: "8px", mt: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "500", fontSize: 18, pt: 2, pl: 2, mb: 2 }}
          >
            โพสต์ที่คุณ Keep
          </Typography>
          {keepPostData?.length > 0 && (
            <Typography
              sx={{
                fontSize: 14,
                pr: 2,
                color: "#007DFC",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={() => navigate("/keeppost")}
            >
              {"ดูทั้งหมด >"}
            </Typography>
          )}
        </Box>

        <Box sx={{ px: 2, overflow: "auto", height: 430 }}>
          {keepPostData?.map((item, index) => (
            <KeepPostCard key={index} data={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
