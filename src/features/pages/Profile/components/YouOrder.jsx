import React, { useContext } from "react";
import { MyContext } from "../../../data/Context";

export default function Order() {
  const { order } = useContext(MyContext);

  if (!order || order.length === 0) {
    return (
      <div className="text-center py-[3rem]">
        <p className="text-gray-500 text-[1rem]">You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-[1.3rem] font-semibold mb-[1.2rem]">My Orders</h3>

      <div className="space-y-[1rem]">
        {order.map((ord) => (
          <div
            key={ord._id}
            className="border rounded-lg p-[1rem] shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-[0.5rem]">
              <span className="font-semibold text-gray-700">
                Order #{ord._id?.slice(-6)}
              </span>
              <span
                className={`text-[0.85rem] px-[0.7rem] py-[0.2rem] rounded-full font-medium
                  ${
                    ord.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : ord.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
              >
                {ord.status || "processing"}
              </span>
            </div>

            <div className="text-[0.9rem] text-gray-600 space-y-[0.2rem]">
              <p>Total: ₹{ord.total || ord.amount || 0}</p>
              <p>
                Date:{" "}
                {ord.createdAt
                  ? new Date(ord.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            {ord.items && (
              <div className="mt-[0.7rem] border-t pt-[0.7rem] space-y-[0.3rem]">
                {ord.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-[0.85rem] text-gray-500"
                  >
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