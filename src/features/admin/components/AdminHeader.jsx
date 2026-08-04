// src/features/admin/components/AdminHeader.jsx
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu as MenuIcon,
  Search,
  Bell,
  User,
  LogOut,
  Shield,
  Clock,
  ChevronDown,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import {
  setSidebarCollapsed,
  setOrderSearchQuery,
  setMenuSearchQuery,
  setUserSearchQuery,
  adminLogout,
} from "../admin.Slice";

export default function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { orders, adminProfile } = useSelector((state) => state.admin);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const pendingOrders = orders.filter((o) => o.status === "Pending");

  // Determine page search target based on current pathname
  const getSearchPlaceholder = () => {
    if (location.pathname.includes("/admin/orders")) return "Search orders by ID, name, or phone...";
    if (location.pathname.includes("/admin/menu")) return "Search menu items or categories...";
    if (location.pathname.includes("/admin/users")) return "Search users by name, email...";
    if (location.pathname.includes("/admin/messages")) return "Search customer messages...";
    return "Quick search across dashboard...";
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    if (location.pathname.includes("/admin/orders")) {
      dispatch(setOrderSearchQuery(val));
    } else if (location.pathname.includes("/admin/menu")) {
      dispatch(setMenuSearchQuery(val));
    } else if (location.pathname.includes("/admin/users")) {
      dispatch(setUserSearchQuery(val));
    } else {
      dispatch(setOrderSearchQuery(val));
    }
  };

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 h-16 flex items-center justify-between shadow-xs">
      {/* Left: Mobile Toggle & Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={() => dispatch(setSidebarCollapsed(false))}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          title="Open menu"
        >
          <MenuIcon className="w-5 h-5" />
        </button>

        {/* Global Search Input */}
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            onChange={handleSearchChange}
            placeholder={getSearchPlaceholder()}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/90 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E33B32]/20 focus:border-[#E33B32] transition-all"
          />
        </div>
      </div>

      {/* Right: Store Status, Notifications & Profile Dropdown */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Customer Storefront Link */}
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
        >
          <span>Storefront</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {pendingOrders.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#E33B32] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {pendingOrders.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">New Order Alerts</h4>
                  <span className="px-2 py-0.5 text-xs font-bold text-white bg-[#E33B32] rounded-full">
                    {pendingOrders.length} New
                  </span>
                </div>
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate("/admin/orders");
                  }}
                  className="text-xs font-semibold text-[#E33B32] hover:underline"
                >
                  View All Orders
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {pendingOrders.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-sm">
                    <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    No pending orders at the moment.
                  </div>
                ) : (
                  pendingOrders.map((ord) => (
                    <div
                      key={ord.id}
                      onClick={() => {
                        setShowNotifications(false);
                        navigate("/admin/orders");
                      }}
                      className="p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-bold text-slate-900">{ord.id}</span>
                          <span className="text-slate-400">{ord.orderTime}</span>
                        </div>
                        <p className="text-xs font-medium text-slate-700 truncate">
                          {ord.customerName} • {ord.itemsCount} items (₹{ord.totalAmount})
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-slate-200" />

        {/* Admin Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 sm:p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <img
              src={adminProfile.avatar}
              alt={adminProfile.name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-[#E33B32]/20"
            />
            <div className="hidden sm:block text-left">
              <span className="block font-bold text-slate-800 text-xs leading-tight">
                {adminProfile.name}
              </span>
              <span className="block text-[10px] font-semibold text-slate-500">
                {adminProfile.role}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{adminProfile.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{adminProfile.email}</p>
                <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-slate-100 text-[#E33B32] text-[10px] font-bold rounded-md">
                  <Shield className="w-3 h-3" />
                  Super Admin
                </span>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate("/admin/settings");
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Profile & Settings</span>
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    dispatch(adminLogout());
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2.5"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
