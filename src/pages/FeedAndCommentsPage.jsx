import React from "react";
import { Feed } from "../components/Logged/Feed";
import { Rightbar } from "../components/Logged/Rightbar";
import { NotificationMB } from "../components/Logged/Mobile/NotificationMB";
import { useDispatch, useSelector } from "react-redux";
import { Box, Modal } from "@mui/material";
import { MenuMB } from "../components/Logged/Mobile/MenuMB";
import { SearchMB } from "../components/Logged/Mobile/SearchMB";
import { CommentMB } from "../components/Logged/Mobile/CommentMB";
import { setCommentMobile } from "../store/mobileSlice";
export const FeedAndCommentsPage = ({
  setCommentData,
  commentData,
  setRefleshKeepPost,
}) => {
  const dispatch = useDispatch();
  const mobileNotiToggle = useSelector(
    (state) => state.mobile.notificationMobile
  );
  const mobileMenuToggle = useSelector((state) => state.mobile.menuMobile);
  const mobileSearchToggle = useSelector((state) => state.mobile.searchMobile);
  const mobileCommentToggle = useSelector(
    (state) => state.mobile.commentMobile
  );

  return (
    <>
      <Box
        maxWidth={1000}
        sx={{
          width: "100%",
          display: { xs: "none", md: "block" },
        }}
      >
        <Feed
          setCommentData={setCommentData}
          setRefleshKeepPost={setRefleshKeepPost}
        />
      </Box>

      {/*Mobile*/}
      {!mobileNotiToggle && !mobileMenuToggle && (
        <Box
          maxWidth={1000}
          sx={{
            width: "100%",
            display: { xs: "block", sm: "block", md: "none" },
          }}
        >
          <Feed
            setCommentData={setCommentData}
            setRefleshKeepPost={setRefleshKeepPost}
          />
        </Box>
      )}
      {mobileNotiToggle && <NotificationMB />}
      {mobileMenuToggle && <MenuMB />}
      {mobileSearchToggle && <SearchMB />}
      <Modal
        open={mobileCommentToggle}
        onClose={() => dispatch(setCommentMobile(false))}
      >
        <CommentMB commentData={commentData} setCommentData={setCommentData} />
      </Modal>

      <Rightbar commentData={commentData} setCommentData={setCommentData} />
    </>
  );
};
