import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { PostStatus } from "./Feed/components/PostStatus";
import { PostCard } from "./Feed/components/PostCard";
import {
  handleGetFeed,
  handleGetFeedByKeyWord,
  handleGetFeedBySearch,
  handleGetFeedWithPostIdLogged,
  handleGetKeepPost,
  handleGetMyAnonymousPost,
  handleGetMyPost,
  handleGetMyReplyPost,
} from "../../services/feedServices";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNotificationData,
  AddUserData,
  UpdataCommentData,
} from "../../store/userSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PostRichTextModal } from "./Feed/components/PostRichText/PostRichTextModal";
import { AddPostId } from "../../store/selectSlice";
import { TabSelectCard } from "./Feed/components/TabSelectCard";

export const Feed = ({ setCommentData, setRefleshKeepPost }) => {
  const ModalRef = useRef(null);
  const [feedData, setFeedData] = useState([]);
  const [selectIndexComment, setSelectIndexComment] = useState(0);
  const [richTextModalToggle, setRichTextModalToggle] = useState(false);
  const [reflesh, setReflesh] = useState("");
  const updateComment = useSelector((state) => state.user.updateCommentData);
  const postArray = useSelector((state) => state.select.postArray);
  const searchKeyword = useSelector((state) => state.select.keyword);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentURL = location.pathname;
  const { id } = useParams();
  console.log(feedData);
  console.log(id);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fectFeedData = async (token) => {
      try {
        if (currentURL === "/feed") {
          if (!updateComment) {
            setCommentData([]);
          }
          const response = await handleGetFeed(token);
          localStorage.setItem("userId", response.data.session.userId);
          dispatch(AddUserData(response.data.session));
          dispatch(AddNotificationData(response.data.session.notification));
          setFeedData(response.data.response);
          if (!updateComment) {
            setCommentData(response.data.response[0].commentList);
            dispatch(AddPostId(response.data.response[0].postId));
          }
        } else if (currentURL === "/keeppost") {
          if (!updateComment) {
            setCommentData([]);
          }
          const response = await handleGetKeepPost(token);
          dispatch(AddUserData(response.data.session));
          dispatch(AddNotificationData(response.data.session.notification));
          if (response.data.response.length === 0) {
            navigate("/feed");
          } else {
            setFeedData(response.data.response);
            if (!updateComment) {
              setCommentData(response.data.response[0].commentList);
              dispatch(AddPostId(response.data.response[0].postId));
            }
          }
        } else if (currentURL === "/mypost") {
          if (!updateComment) {
            setCommentData([]);
          }
          const response = await handleGetMyPost(token);
          dispatch(AddUserData(response.data.session));
          dispatch(AddNotificationData(response.data.session.notification));
          setFeedData(response.data.response);
          if (!updateComment) {
            setCommentData(response.data.response[0].commentList);
            dispatch(AddPostId(response.data.response[0].postId));
          }
        } else if (currentURL === "/myanonymouspost") {
          if (!updateComment) {
            setCommentData([]);
          }
          const response = await handleGetMyAnonymousPost(token);
          dispatch(AddUserData(response.data.session));
          dispatch(AddNotificationData(response.data.session.notification));
          setFeedData(response.data.response);
          if (!updateComment) {
            setCommentData(response.data.response[0].commentList);
            dispatch(AddPostId(response.data.response[0].postId));
          }
        } else if (currentURL === "/myreplypost") {
          if (!updateComment) {
            setCommentData([]);
          }
          const response = await handleGetMyReplyPost(token);
          dispatch(AddUserData(response.data.session));
          dispatch(AddNotificationData(response.data.session.notification));
          setFeedData(response.data.response);
          if (!updateComment) {
            setCommentData(response.data.response[0].commentList);
            dispatch(AddPostId(response.data.response[0].postId));
          }
        } else if (id) {
          if (!updateComment) {
            setCommentData([]);
          }
          const response = await handleGetFeedWithPostIdLogged(token, id);
          dispatch(AddUserData(response.data.session));
          dispatch(AddNotificationData(response.data.session.notification));
          setFeedData(response.data.response);
          if (!updateComment) {
            setCommentData(response.data.response[0].commentList);
            dispatch(AddPostId(response.data.response[0].postId));
          }
        } else if (currentURL === "/search" && !searchKeyword) {
          if (!updateComment) {
            setCommentData([]);
          }
          const response = await handleGetFeedBySearch(token, postArray);
          dispatch(AddUserData(response.data.session));
          dispatch(AddNotificationData(response.data.session.notification));
          setFeedData(response.data.response);
          if (!updateComment) {
            setCommentData(response.data.response[0].commentList);
            dispatch(AddPostId(response.data.response[0].postId));
          }
        } else if (currentURL === "/search" && searchKeyword) {
          if (!updateComment) {
            setCommentData([]);
          }
          const response = await handleGetFeedByKeyWord(token, searchKeyword);
          dispatch(AddUserData(response.data.session));
          dispatch(AddNotificationData(response.data.session.notification));
          setFeedData(response.data.response);
          if (!updateComment) {
            setCommentData(response.data.response[0].commentList);
            dispatch(AddPostId(response.data.response[0].postId));
          }
        }
      } catch (error) {
        console.log("เกิดข้อผิดพลาด :", error.error);
        if (error.error === "Token not found") {
          localStorage.removeItem("token");
          navigate("/");
        }
      }
    };

    fectFeedData(token);
  }, [
    setCommentData,
    dispatch,
    navigate,
    reflesh,
    updateComment,
    postArray,
    searchKeyword,
  ]);

  return (
    <Box
      flex={3}
      maxWidth={1000}
      sx={{
        ".css-rjb2l0-MuiStack-root > :not(style) ~ :not(style)": {
          marginLeft: 0,
        },
      }}
    >
      {(currentURL === "/mypost" && <TabSelectCard />) ||
        (currentURL === "/myanonymouspost" && <TabSelectCard />) ||
        (currentURL === "/myreplypost" && <TabSelectCard />)}

      {currentURL === "/feed" && (
        <PostStatus
          ModalRef={ModalRef}
          setRichTextModalToggle={setRichTextModalToggle}
        />
      )}

      <Box
        sx={{
          mt: 1,
          maxWidth: 1000,
          height:
            currentURL === "/mypost" ||
            currentURL === "/myanonymouspost" ||
            currentURL === "/myreplypost"
              ? 770
              : currentURL === "/search" || currentURL === "/keeppost"
              ? 820
              : 750,
          overflow: "auto",
          overflowX: "hidden",
        }}
      >
        {feedData &&
          feedData?.map((item, index) => (
            <PostCard
              key={index}
              index={index}
              data={item}
              setCommentData={setCommentData}
              selectIndexComment={selectIndexComment}
              setSelectIndexComment={setSelectIndexComment}
              reflesh={reflesh}
              setReflesh={setReflesh}
            />
          ))}

        {feedData.length === 0 && (
          <Typography align="center">ไม่พบข้อมูล</Typography>
        )}
      </Box>
      <Modal
        open={richTextModalToggle}
        onClose={() => setRichTextModalToggle(false)}
      >
        <PostRichTextModal
          ModalRef={ModalRef}
          onClose={() => setRichTextModalToggle(false)}
          setReflesh={setReflesh}
        />
      </Modal>
    </Box>
  );
};
