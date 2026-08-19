import React, { useState } from "react";
import Sidebar from "../components/Side";
import AccountDetails from "../components/AccountDetails";
import YouOrder from "../components/Order";
import Terms from "../components/Terms";
import useAuth from "../../auth/hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xs border border-slate-200 overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 flex items-center gap-4 sm:gap-6">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user?.name || "User"
            )}&background=E33B32&color=fff&size=128`}
            alt={user?.name ? `${user.name}'s profile avatar` : "User avatar"}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/80 shrink-0 object-cover shadow-sm"
          />
          <div className="min-w-0">
            <span className="inline-block bg-white/10 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
              Member Profile
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold truncate text-white">
              {user?.name || "Valued Customer"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 truncate">
              {user?.email || "Signed in"}
            </p>
          </div>
        </div>

        {/* Profile Body Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="md:col-span-2 p-6 sm:p-8">
            {activeTab === "account" && <AccountDetails user={user} />}
            {activeTab === "orders" && <YouOrder />}
            {activeTab === "terms" && <Terms />}
          </div>
        </div>
      </div>
    </div>
  );
}