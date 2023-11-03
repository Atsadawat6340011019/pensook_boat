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

export const handleCreatePost = async (token, AllContent) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/social/createPost`,
      {
        isAnonymous: AllContent.isAnonymous,
        label: AllContent.label,
        content: AllContent.content,
      },
      {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
