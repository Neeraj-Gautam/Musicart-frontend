import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const allProducts = async ({}) => {
  try {
    const reqUrl = `${backendUrl}/product/allProducts`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
