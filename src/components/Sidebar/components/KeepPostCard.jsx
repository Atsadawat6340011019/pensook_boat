import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddPostId } from "../../../store/selectSlice";
import { TfiCommentAlt } from "react-icons/tfi";
import { CiFaceSmile } from "react-icons/ci";
import verifiedIcon from "../../../assets/verified-icon.png";

export const KeepPostCard = ({ data }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      bgcolor="#F1F1F1"
      sx={{
        minWidth: 200,
        maxWidth: 500,
        height: 80,
        borderRadius: "8px",
        px: 0.5,
        display: "flex",
        alignItems: "center",
        mb: 1,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f2f6fa",
        },
      }}
      onClick={() => {
        navigate(`/${data?.postId}`);
        dispatch(AddPostId(data?.postId));
      }}
    >
      {data.attachImageList.length > 0 && (
        <img
          src={data.attachImageList[0]}
          alt="columnPicture"
          width={85}
          height={70}
          style={{ objectFit: "cover", borderRadius: "8px" }}
        />
      )}

      <Box sx={{ px: 2, pt: 1 }}>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: 10,
            color: "#007DFC",
            display: "flex",
            alignItems: "center",
          }}
        >
          {data.isAnonymous ? (
            "สมาชิกไม่เปิดเผยตัวตน"
          ) : data.verified ? (
            <React.Fragment>
              {`${data.fullName} `}
              <img
                src={verifiedIcon}
                alt="Verified Icon"
                style={{ width: "16px", height: "16px", marginLeft: "4px" }}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>{`${data.fullName} `}</React.Fragment>
          )}
        </Typography>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: 12,
            maxWidth: windowSize.width / 12,
          }}
          noWrap
        >
          {data.label}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
            <CiFaceSmile size={15} color="#000" />
            <Typography sx={{ fontWeight: "400", fontSize: 10, ml: 1 }}>
              {data.upVote}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TfiCommentAlt size={12} color="#000" />
            <Typography sx={{ fontWeight: "400", fontSize: 10, ml: 1 }}>
              {data.commentList.length}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
