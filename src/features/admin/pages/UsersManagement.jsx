// src/features/admin/pages/UsersManagement.jsx
import React, { useState } from "react";
import { useAdminUsers } from "../hooks/useAdminUsers";
import {
  Search,
  Users,
  ShieldCheck,
  Phone,
  Mail,
  Calendar,
  ShoppingBag,
  IndianRupee,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function UsersManagement() {
  const { users, totalUsersCount, searchQuery, setSearch, toggleVerification } =
    useAdminUsers();

  const [selectedUser, setSelectedUser] = useState(null);

  // Helper to extract initials
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Users Management
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Registered customer accounts, contact details, account verification, and order history metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 bg-slate-100 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-2">
            <Users className="w-4 h-4 text-[#E33B32]" />
            <span>{totalUsersCount} Total Registered Users</span>
          </span>
        </div>
      </div>

      {/* Search Bar & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name, email, or phone..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E33B32]/20 focus:border-[#E33B32]"
          />
        </div>
      </div>

      {/* Users Data Table */}
      {users.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-100">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-8 h-8" />
          </div>
          <h4 className="text-base font-bold text-slate-800">No users found</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            No customer accounts match your search query. Try clearing search filters.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-3.5 px-4 sm:px-6">Customer</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Verification</th>
                  <th className="py-3.5 px-4">Joined Date</th>
                  <th className="py-3.5 px-4 text-center">Total Orders</th>
                  <th className="py-3.5 px-4">Total Spent (₹)</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Avatar Initials & Name */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl ${
                            user.avatarBg || "bg-red-500"
                          } text-white font-bold flex items-center justify-center text-sm shadow-xs flex-shrink-0`}
                        >
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <span className="block font-bold text-slate-900">
                            {user.name}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            {user.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Email & Phone */}
                    <td className="py-4 px-4 text-xs">
                      <div className="space-y-0.5">
                        <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          {user.email}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {user.phone}
                        </span>
                      </div>
                    </td>

                    {/* Verified Status Badge */}
                    <td className="py-4 px-4">
                      <button
                        onClick={() => toggleVerification(user.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border transition-colors ${
                          user.isVerified
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                        title="Click to toggle account verification status"
                      >
                        {user.isVerified ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Verified</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-amber-500" />
                            <span>Unverified</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Joined Date */}
                    <td className="py-4 px-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{user.joinedDate}</span>
                      </div>
                    </td>

                    {/* Total Orders */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-900 rounded-lg text-xs font-extrabold">
                        {user.totalOrders}
                      </span>
                    </td>

                    {/* Total Spent */}
                    <td className="py-4 px-4 font-extrabold text-slate-900">
                      ₹{user.totalSpent?.toLocaleString("en-IN")}
                    </td>

                    {/* View Details Action */}
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        title="View user details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl ${
                    selectedUser.avatarBg || "bg-red-500"
                  } text-white font-extrabold flex items-center justify-center text-lg shadow-md`}
                >
                  {getInitials(selectedUser.name)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{selectedUser.name}</h4>
                  <span className="text-xs text-slate-500 font-mono">{selectedUser.id}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Email Address:</span>
                  <span className="font-bold text-slate-900">{selectedUser.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Phone Number:</span>
                  <span className="font-bold text-slate-900">{selectedUser.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Member Since:</span>
                  <span className="font-bold text-slate-900">{selectedUser.joinedDate}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-center">
                  <span className="block text-[10px] font-bold text-amber-700 uppercase">
                    Total Orders
                  </span>
                  <span className="text-lg font-extrabold text-amber-900 mt-0.5 block">
                    {selectedUser.totalOrders}
                  </span>
                </div>
                <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-center">
                  <span className="block text-[10px] font-bold text-emerald-700 uppercase">
                    Lifetime Spend
                  </span>
                  <span className="text-lg font-extrabold text-emerald-900 mt-0.5 block">
                    ₹{selectedUser.totalSpent?.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="mt-5 w-full bg-slate-900 text-white font-semibold py-2.5 rounded-xl text-xs hover:bg-slate-800 transition-colors"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
