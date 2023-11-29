import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_IS_PROD === "true"
    ? process.env.REACT_APP_BACKEND_URL_PROD
    : process.env.REACT_APP_BACKEND_URL;

export const handleGetFeed = () => {
  return axios.get(`${BACKEND_URL}/auth/getFeed`);
};

export const handleGetFeaturedPost = () => {
  return axios.get(`${BACKEND_URL}/socialApi/getFeaturedPost`);
};

export const handleGetFeedWithPostId = (postId) => {
  return axios.get(`${BACKEND_URL}/auth/getFeed?postId=${postId}`);
};

export const handleGetSearchList = (token) => {
  return axios.get(`${BACKEND_URL}/api/social/getSearchList`, {
    headers: {
      "x-access-token": token,
    },
  });
};

export const handleGetNotification = (token) => {
  return axios.get(`${BACKEND_URL}/api/social/getNotification`, {
    headers: {
      "x-access-token": token,
    },
  });
};
