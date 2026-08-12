import React, { useContext } from "react";
import { MyContext } from "../../../data/Context";

export default function Order() {
  const { order } = useContext(MyContext);

  if (!order || order.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-5">My Orders</h3>

      <div className="space-y-4">
        {order.map((ord) => (
          <div
            key={ord._id}
            className="border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-slate-700">
                Order #{ord._id?.slice(-6)}
              </span>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize ${
                  ord.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : ord.status === "pending"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {ord.status || "processing"}
              </span>
            </div>

            <div className="text-sm text-gray-500 space-y-0.5">
              <p>Total: ₹{ord.total || ord.amount || 0}</p>
              <p>
                Date:{" "}
                {ord.createdAt
                  ? new Date(ord.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            {ord.items && (
              <div className="mt-3 border-t border-gray-100 pt-3 space-y-1">
                {ord.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm text-gray-500">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{item.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}