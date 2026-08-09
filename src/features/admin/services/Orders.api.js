// src/features/admin/services/orders.api.js
import { api } from "../Apiclient";
import { getStoredData, saveStoredData } from "./admin.api";

function getRelativeTime(isoString) {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

function mapBackendOrder(o) {
  return {
    id: o._id,
    customerName: o.user?.name || "N/A",
    customerPhone: o.user?.number || "N/A",
    itemsCount: o.items.length,
    itemsList: o.items.map((i) => ({
      name: i.name,
      size: "-",
      qty: i.quantity,
      price: i.price,
    })),
    deliveryAddress: o.user?.address || "N/A",
    paymentId: o.payment_id,
    paymentMethod: "Razorpay",
    totalAmount: o.order_total,
    status: o.status,
    orderTime: getRelativeTime(o.createdAt),
    timestamp: o.createdAt,
  };
}

export async function fetchOrders() {
  const res = await api.get("/admin/orders", { params: { date: "all" } });
  return res.data.orders.map(mapBackendOrder);
}

export async function fetchPopularItems() {
  const res = await api.get("/admin/popular-items");
  return res.data.popularItems;
}

export async function updateOrderStatus(orderId, newStatus) {
  const res = await api.patch(`/admin/orders/${orderId}/status`, {
    status: newStatus,
  });

  // keep localStorage's pendingOrders stat in sync since stats are still mocked
  const data = getStoredData();
  const updatedOrders = data.orders.map((o) =>
    o.id === orderId ? { ...o, status: newStatus } : o
  );
  const pendingCount = updatedOrders.filter((o) => o.status === "Pending").length;
  data.orders = updatedOrders;
  data.stats.pendingOrders = pendingCount;
  saveStoredData(data);

  return { orderId, newStatus: res.data.order.status, pendingCount };
}