import axios from "axios";
import { BASE_URL } from "../../../Api.js";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProfile = async () => {
  try {
    const res = await api.get("/profile");
    return res.data.user || res.data;
  } catch (error) {
    throw error.response?.data?.message || "Profile failed!";
  }
};

export const getOrder = async () => {
  try {
    const res = await api.post(`/orderDetails`);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Profile failed!";
  }
};
