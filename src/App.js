import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Feed } from "./components/Feed";
import { Rightbar } from "./components/Rightbar";
import { Box, Stack } from "@mui/material";
import { Navbar } from "./components/Navbar";
import { auth } from "./services/firebase";
import { useDispatch } from "react-redux";
import { AddUserData } from "./store/userSlice";
import { RootLayout } from "./layouts/RootLayout";
import { FeedAndCommentsPage } from "./pages/FeedAndCommentsPage";
import { SettingPage } from "./pages/SettingPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { UnloggedRoute } from "./routes/UnloggedRoute";
import { LoginPage } from "./pages/LoginPage";

const HomePage = ({
  keepPostData,
  setCommentData,
  setKeepPostData,
  commentData,
}) => (
  <>
    <Navbar />
    <Stack direction="row" spacing={1.8} justifyContent={"space-between"}>
      <Sidebar keepPostData={keepPostData} />
      <Feed setCommentData={setCommentData} setKeepPostData={setKeepPostData} />
      <Rightbar commentData={commentData} />
    </Stack>
  </>
);

function App() {
  const [commentData, setCommentData] = useState();
  const [keepPostData, setKeepPostData] = useState();
  //const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdTokenResult();
        console.log("userData:", user);
        dispatch(
          AddUserData({
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            token: idToken.token,
          })
        );
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

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
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="" element={<RootLayout />}>
            <Route
              path="feed"
              element={
                <FeedAndCommentsPage
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
