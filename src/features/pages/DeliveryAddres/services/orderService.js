import axios from "axios";
import { BASE_URL } from "../../../Api";

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

const RECENT_ORDER_KEY = "last_placed_order";

export const storeRecentOrder = (order) => {
  try {
    if (order) {
      sessionStorage.setItem(RECENT_ORDER_KEY, JSON.stringify(order));
    }
  } catch (e) {
    console.error("Failed to store order in sessionStorage", e);
  }
};

export const getStoredRecentOrder = (orderId) => {
  try {
    const raw = sessionStorage.getItem(RECENT_ORDER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      !orderId ||
      parsed?._id === orderId ||
      parsed?.id === orderId ||
      parsed?.payment_id === orderId
    ) {
      return parsed;
    }
  } catch (e) {
    console.error("Failed to parse cached order", e);
  }
  return null;
};

/**
 * Fetch a single order by ID from backend
 */
export const fetchOrderById = async (orderId) => {
  if (!orderId) {
    throw new Error("Order ID is required");
  }

  // 1. Try dedicated single order endpoint if backend supports GET /orders/:id
  try {
    const res = await api.get(`/orders/${orderId}`);
    if (res.data?.order) return res.data.order;
    if (res.data && (res.data._id || res.data.id)) return res.data;
  } catch (err) {
    // Endpoints might differ, fallback to user order list
  }

  // 2. Try POST /orderDetails (user's past orders) and match ID
  try {
    const res = await api.post(`/orderDetails`);
    const ordersList = res.data?.order || res.data?.orders || (Array.isArray(res.data) ? res.data : []);
    
    if (Array.isArray(ordersList)) {
      const found = ordersList.find(
        (o) => o._id === orderId || o.id === orderId || o.payment_id === orderId
      );
      if (found) return found;
    }
  } catch (err) {
    console.warn("Failed to fetch order details from backend", err);
  }

  // 3. Check sessionStorage cache
  const cached = getStoredRecentOrder(orderId);
  if (cached) return cached;

  throw new Error("Order not found");
};
