import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    const reqUrl = `${backendUrl}/orders/all`;
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
