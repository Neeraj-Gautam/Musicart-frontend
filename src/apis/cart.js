import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const addProductIncart = async (productId, quantity) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const reqUrl = `${backendUrl}/cart/add-product/${productId}`;
    const reqPayload = { quantity };
    const response = await axios.post(reqUrl, reqPayload);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async () => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const reqUrl = `${backendUrl}/cart/details`;
    const response = await axios.get(reqUrl);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
