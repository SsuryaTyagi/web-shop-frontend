import axios from "axios";
import { BASE_URL } from "../Api";

export const getorder = async (email) => {
  try {
    if (!email) return [];
    const res = await axios.post(
      `${BASE_URL}/orderDetails`,
      { email },
      { withCredentials: true }
    );
    return res.data.order;
  } catch (error) {
    console.error("Order Error:", error.response?.data || error);
    return [];
  }
};