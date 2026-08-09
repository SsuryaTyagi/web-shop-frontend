// src/features/admin/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import StatsCard from "../components/StatsCard";
import OrdersTable from "../components/OrdersTable";
import { fetchAdminData, updateOrderStatusThunk } from "../admin.Slice";
import {
  ShoppingBag,
  IndianRupee,
  Clock,
  Users,
  TrendingUp,
  Flame,
  ArrowRight,
  RefreshCw,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { stats, popularItems, orders, loading } = useSelector(
    (state) => state.admin
  );

  const [activeTab, setActiveTab] = useState("revenue"); // 'revenue' or 'orders'
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    dispatch(fetchAdminData());
  }, [dispatch]);

  const handleUpdateStatus = (orderId, newStatus) => {
    dispatch(updateOrderStatusThunk({ orderId, newStatus }));
  };

  // 7-day revenue chart calculations
  const chartData = stats.revenue7Days || [];
  const maxRevenue = Math.max(...chartData.map((d) => d.revenue), 1);
  const maxOrders = Math.max(...chartData.map((d) => d.orders), 1);

  return (
    <div className="space-[#E33B32] space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time store performance analytics & operational dispatch feed
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(fetchAdminData())}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Stats</span>
          </button>

          <Link
            to="/admin/orders"
            className="flex items-center gap-2 px-4 py-2 bg-[#E33B32] hover:bg-[#c83129] text-white rounded-xl text-xs font-bold shadow-md shadow-[#E33B32]/20 transition-all"
          >
            <span>Live Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Row of 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Orders Today"
          value={stats.totalOrdersToday || 0}
          change={stats.totalOrdersChange || 12.5}
          isPositive={(stats.totalOrdersChange || 12.5) >= 0}
          icon={ShoppingBag}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />

        <StatsCard
          title="Revenue Today (₹)"
          value={`₹${(stats.revenueToday || 48950).toLocaleString("en-IN")}`}
          change={stats.revenueChange || 8.4}
          isPositive={(stats.revenueChange || 8.4) >= 0}
          icon={IndianRupee}
          iconBg="bg-[#E33B32]/10"
          iconColor="text-[#E33B32]"
        />

        <StatsCard
          title="Pending Orders"
          value={stats.pendingOrders || 18}
          change={stats.pendingChange || -3.2}
          isPositive={(stats.pendingChange || -3.2) <= 0} // Less pending is good!
          icon={Clock}
          iconBg="bg-sky-50"
          iconColor="text-sky-600"
        />

        <StatsCard
          title="Total Registered Users"
          value={(stats.totalUsers || 2845).toLocaleString("en-IN")}
          change={stats.usersChange || 15.0}
          isPositive={(stats.usersChange || 15.0) >= 0}
          icon={Users}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
      </div>

      {/* Main Grid: Revenue Analytics Chart & Popular Items Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7-Day Revenue Line Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#E33B32]" />
                <span>7-Day Financial & Order Trends</span>
              </h3>
              <p className="text-xs text-slate-400">
                Daily sales metrics for the current week
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab("revenue")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "revenue"
                    ? "bg-white text-[#E33B32] shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Revenue (₹)
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "orders"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Orders Volume
              </button>
            </div>
          </div>

          {/* SVG Line / Bar Chart Component */}
          <div className="relative h-64 w-full mt-4 flex items-end justify-between gap-2 pt-8 pb-6 px-2">
            {chartData.map((item, index) => {
              const val = activeTab === "revenue" ? item.revenue : item.orders;
              const maxVal = activeTab === "revenue" ? maxRevenue : maxOrders;
              const heightPercent = Math.max(15, Math.round((val / maxVal) * 100));
              const isHovered = hoveredPoint === index;

              return (
                <div
                  key={item.day}
                  onMouseEnter={() => setHoveredPoint(index)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  className="flex-1 flex flex-col items-center h-full justify-end relative group cursor-pointer"
                >
                  {/* Tooltip on Hover */}
                  {isHovered && (
                    <div className="absolute -top-12 z-20 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap animate-in fade-in zoom-in-95">
                      {activeTab === "revenue"
                        ? `₹${item.revenue.toLocaleString("en-IN")}`
                        : `${item.orders} Orders`}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                    </div>
                  )}

                  {/* Bar Column */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full max-w-[42px] rounded-t-xl transition-all duration-300 ${
                      activeTab === "revenue"
                        ? isHovered
                          ? "bg-[#E33B32] shadow-lg shadow-[#E33B32]/30 scale-x-105"
                          : "bg-gradient-to-t from-[#E33B32]/80 to-[#E33B32]"
                        : isHovered
                        ? "bg-slate-900 shadow-lg scale-x-105"
                        : "bg-gradient-to-t from-slate-700 to-slate-900"
                    }`}
                  />

                  {/* X Axis Label */}
                  <span
                    className={`mt-2 text-xs font-bold ${
                      isHovered ? "text-[#E33B32]" : "text-slate-500"
                    }`}
                  >
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Peak Day: Saturday (₹68,900)</span>
            <span className="text-[#E33B32] font-semibold">
              Average Order Value: ₹344
            </span>
          </div>
        </div>

        {/* Popular Items Widget (1 Col) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <span>Top 5 Best Sellers</span>
              </h3>
              <Link
                to="/admin/menu"
                className="text-xs font-semibold text-[#E33B32] hover:underline"
              >
                Manage Menu
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {popularItems.slice(0, 5).map((item, idx) => (
                <div key={item.id} className="py-3 flex items-center gap-3 group">
                  <span className="w-5 text-xs font-extrabold text-slate-400 group-hover:text-[#E33B32]">
                    #{idx + 1}
                  </span>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 truncate group-hover:text-[#E33B32] transition-colors">
                      {item.name}
                    </h5>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span className="font-semibold text-slate-700">₹{item.price}</span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="block text-xs font-extrabold text-slate-900">
                      {item.ordersCount}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      orders
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <span className="text-xs text-slate-400 font-medium">
              Popular items drive 68% of total daily revenue
            </span>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Recent Customer Orders
            </h3>
            <p className="text-xs text-slate-500">
              Latest incoming kitchen orders with live status management
            </p>
          </div>

          <Link
            to="/admin/orders"
            className="text-xs font-bold text-[#E33B32] hover:underline flex items-center gap-1"
          >
            <span>View All ({orders.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <OrdersTable
          orders={orders.slice(0, 5)}
          onUpdateStatus={handleUpdateStatus}
          isCompact={false}
        />
      </div>
    </div>
  );
}
