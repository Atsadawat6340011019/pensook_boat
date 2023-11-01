import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_IS_PROD === "true"
    ? process.env.REACT_APP_BACKEND_URL_PROD
    : process.env.REACT_APP_BACKEND_URL;

export const handleGetFeed = (token) => {
  return axios.get(`${BACKEND_URL}/api/social/getFeed`, {
    headers: {
      "x-access-token": token,
    },
  });
};
