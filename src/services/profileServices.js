import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_IS_PROD === "true"
    ? process.env.REACT_APP_BACKEND_URL_PROD
    : process.env.REACT_APP_BACKEND_URL;

export const handleUpdateProfile = async (token, dataUpdate) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/social/updateMyProfile`,
      {
        firstName: dataUpdate.firstName,
        lastName: dataUpdate.lastName,
        profileImage: dataUpdate.profileImage,
        profileCover: dataUpdate.profileCover,
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

export const handleGetMyProfile = (token) => {
  return axios.get(`${BACKEND_URL}/api/social/getMyProfile`, {
    headers: {
      "x-access-token": token,
    },
  });
};

export const handleDeleteProfile = async (token) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/social/deleteMyProfile`,
      {},
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
