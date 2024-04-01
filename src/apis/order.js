import axios from "axios";
import { AUTHORIZATIONN, TOKEN } from "../utils/constants";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getOrder = async (orderId) => {
  try {
    const token = localStorage.getItem(TOKEN);
    axios.defaults.headers.common[AUTHORIZATIONN] = token;
    const reqUrl = `${backendUrl}/orders/order-details/${orderId}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const placeOrderForUser = async ({
  address,
  deliveryCharge,
  paymentMethod,
}) => {
  try {
    const token = localStorage.getItem(TOKEN);
    axios.defaults.headers.common[AUTHORIZATIONN] = token;
    const reqPayload = { address, deliveryCharge, paymentMethod };
    const reqUrl = `${backendUrl}/orders/placeOrder`;
    const response = await axios.post(reqUrl, reqPayload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
