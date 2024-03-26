import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getProductsFromCart = async () => {
  try {
    const token = localStorage.getItem("token");
    const reqUrl = `${backendUrl}/checkout/${token}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
