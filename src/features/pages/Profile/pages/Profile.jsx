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
    <div className="min-h-screen bg-gray-100 flex justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6 sm:p-8 flex items-center gap-4 sm:gap-6">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name || "User"}&background=0D8ABC&color=fff&size=128`}
            alt={user?.name ? `${user.name}'s avatar` : "User avatar"}
            className="w-16 h-16 sm:w-22 sm:h-22 rounded-full border-2 border-white shrink-0"
          />
          <div className="min-w-0">
            <h2 className="text-lg sm:text-2xl font-semibold truncate">{user?.name}</h2>
            <p className="text-sm opacity-80 truncate">{user?.email}</p>
          </div>
        </div>

        {/* BODY */}
        <div className="grid grid-cols-1 md:grid-cols-3">
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