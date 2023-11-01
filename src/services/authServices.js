import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_IS_PROD === "true"
    ? process.env.REACT_APP_BACKEND_URL_PROD
    : process.env.REACT_APP_BACKEND_URL;

export const handleLogin = async (email, token) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/loginSocial`, {
      email: email,
      token: token,
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const handleCreateUser = async (
  email,
  firstName,
  lastName,
  profileImage
) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/users/createUserSocial`, {
      email: email,
      firstName: firstName,
      lastName: lastName,
      profileImage: profileImage,
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
