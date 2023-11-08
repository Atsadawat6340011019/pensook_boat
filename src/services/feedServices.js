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

export const handleGetKeepPost = (token) => {
  return axios.get(`${BACKEND_URL}/api/social/getKeepPost`, {
    headers: {
      "x-access-token": token,
    },
  });
};

export const handleGetMyPost = (token) => {
  return axios.get(`${BACKEND_URL}/api/social/getMyPost`, {
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
        attachImageArr: AllContent.attachImageArr,
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

export const handleUpVotePost = async (token, postId) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/social/upVote`,
      {
        postId: postId,
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

export const handleDownVotePost = async (token, postId) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/social/downVote`,
      {
        postId: postId,
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

export const handleUnVotePost = async (token, postId) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/social/unVote`,
      {
        postId: postId,
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

export const handleKeepPost = async (token, postId) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/social/keepPost`,
      {
        postId: postId,
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

export const handleUnKeepPost = async (token, postId) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/social/unKeepPost`,
      {
        postId: postId,
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
