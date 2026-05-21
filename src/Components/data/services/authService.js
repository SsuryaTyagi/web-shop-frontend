import axios from "axios";
import { BASE_URL } from "../Api";

export const signup = async (userData, toast) => {
  try {
    await axios.post(`${BASE_URL}/register`, userData, {
      withCredentials: true,
    });
    toast.success("Signup successful!");
  } catch (error) {
    const msg = error.response?.data?.message || "Signup failed!";
    toast.error(msg);
  }
};

export const login = async (userData, toast) => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, userData, {
      withCredentials: true,
    });
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Something went wrong!";
    toast.error(msg);
    return null;
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem("token");
    await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error("Logout error:", error);
  }
};

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
