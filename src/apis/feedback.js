import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const addFeedback = async (feedbackType, feedbackMessage) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const reqUrl = `${backendUrl}/feedback/`;
    const reqPayload = { feedbackType, feedbackMessage };
    const response = await axios.post(reqUrl, reqPayload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};