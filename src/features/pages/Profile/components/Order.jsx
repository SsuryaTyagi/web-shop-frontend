import React, { useEffect } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import useOrder from "../hooks/useOrder";

const statusStyles = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function YouOrder() {
  const { order, handleOrder } = useOrder();

  useEffect(() => {
    handleOrder();
  }, []);

  if (!order || order.length === 0) {
    return (
      <div className="flex flex-col items-center text-center py-12">
        <HiOutlineShoppingBag className="text-4xl text-gray-300 mb-3" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-gray-600">No Orders Found</h2>
        <p className="text-sm text-gray-400 mt-1">
          Your past orders will show up here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5">Your Orders</h2>

      <div className="space-y-4">
        {order.map((ord, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5"
          >
            {/* ORDER HEADER */}
            <div className="flex justify-between items-center flex-wrap gap-2 text-sm text-gray-500 mb-3 pb-3 border-b border-gray-100">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                  statusStyles[ord.status?.toLowerCase()] || "bg-gray-100 text-gray-600"
                }`}
              >
                {ord.status}
              </span>
              <span className="text-xs sm:text-sm">
                Payment ID: <span className="font-medium text-gray-700">{ord.payment_id}</span>
              </span>
            </div>

            {/* ITEMS */}
            <div className="divide-y divide-gray-50">
              {ord.items.map((item, i) => (
                <div key={i} className="flex gap-3 sm:gap-4 py-3">
                  <img
                    src={item.img || "https://via.placeholder.com/80"}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 bg-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-slate-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-0.5">₹{item.price}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-3 pt-3 border-t border-gray-100">
              <span className="font-bold text-slate-900">
                Total: ₹{ord.order_total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}