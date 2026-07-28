import axios from "axios";
import { BASE_URL } from "../Api";

export const fetchMenu = async (category) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/categories`);
    return res.data;
    console.log(res.data);
    
  } catch (error) {
    console.error("Menu fetch error:", error);
    return [];
  }
};

export const fetchBest = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/menu?popular=true`);
    return res.data;
    console.log(res.data);
    
  } catch (error) {
    console.error("Best fetch error:", error);
    return [];
  }
};