import axios from "axios";
import { BASE_URL } from "../Components/data/Api";

export const createOrder = async (amount) => {
  const res = await axios.post(
    `${BASE_URL + "/api/payment/create-order"}`,
    { amount },
    { withCredentials: true }
  );

  return res.data
};


