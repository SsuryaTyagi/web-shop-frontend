// src/features/admin/services/apiClient.js
import { BASE_URL } from "../Api"; // adjust relative path to match your project structure
import axios from "axios";

export const api = axios.create({
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