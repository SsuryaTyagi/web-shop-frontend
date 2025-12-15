import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../data/Context";
import { FiMinusCircle } from "react-icons/fi";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

export default function Cart() {
  const { cartData, deleteFromCart, updateQuantity, total,user } = useContext(MyContext);

    const navigate = useNavigate();
const order = ()=>{
  if (!user) {
    toast.error("Please login to continue your order");
    return;
  }else{
    navigate("/cart/address")
  }
}

  return (
    <>
    <ToastContainer position="top-right" autoClose={2000} />
    <div className="w-screen flex justify-center">
      <div className="p-6 pt-32 w-[95vw] min-h-[70vh] ">
        <h2 className="text-2xl font-bold mb-4">🛍 Your Cart</h2>
        {cartData.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {/* ✅ Cart Items */}
            {cartData.map((item, i) => (
              <div
                key={i}
                className="border p-3 mb-3 rounded-md shadow-sm flex justify-between items-center"
              >
                <div>
                  <span className="font-bold">{item.name}</span>
                  <p className="text-sm text-gray-600">
                    Size: {item.selectedSize || "S"} | ₹
                    {item.finalPrice || item.price}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="text-gray-500"
                      onClick={() =>
                        updateQuantity(i, (cartData[i].quantity || 1) - 1)
                      }
                    >
                      <FiMinusCircle fontSize={30} />
                    </button>
                    <span className="font-bold text-[20px] text-green-500">
                      {item.quantity || 1}
                    </span>
                    <button
                      className="text-green-500"
                      onClick={() =>
                        updateQuantity(i, (cartData[i].quantity || 1) + 1)
                      }
                    >
                      <MdOutlineAddCircleOutline fontSize={30} />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <b>
                    ₹{(item.finalPrice || item.price) * (item.quantity || 1)}
                  </b>
                  <button
                    className="block bg-red-700 font-bold p-2 rounded-2xl text-white text-sm mt-1 hover:underline"
                    onClick={() => deleteFromCart(i)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {/* ✅ Total */}
            <h3 className="text-xl font-bold mt-3">Total: ₹{total}</h3>
              <button
              onClick={order}
               className="bg-green-600 text-white px-6 py-3 rounded-lg mt-5 w-full">
                Confirm Order
              </button>
          </>
        )}
      </div>
    </div>
    </>
  );
}
