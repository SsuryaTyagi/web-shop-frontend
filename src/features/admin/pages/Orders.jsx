// src/features/admin/pages/Orders.jsx
import React from "react";
import { useAdminOrders } from "../hooks/useAdminOrders";
import OrdersTable from "../components/OrdersTable";
import {
  Search,
  Filter,
  Calendar,
  ShoppingBag,
  Clock,
  ChefHat,
  Bike,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from "lucide-react";

export default function Orders() {
  const {
    orders,
    rawOrders,
    statusFilter,
    dateRangeFilter,
    searchQuery,
    updateStatus,
    setStatusFilter,
    setDateFilter,
    setSearch,
  } = useAdminOrders();

  const statusCategories = [
    { name: "All", icon: ShoppingBag, color: "text-slate-600", count: rawOrders.length },
    {
      name: "Pending",
      icon: Clock,
      color: "text-amber-600",
      count: rawOrders.filter((o) => o.status === "Pending").length,
    },
    {
      name: "Preparing",
      icon: ChefHat,
      color: "text-sky-600",
      count: rawOrders.filter((o) => o.status === "Preparing").length,
    },
    {
      name: "Out for Delivery",
      icon: Bike,
      color: "text-purple-600",
      count: rawOrders.filter((o) => o.status === "Out for Delivery").length,
    },
    {
      name: "Delivered",
      icon: CheckCircle2,
      color: "text-emerald-600",
      count: rawOrders.filter((o) => o.status === "Delivered").length,
    },
    {
      name: "Cancelled",
      icon: XCircle,
      color: "text-rose-600",
      count: rawOrders.filter((o) => o.status === "Cancelled").length,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Orders Management
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Track customer orders, update kitchen status, and review delivery addresses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl">
            Showing {orders.length} of {rawOrders.length} Orders
          </span>
        </div>
      </div>

      {/* Filter Tabs Bar (All / Pending / Preparing / Out for Delivery / Delivered / Cancelled) */}
      <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-xs overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {statusCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = statusFilter.toLowerCase() === cat.name.toLowerCase();

            return (
              <button
                key={cat.name}
                onClick={() => setStatusFilter(cat.name)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#E33B32] text-white shadow-md shadow-[#E33B32]/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : cat.color}`} />
                <span>{cat.name}</span>
                <span
                  className={`ml-1 px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Date Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, phone, or Order ID..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E33B32]/20 focus:border-[#E33B32]"
          />
        </div>

        {/* Date Filter Dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-500 uppercase">Date:</span>
            <select
              value={dateRangeFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E33B32]/20 cursor-pointer"
            >
              <option value="All">All Dates</option>
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
              <option value="Last 7 Days">Last 7 Days</option>
            </select>
          </div>

          {(statusFilter !== "All" || searchQuery !== "" || dateRangeFilter !== "All") && (
            <button
              onClick={() => {
                setStatusFilter("All");
                setSearch("");
                setDateFilter("All");
              }}
              className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#E33B32] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Orders Data Table */}
      <OrdersTable orders={orders} onUpdateStatus={updateStatus} isCompact={false} />
    </div>
  );
}
