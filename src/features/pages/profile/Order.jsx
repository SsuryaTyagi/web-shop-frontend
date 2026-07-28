import React, { useContext } from "react";
import { MyContext } from "../../data/Context";

export default function YouOrder() {
  const { order } = useContext(MyContext);
  console.log(order);

  if (!order || order.length === 0) {
    return (
      <div className="text-center  py-[3rem]">
        <h2 className="text-[1.4rem] font-semibold">No Orders Found 🛒</h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 px-[4vw] py-[2rem]">
      <h2 className="text-[1.8rem] font-bold mb-[1.5rem]">Your Orders</h2>

      {order.map((ord, index) => (
        <div
          key={index}
          className="bg-white rounded-[1rem] shadow-md mb-[2rem] p-[1rem]"
        >
          {/* ORDER HEADER */}
          <div className="flex justify-between flex-wrap text-[0.85rem] text-gray-600 mb-[1rem]">
            <span>
              <b>Status:</b> {ord.status}
            </span>
            <span>
              <b>Payment ID:</b> {ord.payment_id}
            </span>
          </div>

          {/* ITEMS */}
          {ord.items.map((item, i) => (
            <div key={i} className="flex gap-[1rem] py-[0.8rem] border-t">
              {/* IMAGE (fallback) */}
              <div className="w-[6rem] flex justify-center">
                <img
                  src={item.img || "https://via.placeholder.com/80"}
                  alt={item.name}
                  className="w-[5rem] h-[5rem] rounded-bl-[5px] rounded-tl-[5px] object-contain"
                />
              </div>

              {/* ITEM DETAILS */}
              <div className="flex-1">
                <h3 className="font-semibold text-[1rem]">{item.name}</h3>

                <p className="text-gray-500 text-[0.9rem]">₹{item.price}</p>
                <span>
                  <b>Date:</b> {new Date(ord.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
            Total: ₹{ord.order_total}

        </div>
      ))}
    </div>
  );
}
