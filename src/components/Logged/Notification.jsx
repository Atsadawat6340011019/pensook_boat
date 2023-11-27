import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Close } from "@mui/icons-material";
import { formatTimestamp } from "../../utils/functions";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { handleUpdateNotification } from "../../services/feedServices";
import { useNavigate } from "react-router-dom";
import { AddPostId, CheckNoti } from "../../store/selectSlice";
import { UpdataCommentData } from "../../store/userSlice";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Notification({ onClose }) {
  const token = localStorage.getItem("token");
  const [value, setValue] = React.useState(0);
  const notification = useSelector((state) => state.user.notification);
  const unreadNotificationsNotiList = notification.notiList?.filter(
    (notification) => !notification.isRead
  );
  const unreadNotificationsNotiKeepList = notification.notiKeepList?.filter(
    (notification) => !notification.isRead
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    handleupdateNotificationReadFinal(token, "Normal");
  }, []);

  const handleupdateNotificationReadFinal = async (token, type) => {
    try {
      const sendInvite = await handleUpdateNotification(token, type);
      console.log(sendInvite);
    } catch (error) {
      console.log(error.error);
    }
  };

  return (
    <Box sx={{ width: 520, height: "auto", borderRadius: "8px" }}>
      <Box
        sx={{
          px: 2,
          py: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: 24 }}>
          การแจ้งเตือน
        </Typography>
        <IconButton
          sx={{
            mt: -1,
            width: 30,
            height: 30,
          }}
          onClick={() => onClose()}
        >
          <Close
            sx={{
              color: "#000",
              cursor: "pointer",
            }}
          />
        </IconButton>
      </Box>
      <Box sx={{ px: 2, position: "relative" }}>
        <Badge
          badgeContent={unreadNotificationsNotiList?.length}
          color="error"
          sx={{ position: "absolute", left: "20%" }}
        ></Badge>
        <Badge
          badgeContent={unreadNotificationsNotiKeepList?.length}
          color="error"
          sx={{ position: "absolute", left: "52%" }}
        ></Badge>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="โพสต์ของคุณ"
            onClick={() => {
              //dispatch(addNotificationStock([]));
              handleupdateNotificationReadFinal(token, "Normal");
            }}
            {...a11yProps(0)}
            sx={{
              fontSize: 18,
              "&.MuiButtonBase-root": {
                color: "#808080",
              },
              "&.MuiButtonBase-root:hover": {
                background: "#fff",
                borderBottom: "1.5px solid #007DFC",
                color: "#000",
              },
              "&.Mui-selected": {
                background: "#fff",
                color: "#007DFC",
              },
              "&.Mui-selected:hover": {
                background: "#fff",
                color: "#007DFC",
                borderBottom: "none",
              },
            }}
          />

          <Tab
            label="โพสต์ที่คุณ Keep"
            onClick={() => {
              //dispatch(addNotificationUser([]));
              handleupdateNotificationReadFinal(token, "Keep Post");
            }}
            {...a11yProps(1)}
            sx={{
              fontSize: 18,
              ml: 1,
              textTransform: "none",
              "&.MuiButtonBase-root": {
                color: "#808080",
              },
              "&.MuiButtonBase-root:hover": {
                background: "#fff",
                borderBottom: "1.5px solid #007DFC",
                color: "#000",
              },
              "&.Mui-selected": {
                background: "#fff",
                color: "#007DFC",
              },
              "&.Mui-selected:hover": {
                background: "#fff",
                color: "#007DFC",
                borderBottom: "none",
              },
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box sx={{ overflow: "auto", maxHeight: "70vh" }}>
          {notification.notiList?.map((item) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #E9E9E9",
                py: 2,
                background: item.isRead ? "#fff" : "#E9E9E9",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "#f1f1f1",
                },
              }}
              key={item._id}
              onClick={() => {
                navigate(`/feed/${item.post}`);
                onClose();
                dispatch(CheckNoti(true));
                dispatch(
                  UpdataCommentData(Math.floor(Math.random() * 100) + 1)
                );
                dispatch(AddPostId(item.post));
              }}
            >
              <Avatar src={item?.image} sx={{ mx: 2 }} />
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: 440,
                  }}
                >
                  <Typography sx={{ fontSize: 10, color: "#808080", mb: 1 }}>
                    {formatTimestamp(item?.createTime)}
                  </Typography>
                  {item?.isRead ? null : (
                    <Typography
                      sx={{ fontSize: 10, fontWeight: "500", mb: 1, mr: 2 }}
                    >
                      ใหม่
                    </Typography>
                  )}
                </Box>

                <Typography
                  sx={{ fontSize: 14, fontWeight: "500", height: 40 }}
                >
                  {parse(item?.content.substring(0, 132))}
                  {item.content.length > 132 ? "..." : null}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box sx={{ overflow: "auto", maxHeight: "70vh" }}>
          {notification.notiKeepList?.map((item) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #E9E9E9",
                py: 2,
                background: item.isRead ? "#fff" : "#E9E9E9",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "#f1f1f1",
                },
              }}
              key={item._id}
              onClick={() => {
                navigate(`/feed/${item.post}`);
                onClose();
                dispatch(CheckNoti(true));
                dispatch(
                  UpdataCommentData(Math.floor(Math.random() * 100) + 1)
                );
                dispatch(AddPostId(item.post));
              }}
            >
              <Avatar src={item?.image} sx={{ mx: 2 }} />
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: 440,
                  }}
                >
                  <Typography sx={{ fontSize: 10, color: "#808080", mb: 1 }}>
                    {formatTimestamp(item?.createTime)}
                  </Typography>
                  {item?.isRead ? null : (
                    <Typography
                      sx={{ fontSize: 10, fontWeight: "500", mb: 1, mr: 2 }}
                    >
                      ใหม่
                    </Typography>
                  )}
                </Box>

                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: "500",
                    height: 40,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {parse(item?.content.substring(0, 132))}
                  {item.content.length > 132 ? "..." : null}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
