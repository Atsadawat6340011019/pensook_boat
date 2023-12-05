import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Feed } from "./components/Feed";
import { Rightbar } from "./components/Rightbar";
import { Box, Modal, Stack } from "@mui/material";
import { Navbar } from "./components/Navbar";
import { RootLayout } from "./layouts/RootLayout";
import { FeedAndCommentsPage } from "./pages/FeedAndCommentsPage";
import { SettingPage } from "./pages/SettingPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { UnloggedRoute } from "./routes/UnloggedRoute";
import { LoginPage } from "./pages/LoginPage";
import { KeepPostPage } from "./pages/KeepPostPage";
import { MyPostPage } from "./pages/MyPostPage";
import io from "socket.io-client";
import { handleGetNotification } from "./services/getDataServices";
import { useDispatch, useSelector } from "react-redux";
import { AddNotificationData } from "./store/userSlice";
import { HelmetProvider } from "react-helmet-async";
import { CommentMB } from "./components/Logged/Mobile/CommentMB";
import { setCommentMobile } from "./store/mobileSlice";
import { BottomNavbar } from "./components/BottomNavbar";
import Interest from "./components/Login/Interest"

const HomePage = ({
  keepPostData,
  setCommentData,
  setKeepPostData,
  commentData,
}) => {
  const dispatch = useDispatch();
  const mobileCommentToggle = useSelector(
    (state) => state.mobile.commentMobile
  );
  return (
    <>
      <Navbar />
      <Stack
        direction="row"
        spacing={1.8}
        justifyContent={"space-between"}
        sx={{
          bgcolor: "#F1F1F1",
          "&.MuiStack-root": {
            mr: "14.4px",
          },
        }}
      >
        <Sidebar keepPostData={keepPostData} />
        <Box
          maxWidth={1000}
          sx={{
            width: "100%",
            display: { xs: "none", sm: "block" },
          }}
        >
          <Feed
            setCommentData={setCommentData}
            setKeepPostData={setKeepPostData}
          />
        </Box>

        <Box
          maxWidth={1000}
          sx={{
            width: "100%",
            display: { xs: "block", sm: "none", md: "none" },
          }}
        >
          <Feed
            setCommentData={setCommentData}
            setKeepPostData={setKeepPostData}
          />
        </Box>
        <Modal
          open={mobileCommentToggle}
          onClose={() => dispatch(setCommentMobile(false))}
        >
          <CommentMB
            commentData={commentData}
            setCommentData={setCommentData}
          />
        </Modal>
        <Rightbar commentData={commentData} />
        <BottomNavbar />
      </Stack>
    </>
  );
};

function App() {
  const [commentData, setCommentData] = useState();
  const [keepPostData, setKeepPostData] = useState();
  const [refleshKeepPost, setRefleshKeepPost] = useState();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const handleGetNoti = async () => {
    try {
      const notification = await handleGetNotification(token);
      dispatch(AddNotificationData(notification.data.response));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const socket = io(
      process.env.REACT_APP_IS_PROD == "true"
        ? process.env.REACT_APP_BACKEND_URL_PROD
        : process.env.REACT_APP_BACKEND_URL
    );

    socket.on("notification", (data) => {
      let socketMessage = JSON.parse(data);

      console.log(JSON.parse(data));
      console.log(socketMessage.receiverUserId == userId);
      if (socketMessage.receiverUserId == userId) {
        console.log("Update ข้อมูล");
        handleGetNoti();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <HelmetProvider>
      <Box bgcolor="#F1F1F1" sx={{ height: "100vh" }}>
        <Routes>
          <Route element={<UnloggedRoute />}>
            <Route
              path=""
              element={
                <HomePage
                  keepPostData={keepPostData}
                  setCommentData={setCommentData}
                  setKeepPostData={setKeepPostData}
                  commentData={commentData}
                />
              }
            />
            <Route
              path="/featuredpost"
              element={
                <HomePage
                  keepPostData={keepPostData}
                  setCommentData={setCommentData}
                  setKeepPostData={setKeepPostData}
                  commentData={commentData}
                />
              }
            />
            <Route
              path="/:id"
              element={
                <HomePage
                  keepPostData={keepPostData}
                  setCommentData={setCommentData}
                  setKeepPostData={setKeepPostData}
                  commentData={commentData}
                />
              }
            />
          </Route>
          <Route element={<UnloggedRoute />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="interest" element={<Interest />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route
              path=""
              element={<RootLayout refleshKeepPost={refleshKeepPost} />}
            >
              <Route
                path="feed"
                element={
                  <FeedAndCommentsPage
                    setCommentData={setCommentData}
                    commentData={commentData}
                    setRefleshKeepPost={setRefleshKeepPost}
                  />
                }
              />

              <Route
                path="feed/:id"
                element={
                  <FeedAndCommentsPage
                    setCommentData={setCommentData}
                    commentData={commentData}
                    setRefleshKeepPost={setRefleshKeepPost}
                  />
                }
              />
              <Route
                path="search"
                element={
                  <FeedAndCommentsPage
                    setCommentData={setCommentData}
                    commentData={commentData}
                    setRefleshKeepPost={setRefleshKeepPost}
                  />
                }
              />
              <Route
                path="mypost"
                element={
                  <MyPostPage
                    setCommentData={setCommentData}
                    commentData={commentData}
                  />
                }
              />
              <Route
                path="myanonymouspost"
                element={
                  <MyPostPage
                    setCommentData={setCommentData}
                    commentData={commentData}
                  />
                }
              />
              <Route
                path="myreplypost"
                element={
                  <MyPostPage
                    setCommentData={setCommentData}
                    commentData={commentData}
                  />
                }
              />
              <Route
                path="keeppost"
                element={
                  <KeepPostPage
                    setCommentData={setCommentData}
                    commentData={commentData}
                  />
                }
              />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="setting" element={<SettingPage />} />
            </Route>
          </Route>
        </Routes>
      </Box>
    </HelmetProvider>
  );
}

export default App;
