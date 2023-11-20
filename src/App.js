import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Feed } from "./components/Feed";
import { Rightbar } from "./components/Rightbar";
import { Box, Stack } from "@mui/material";
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
import io from 'socket.io-client';

const HomePage = ({
  keepPostData,
  setCommentData,
  setKeepPostData,
  commentData,
}) => (
  <>
    <Navbar />
    <Stack
      direction="row"
      spacing={1.8}
      justifyContent={"space-between"}
      sx={{ bgcolor: "#F1F1F1" }}
    >
      <Sidebar keepPostData={keepPostData} />
      <Feed setCommentData={setCommentData} setKeepPostData={setKeepPostData} />
      <Rightbar commentData={commentData} />
    </Stack>
  </>
);

function App() {
  const [commentData, setCommentData] = useState();
  const [keepPostData, setKeepPostData] = useState();
  const [refleshKeepPost, setRefleshKeepPost] = useState();

  //const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    const socket = io(
      process.env.REACT_APP_IS_PROD == 'true'
        ? process.env.REACT_APP_BACKEND_URL_PROD
        : process.env.REACT_APP_BACKEND_URL
    );
  
    socket.on("notification", (data) => {
      let socketMessage = JSON.parse(data)
      let userId = "someIdfromcookie"
      console.log(JSON.parse(data))
      if (socketMessage.receiverUserId == userId) {
        // if have data call API getNotification
      }
    })
  
    return () => {
      socket.disconnect();
    };
  
  }, []);

  return (
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
  );
}

export default App;
