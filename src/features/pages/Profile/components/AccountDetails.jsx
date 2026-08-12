import React from "react";

export default function AccountDetails({ user }) {
  return (
    <>
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
        Account Details
      </h3>

      <div className="space-y-3 text-sm sm:text-base">
        <Detail label="Name" value={user?.name} />
        <Detail label="Email" value={user?.email} />
        <Detail label="Mobile" value={user?.number} />
        <Detail label="User ID" value={user?._id} />
      </div>
    </>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
      <span className="font-semibold text-gray-500 shrink-0">{label}</span>
      <span className="break-all text-right text-slate-800">{value || "N/A"}</span>
    </div>
  );
}