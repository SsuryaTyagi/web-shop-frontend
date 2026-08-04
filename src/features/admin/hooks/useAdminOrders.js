// src/features/admin/hooks/useAdminOrders.js
import { useSelector, useDispatch } from "react-redux";
import {
  setOrderStatusFilter,
  setOrderDateRangeFilter,
  setOrderSearchQuery,
  updateOrderStatusThunk,
} from "../admin.Slice";

export function useAdminOrders() {
  const dispatch = useDispatch();
  const { orders, filters, loading } = useSelector((state) => state.admin);

  const statusFilter = filters.orderStatus;
  const dateRangeFilter = filters.orderDateRange;
  const searchQuery = filters.orderSearchQuery;

  // Filter orders based on status, search, and date range
  const filteredOrders = orders.filter((order) => {
    // Status Filter
    if (statusFilter !== "All" && order.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }

    // Search Query (customer name, order ID, phone)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const matchName = order.customerName.toLowerCase().includes(query);
      const matchId = order.id.toLowerCase().includes(query);
      const matchPhone = order.customerPhone.toLowerCase().includes(query);
      if (!matchName && !matchId && !matchPhone) return false;
    }

    return true;
  });

  const updateStatus = (orderId, newStatus) => {
    dispatch(updateOrderStatusThunk({ orderId, newStatus }));
  };

  const setStatusFilter = (status) => {
    dispatch(setOrderStatusFilter(status));
  };

  const setDateFilter = (range) => {
    dispatch(setOrderDateRangeFilter(range));
  };

  const setSearch = (query) => {
    dispatch(setOrderSearchQuery(query));
  };

  return {
    orders: filteredOrders,
    rawOrders: orders,
    statusFilter,
    dateRangeFilter,
    searchQuery,
    loading,
    updateStatus,
    setStatusFilter,
    setDateFilter,
    setSearch,
  };
}
