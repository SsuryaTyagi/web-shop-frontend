import axios from "axios";
import { BASE_URL } from "../../../data/Api";

export const fetchMenu = async (category) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/menu?category=${category}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
export const fetchMenuItem = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/categories`);
    return res.data;    
  } catch (error) {
    console.error("Menu fetch error:", error);
    return [];
  }
};

export const fetchPopular = async (popular) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/menu?popular=${popular}`);
    return res.data;
  } catch (error) {
    console.error("Best fetch error:", error);
    return [];
  }
};