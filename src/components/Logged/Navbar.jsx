import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import LogoPensook from "../../assets/LogoPensook.png";
import LogoPensook32 from "../../assets/PENSOOK_logo_32.png";
import { NotificationsNone, SearchOutlined } from "@mui/icons-material";
import { auth } from "../../services/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddNotificationData, AddUserData } from "../../store/userSlice";
import {
  handleGetNotification,
  handleGetSearchList,
} from "../../services/getDataServices";
import { AddSearchKeyword, AddSearchPostId } from "../../store/selectSlice";
import Notification from "./Notification";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  padding: "0 10px",
  borderRadius: "8px",
  border: "1px #E7EAEE solid",
  width: "50%",
  display: "flex",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

export const Navbar = () => {
  const token = localStorage.getItem("token");
  const [anchorEl, setAnchorEl] = useState();
  const userData = useSelector((state) => state.user.userData);
  const notification = useSelector((state) => state.user.notification);
  const unreadNotificationsNotiList = notification.notiList?.filter(
    (notification) => !notification.isRead
  );
  const unreadNotificationsNotiKeepList = notification.notiKeepList?.filter(
    (notification) => !notification.isRead
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const [notificationToggle, setNotificationToggle] = useState(false);
  const openNoti = Boolean(notificationToggle);
  const searchBoxRef = useRef();
  const [showResults, setShowResults] = useState(false);
  const [dataSearch, setDataSearch] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    auth.signOut();
    dispatch(AddUserData([]));
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term !== "") {
      const results = dataSearch.filter((item) =>
        item.label.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);

      if (e.key === "Enter") {
        const postArray = results.map((item) => item._id);
        if (postArray) {
          dispatch(AddSearchPostId(postArray));
          navigate("/search");
        }
        setShowResults(false);
      }
    } else {
      setSearchResults();
      setShowResults(false);
    }
  };

  const handleButtonSearch = () => {
    const postArray = searchResults?.map((item) => item._id);
    if (postArray) {
      dispatch(AddSearchPostId(postArray));
      navigate("/search");
    }
  };

  const handleGetNoti = async () => {
    try {
      const notification = await handleGetNotification(token);
      dispatch(AddNotificationData(notification.data.response));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOutside = (e) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    handleGetSearchList(token)
      .then((response) => {
        console.log(response.data);
        setDataSearch(response.data.response.searchList);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <AppBar position="sticky" sx={{ background: "#fff", mb: 2 }}>
      <StyledToolbar>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            height: 64,
            width: 600,
            justifyContent: "space-between",
          }}
        >
          <a href="/feed" style={{ height: 28 }}>
            <img
              src={LogoPensook}
              width={125}
              height={28}
              alt="logoPensook"
              style={{ cursor: "pointer" }}
            />
          </a>
          <Box
            sx={{ display: "flex", alignItems: "center", position: "relative" }}
            ref={searchBoxRef}
          >
            <Typography
              sx={{
                bgcolor: "#007DFC",
                fontSize: 14,
                fontWeight: 500,
                px: 1,
                height: 40,
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              ค้นหา
            </Typography>
            <InputBase
              ref={searchBoxRef}
              fullWidth
              placeholder="ช่วงนี้คุณเป็นยังไงบ้าง..."
              sx={{
                border: "1px solid #E7EAEE",
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
                height: 40,
                fontSize: 14,
                width: 300,
                pl: 2,
                pr: 1,
              }}
              endAdornment={
                <IconButton
                  onClick={() => {
                    handleButtonSearch();
                    setShowResults(false);
                  }}
                >
                  <SearchOutlined sx={{ color: "#000" }} />
                </IconButton>
              }
              value={searchTerm}
              onChange={handleSearch}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  document.getElementById(`searchResult-${0}`)?.focus();
                } else if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
            />
            {showResults && (
              <Box
                sx={{
                  position: "absolute",
                  color: "#000",
                  border: "1px solid #E7EAEE",
                  bgcolor: "#fff",
                  width: 350,
                  top: 45,
                  borderRadius: "8px",
                  left: -2,
                  maxHeight: 182,
                  overflow: "auto",
                }}
              >
                {searchResults?.map((item, index) => (
                  <MenuItem
                    key={item._id}
                    onClick={() => {
                      if (item._id === null) {
                        dispatch(AddSearchKeyword(item?.label));
                      } else if (item._id) {
                        dispatch(AddSearchPostId([item?._id]));
                        dispatch(AddSearchKeyword(undefined));
                      }
                      setSearchTerm(item?.label);
                      setShowResults(false);
                      navigate(`/search`);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (item._id === null) {
                          dispatch(AddSearchKeyword(item?.label));
                        } else if (item._id) {
                          dispatch(AddSearchPostId([item?._id]));
                          dispatch(AddSearchKeyword(undefined));
                        }
                        setSearchTerm(item?.label);
                        setShowResults(false);
                        navigate(`/search`);
                      } else if (e.key === "ArrowUp" && index > 0) {
                        // Handle arrow up
                        // Move focus to the previous item if it's not the first item
                        document
                          .getElementById(`searchResult-${index - 1}`)
                          ?.focus();
                      } else if (
                        e.key === "ArrowDown" &&
                        index < searchResults.length - 1
                      ) {
                        // Handle arrow down
                        // Move focus to the next item if it's not the last item
                        document
                          .getElementById(`searchResult-${index + 1}`)
                          ?.focus();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    id={`searchResult-${index}`}
                  >
                    <div
                      style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      {item.label}
                    </div>
                  </MenuItem>
                ))}
              </Box>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            alignItems: "center",
            height: 64,
          }}
        >
          <img src={LogoPensook32} width={40} height={40} alt="logoPensook" />
        </Box>

        <Icons>
          <IconButton
            sx={{
              "& .MuiBadge-standard": {
                mt: 1,
                mr: 1,
              },
            }}
            onClick={(event) => {
              setNotificationToggle(event.currentTarget);
              handleGetNoti();
            }}
          >
            <Badge
              badgeContent={
                unreadNotificationsNotiList?.length +
                unreadNotificationsNotiKeepList?.length
              }
              color="error"
            >
              <NotificationsNone
                sx={{
                  width: 40,
                  height: 40,
                  color: "#000",
                  cursor: "pointer",
                }}
              />
            </Badge>
          </IconButton>
          <Avatar
            src={userData?.profileImagePath}
            alt="userImage"
            sx={{
              width: 40,
              height: 40,
              cursor: "pointer",
              "&:hover": {
                opacity: "80%",
              },
            }}
            onClick={handleClick}
          />
        </Icons>

        <UserBox>
          <Avatar
            src={userData?.profileImagePath}
            sx={{ width: 40, height: 40 }}
            onClick={handleClick}
          />
        </UserBox>
      </StyledToolbar>

      {/*Profile Menu*/}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          "& .MuiPopover-paper": {
            borderRadius: "8px",
            width: 332,
            height: 125,
          },
        }}
      >
        <Box px={4} py={2}>
          <Typography sx={{ fontWeight: "600", fontSize: 18 }}>
            {userData?.firstName} {userData?.lastName}
          </Typography>
          <Typography sx={{ fontSize: 12, color: "#808080" }}>
            {userData.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{
            display: "flex",
            justifyContent: "center",
            "&:hover": {
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            },
          }}
        >
          <Typography sx={{ fontWeight: "500", fontSize: 18 }}>
            ออกจากระบบ
          </Typography>
        </MenuItem>
      </Menu>

      {/*Notification*/}

      <Menu
        anchorEl={notificationToggle}
        id="account-menu"
        open={openNoti}
        onClose={() => {
          setNotificationToggle(false);
          handleGetNoti();
        }}
        sx={{
          "& .MuiPopover-paper": {
            borderRadius: "8px",
          },
        }}
        PaperProps={{
          borderradius: 100,
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Notification onClose={() => setNotificationToggle(null)} />
      </Menu>
    </AppBar>
  );
};
