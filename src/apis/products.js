import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getProduct = async (uuid) => {
  try {
    const reqUrl = `${backendUrl}/products/${uuid}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async (params) => {
  try {
    console.log(params);
    const reqUrl = `${backendUrl}/products?${params}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
