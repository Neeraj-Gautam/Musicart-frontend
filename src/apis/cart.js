import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const addProductIncart = async (productUuid) => {
  try {
    const token = localStorage.getItem("token");
    const reqUrl = `${backendUrl}/cart/add/product/${productUuid}`;
    const reqPayload = { token };
    const response = await axios.post(reqUrl, reqPayload);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async () => {
  try {
    const token = localStorage.getItem("token");
    const reqUrl = `${backendUrl}/cart/${token}`;
    const response = await axios.get(reqUrl);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};