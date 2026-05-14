import axios from "axios";
import { BASE_URL } from "../Api";

export const fetchMenu = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/menu`);
    return res.data;
  } catch (error) {
    console.error("Menu fetch error:", error);
    return [];
  }
};

export const fetchBest = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/best`);
    return res.data;
  } catch (error) {
    console.error("Best fetch error:", error);
    return [];
  }
};