import React, { useContext } from "react";
import { getLocation } from "./location";
import { buildOrderText } from "./orderText";

import { useLocation, useNavigate } from "react-router-dom";
import { MyContext } from "../../data/Context";
import { ToastContainer } from "react-toastify";
import { Order } from "../../../services/orderCreate";

export default function OrderSuccess() {
  const { clearCart } = useContext(MyContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/");
    return null;
  }

  const { payment, cartData, total, formData } = state;

  function clear() {
    clearCart();
  }
  
  return (
    <>
      <div className="min-h-screen pt-32 bg-gray-100 flex justify-center items-start">
        <div className="bg-white w-full max-w-md mt-10 p-5 rounded-xl shadow-lg">
          {/* ✅ SUCCESS HEADER */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-green-600">
              Payment Successful ✅
            </h2>
            <p className="text-sm text-gray-500">
              Payment ID: {payment.razorpay_payment_id}
            </p>
          </div>

          {/* ✅ ORDER ITEMS */}
          <div className="border-t border-b py-3">
            {cartData.map((item, i) => (
              <div key={i} className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.selectedSize || "S"} × {item.quantity}
                  </p>
                </div>
                <p className="font-bold">
                  ₹{(item.finalPrice || item.price) * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* ✅ TOTAL */}
          <div className="flex justify-between mt-3 text-lg font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          {/* ✅ ADDRESS */}
          <div className="mt-4 text-sm text-gray-700">
            <p className="font-semibold">Delivery Address</p>
            <p>{formData.address}</p>
          </div>

          {/* ✅ WHATSAPP BUTTON */}
          <a
            href={`https://wa.me/918529503358?text=${encodeURIComponent(
              `🛒 New Order (PAID ✅)

Payment ID: ${payment.razorpay_payment_id}

Name: ${formData.name}
Number: ${formData.number}
Email: ${formData.email}
Address: ${formData.address}
Location: ${getLocation()}

${buildOrderText(cartData)}

Total: ₹${total}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={clear}
            className="mt-5 w-full bg-green-600 text-white py-3 rounded-lg text-lg text-center block"
          >
            Send Order on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
