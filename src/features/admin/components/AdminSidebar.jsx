// src/features/admin/components/AdminSidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Pizza,
  X,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { adminLogout, setSidebarCollapsed, resetDemoDataThunk } from "../admin.Slice";

export default function AdminSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sidebarCollapsed, orders, messages } = useSelector((state) => state.admin);

  const pendingOrdersCount = orders.filter((o) => o.status === "Pending").length;
  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : null,
      badgeColor: "bg-[#E33B32]",
    },
    {
      name: "Menu Management",
      path: "/admin/menu",
      icon: UtensilsCrossed,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Contact Messages",
      path: "/admin/messages",
      icon: MessageSquare,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : null,
      badgeColor: "bg-amber-500",
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/login");
  };

  const handleResetData = () => {
    if (window.confirm("Reset all operational demo data to initial defaults?")) {
      dispatch(resetDemoDataThunk());
    }
  };

  return (
    <>
      {/* Backdrop overlay for mobile */}
      {!sidebarCollapsed && (
        <div
          onClick={() => dispatch(setSidebarCollapsed(true))}
          className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-slate-800 ${
          sidebarCollapsed ? "-translate-x-full lg:translate-x-0" : "translate-x-0"
        }`}
      >
        {/* Top Brand Logo Header */}
        <div>
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800/80">
            <NavLink to="/admin/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#E33B32] text-white flex items-center justify-center shadow-md shadow-[#E33B32]/30 group-hover:scale-105 transition-transform">
                <Pizza className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-white text-lg tracking-tight block leading-tight">
                  The Pizza Hub
                </span>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
                  Operations Admin
                </span>
              </div>
            </NavLink>

            <button
              onClick={() => dispatch(setSidebarCollapsed(true))}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 mt-2">
            <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Main Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.exact}
                  onClick={() => dispatch(setSidebarCollapsed(true))}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group ${
                      isActive
                        ? "bg-[#E33B32] text-white shadow-md shadow-[#E33B32]/25 font-semibold"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/70"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-5 h-5 transition-colors ${
                            isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>

                      {item.badge ? (
                        <span
                          className={`px-2 py-0.5 text-xs font-bold text-white rounded-full ${item.badgeColor}`}
                        >
                          {item.badge}
                        </span>
                      ) : (
                        <ChevronRight
                          className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                            isActive ? "opacity-100 text-white" : "text-slate-500"
                          }`}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions Footer */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <button
            onClick={handleResetData}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-amber-400 hover:bg-slate-800/50 transition-colors"
            title="Reset operational demo data"
          >
            <RotateCcw className="w-4 h-4 text-amber-500" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors group"
          >
            <LogOut className="w-5 h-5 text-slate-400 group-hover:text-rose-400" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
