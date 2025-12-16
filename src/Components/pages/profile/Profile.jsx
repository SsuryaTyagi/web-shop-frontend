import React, { useContext, useState } from "react";
import { MyContext } from "../../data/Context";
import Sidebar from "./Side";
import AccountDetails from "./AccountDetails";
import YouOrder from "./Order";
import Terms from "./Terms";

export default function Profile() {
  const { user } = useContext(MyContext);

  // 🔥 default = account
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="bg-gray-100 flex justify-center py-24 px-[3vw]">
      <div className="w-full max-w-[60rem] bg-white rounded-[1.5rem] shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-black to-gray-800 text-white p-[2rem] flex items-center gap-[1.5rem]">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name || "User"}&background=0D8ABC&color=fff&size=128`}
            className="w-[5.5rem] h-[5.5rem] rounded-full border-[3px] border-white"
          />
          <div>
            <h2 className="text-[1.5rem] font-semibold">{user?.name}</h2>
            <p className="text-[0.9rem] opacity-80">{user?.email}</p>
          </div>
        </div>

        {/* BODY */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="md:col-span-2 p-[2rem]">
            {activeTab === "account" && <AccountDetails user={user} />}
            {activeTab === "orders" && <YouOrder/>}
            {activeTab === "terms" && <Terms />}
          </div>
        </div>
      </div>
    </div>
  );
}
