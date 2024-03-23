import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const registerUser = async ({ name, mobile, email, password }) => {
  try {
    const reqUrl = `${backendUrl}/auth/register`;
    const reqPayload = { name, mobile, email, password };
    const response = await axios.post(reqUrl, reqPayload);
    return response.data;
  } catch (error) {
    console.log(error);
    //  toast with custom message for clients
  }
};

export const loginUser = async ({ userIdentifier, password }) => {
  try {
    const reqUrl = `${backendUrl}/auth/login`;
    const reqPayload = { userIdentifier, password };
    const response = await axios.post(reqUrl, reqPayload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
