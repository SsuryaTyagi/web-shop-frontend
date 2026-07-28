import axios from "axios";
import { BASE_URL } from "../Api";


export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${BASE_URL}/profile`, {
      withCredentials: true, 
      headers: token
        ? { Authorization: `Bearer ${token}` } 
        : {},
    });
    console.log("✅ Profile data:", res.data);

    return res.data.user || res.data;
  } catch (error) {
    return null; 
  }
};
