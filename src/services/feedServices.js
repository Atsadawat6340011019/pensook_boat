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

export const handleGetFeedBySearch = (token, postArray) => {
  const postArrayJson = JSON.stringify(postArray);

  return axios.get(
    `${BACKEND_URL}/api/social/getFeed?postArray=${postArrayJson}`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
};

export const handleGetFeedByKeyWord = (token, keyword) => {
  return axios.get(
    `${BACKEND_URL}/api/social/getFeedByKeyword?keyword=${keyword}`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
};

export const handleGetFeedWithPostIdLogged = (token, postId) => {
  return axios.get(`${BACKEND_URL}/api/social/getFeed?postId=${postId}`, {
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

export const handleGetMyAnonymousPost = (token) => {
  return axios.get(`${BACKEND_URL}/api/social/getMyAnonymousPost`, {
    headers: {
      "x-access-token": token,
    },
  });
};

export const handleGetMyReplyPost = (token) => {
  return axios.get(`${BACKEND_URL}/api/social/getReplyPost`, {
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
        //attachImageArr: AllContent.attachImageArr,
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

export const handleUpdatePost = async (token, AllContent) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/social/updatePost`,
      {
        postId: AllContent.postId,
        label: AllContent.label,
        content: AllContent.content,
        //attachImageArr: AllContent.attachImageArr,
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const handleDeletePost = async (token, postId) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/social/deletePost`,
      {
        postId: postId,
      },
      {
        headers: {
          "x-access-token": token,
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

export const handleGetComment = (token, postId) => {
  return axios.get(`${BACKEND_URL}/api/social/getComment`, {
    params: {
      postId: postId,
    },
    headers: {
      "x-access-token": token,
    },
  });
};

export const handleCreateComment = async (token, AllContent) => {
  try {
    const requestBody = {
      isAnonymous: AllContent.isAnonymous,
      postId: AllContent.postId,
      content: AllContent.content,
      //attachImageArr: AllContent.attachImageArr,
    };

    if (AllContent.commentId) {
      requestBody.commentId = AllContent.commentId;
    }

    const response = await axios.post(
      `${BACKEND_URL}/api/social/comment`,
      requestBody,
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

export const handleUpdateComment = async (token, AllContent) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/social/updateComment`,
      {
        commentId: AllContent.commentId,
        content: AllContent.content,
        //attachImageArr: AllContent.attachImageArr,
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const handleDeleteComment = async (token, commentId) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/social/deleteComment`,
      {
        commentId: commentId,
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const handleUpVoteComment = async (token, commentId) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/social/upVote`,
      {
        commentId: commentId,
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

export const handleDownVoteComment = async (token, commentId) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/social/downVote`,
      {
        commentId: commentId,
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

export const handleUnVoteComment = async (token, commentId) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/social/unVote`,
      {
        commentId: commentId,
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

export const handleSendReport = async (token, AllContent) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/social/sendReport`,
      {
        postId: AllContent.postId,
        reportType: AllContent.reportType,
        description: AllContent.description,
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

export const handleUpdateNotification = async (token, type) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/social/updateNotification`,
      {
        updateType: type,
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
