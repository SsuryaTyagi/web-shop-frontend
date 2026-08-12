import React from "react";
import {
  FaUser,
  FaShoppingBag,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import useAuth from "../../auth/hooks/useAuth";

export default function Sidebar({ activeTab, setActiveTab }) {
  const { handleLogout } = useAuth();

  const Logout = async () => {
    await handleLogout();
  };

  const tabs = [
    { id: "account", label: "Account Details", icon: <FaUser /> },
    { id: "orders", label: "My Orders", icon: <FaShoppingBag /> },
    { id: "terms", label: "Terms & Conditions", icon: <FaFileAlt /> },
  ];

  const itemStyle = (tab) =>
    `w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 relative
     ${
       activeTab === tab
         ? "bg-gray-100 font-semibold text-slate-900"
         : "text-gray-600 hover:bg-gray-50"
     }`;

  return (
    <div className="border-r border-gray-100 p-4 sm:p-6 space-y-1.5">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActiveTab(tab.id)}
          className={itemStyle(tab.id)}
          aria-current={activeTab === tab.id ? "true" : undefined}
        >
          {activeTab === tab.id && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-[#E33B32] rounded-full" />
          )}
          {tab.icon} {tab.label}
        </button>
      ))}

      <button
        type="button"
        onClick={Logout}
        className="w-full flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 mt-4 transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}