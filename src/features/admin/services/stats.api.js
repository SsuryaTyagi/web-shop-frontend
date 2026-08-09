// src/features/admin/services/stats.api.js
import { api } from "./apiClient";
export async function fetchDashboardStats() {
  const res = await api.get("/admin/dashboard-stats");
  return res.data;
} 