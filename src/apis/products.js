import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getProduct = async (productId) => {
  try {
    const reqUrl = `${backendUrl}/products/${productId}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async (params) => {
  try {
    const reqUrl = `${backendUrl}/products/all?${params}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
