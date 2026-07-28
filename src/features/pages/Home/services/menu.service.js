import axios from "axios";
import { BASE_URL } from "../../../data/Api";

export const Menu = async (category) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/menu?category=${category}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
