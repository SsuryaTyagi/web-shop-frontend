import React from "react";



export default function AccountDetails({ user }) {
  return (
    <>
      <h3 className="text-[1.3rem] font-semibold mb-[1.2rem]">
        Account Details
      </h3>

      <div className="space-y-[0.8rem] text-[0.95rem]">
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
    <div className="flex justify-between border-b pb-[0.3rem]">
      <span className="font-semibold text-gray-600">{label}:</span>
      <span className="break-all">{value || "N/A"}</span>
    </div>
  );
}
