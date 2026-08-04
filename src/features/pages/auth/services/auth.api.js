import { BASE_URL } from "../../../Api";
import axios from "axios";

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

export const register = async (userData) => {
  const res = await api.post("/register", userData);
  return res.data;
};

export const login = async (userData) => {
  const res = await api.post("/login", userData);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/get-Me");
  return res.data;
};
export const googleLogin = (mode) => {
  const url = `https://web-shop-api.vercel.app/auth/google?mode=${mode}`;
  window.location.href = url;
};

export const logout = async () => {
    localStorage.removeItem("token");
    const res = await api.post("/logout");
    return res.data;

};
