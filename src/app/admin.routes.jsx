// src/app/admin.routes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminRoute from "../components/AdminRoute";
import AdminSidebar from "../features/admin/components/AdminSidebar";
import AdminHeader from "../features/admin/components/AdminHeader";
import Dashboard from "../features/admin/pages/Dashboard";
import Orders from "../features/admin/pages/Orders";
import MenuManager from "../features/admin/pages/MenuManager";
import UsersManagement from "../features/admin/pages/UsersManagement";
import ContactMessages from "../features/admin/pages/ContactMessages";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#f9fafb] text-slate-800 flex font-sans">
      {/* Fixed Left Sidebar */}
      <AdminSidebar />

      {/* Main Admin View Container */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-300">
        {/* Top Header Bar */}
        <AdminHeader />

        {/* Main Content Page Area with Generous Padding */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="menu" element={<MenuManager />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="messages" element={<ContactMessages />} />
            <Route path="settings" element={<Navigate to="dashboard" replace />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function AdminRoutes() {
  return (
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  );
}
