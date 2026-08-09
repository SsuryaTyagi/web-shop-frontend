// src/features/admin/services/admin.api.js
import {
  fetchOrders,
  popularItems,
  updateOrderStatus as updateOrderStatusApi,
} from "./orders.api";
import {
  saveMenuItem,
  deleteMenuItem,
  toggleItemAvailability,
} from "./menu.api";
import { toggleUserStatus } from "./users.api";
import { markMessageRead, deleteMessage } from "./messages.api";
import { getStoredData, initialData } from "./localStorageStore";
import { fetchDashboardStats } from "./stats.api";

export const adminApi = {
  getInitialData: async () => {
    const data = getStoredData();

    try {
      data.orders = await fetchOrders();
    } catch (err) {
      console.error("Falling back to mock orders:", err);
    }

    try {
      data.stats = await fetchDashboardStats();
    } catch (err) {
      console.error("Falling back to mock stats:", err);
    }

    try {
      data.popularItems = await fetchPopularItems();
    } catch (err) {
      console.error("Falling back to mock popularItems:", err);
    }

    return data;
  },

  updateOrderStatus: updateOrderStatusApi,
  saveMenuItem,
  deleteMenuItem,
  toggleItemAvailability,
  toggleUserStatus,
  markMessageRead,
  deleteMessage,

  resetDemoData: async () => {
    return new Promise((resolve) => {
      localStorage.setItem(
        "pizza_hub_admin_data_v1",
        JSON.stringify(initialData),
      );
      setTimeout(() => resolve(initialData), 100);
    });
  },
};
