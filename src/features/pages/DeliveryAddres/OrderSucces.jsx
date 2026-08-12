import React, { useEffect } from "react";
import { getLocation } from "./location";
import { buildOrderText } from "./orderText";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../Cart/hooks/useCart";
import { FiCheckCircle } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io5";

export default function OrderSuccess() {
  const { clearCart } = useCart();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state) return null;

  const { payment, cartData, total, formData } = state;

  const clear = () => {
    clearCart();
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-12 bg-gray-100 flex justify-center items-start px-4">
      <div className="bg-white w-full max-w-md p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
        {/* SUCCESS HEADER */}
        <div className="text-center mb-4">
          <FiCheckCircle className="text-green-500 text-4xl mx-auto mb-2" aria-hidden="true" />
          <h2 className="text-xl sm:text-2xl font-bold text-green-600">
            Payment Successful
          </h2>
          <p className="text-sm text-gray-500 mt-1 break-all">
            Payment ID: {payment.razorpay_payment_id}
          </p>
        </div>

        {/* ORDER ITEMS */}
        <div className="border-t border-b border-gray-100 py-3 divide-y divide-gray-50">
          {cartData.map((item, i) => (
            <div key={i} className="flex justify-between items-center py-2">
              <div>
                <p className="font-semibold text-slate-900">{item.name}</p>
                <p className="text-xs text-gray-500">
                  {item.selectedSize || "S"} × {item.quantity}
                </p>
              </div>
              <p className="font-bold text-slate-900">
                ₹{(item.finalPrice || item.price) * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="flex justify-between mt-3 text-lg font-bold text-slate-900">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        {/* ADDRESS */}
        <div className="mt-4 text-sm text-gray-700">
          <p className="font-semibold text-slate-900">Delivery Address</p>
          <p className="mt-0.5">{formData.address}</p>
        </div>

        {/* WHATSAPP BUTTON */}
        
          href={`https://wa.me/918529503358?text=${encodeURIComponent(
            `New Order (PAID)

Payment ID: ${payment.razorpay_payment_id}

Name: ${formData.name}
Number: ${formData.number}
Email: ${formData.email}
Address: ${formData.address}
Location: ${getLocation()}

${buildOrderText(cartData)}

Total: ₹${total}`
          )}`}
          <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={clear}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-base font-semibold flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          <IoLogoWhatsapp className="text-xl" aria-hidden="true" />
          Send Order on WhatsApp
        </a>
      </div>
    </div>
  );
}