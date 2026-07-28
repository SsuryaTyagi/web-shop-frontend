import axios from "axios";
import { BASE_URL } from "../Api";

export const Contact = async (userInfo) => {
  try {
    await axios.post(`${BASE_URL}/contact`, userInfo, {
      withCredentials: true,
    });
  } catch (error) {
    const msg = error.response?.data?.message || "Something went wrong!";
    console.error(msg);
  }
};