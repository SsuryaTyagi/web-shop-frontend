import React, { useContext } from "react";
import { MyContext } from "../../data/Context";
import {
  FaUser,
  FaShoppingBag,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar({ activeTab, setActiveTab }) {
  const { logout } = useContext(MyContext);

  const itemStyle = (tab) =>
    `flex items-center gap-[0.7rem] p-[0.7rem] rounded-lg cursor-pointer
     ${activeTab === tab ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`;

  return (
    <div className="border-r p-[1.5rem] space-y-[0.6rem]">
      <div className={itemStyle("account")} onClick={() => setActiveTab("account")}>
        <FaUser /> Account Details
      </div>

      <div className={itemStyle("orders")} onClick={() => setActiveTab("orders")}>
        <FaShoppingBag /> My Orders
      </div>

      <div className={itemStyle("terms")} onClick={() => setActiveTab("terms")}>
        <FaFileAlt /> Terms & Conditions
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-[0.7rem] text-red-600 mt-[1.5rem]"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}
