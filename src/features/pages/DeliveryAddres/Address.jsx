import React, { useEffect, useState } from "react";
import Checkout from "../payment/pages/Checkout";
import { useNavigate } from "react-router-dom";
import useCart from "../Cart/hooks/useCart";
import useAuth from "../auth/hooks/useAuth";
import { FiCheckCircle, FiShield } from "react-icons/fi";
import Alert from "../../shared/components/Alert";

export default function Address() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const { user } = useAuth();
  const { cartData, total } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        number: user.number || "",
        address: user.address || "",
      });
    }
    window.scrollTo(0, 0);
  }, [user]);

  const handlePaymentSuccess = (paymentResponse) => {
    navigate("/order-success", {
      state: {
        payment: paymentResponse,
        cartData,
        total,
        user,
        formData,
      },
    });
  };

  const fields = [
    { key: "name", label: "Full Name", type: "text", placeholder: "Enter your full name" },
    { key: "email", label: "Email Address", type: "email", placeholder: "Enter your email" },
    { key: "number", label: "Phone Number (WhatsApp)", type: "tel", placeholder: "Enter active 10-digit mobile number" },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 flex justify-center py-24 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-10">
        <div className="mb-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#E33B32] bg-red-50 px-3 py-1 rounded-full">
            Checkout Step 1 of 2
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Delivery Details
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Please confirm your contact and delivery location before processing payment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.key}>
              <label htmlFor={field.key} className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                {field.label}
              </label>
              <input
                id={field.key}
                type={field.type}
                placeholder={field.placeholder}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 outline-none focus:ring-2 focus:ring-[#E33B32]/30 focus:border-[#E33B32] transition-colors text-sm min-h-[44px]"
                value={formData[field.key]}
                onChange={(e) =>
                  setFormData({ ...formData, [field.key]: e.target.value })
                }
              />
            </div>
          ))}

          <div>
            <label htmlFor="address" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
              Complete Delivery Address
            </label>
            <textarea
              id="address"
              rows="3"
              placeholder="House no, street, landmark, area, city, pincode"
              className="w-full bg-white border border-slate-300 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-[#E33B32]/30 focus:border-[#E33B32] transition-colors text-sm resize-none"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mt-6 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <FiShield className="text-emerald-600 shrink-0 text-base" aria-hidden="true" />
          <span>Your contact information is encrypted and strictly used for order updates and delivery.</span>
        </div>

        <div className="mt-8 max-w-md">
          <Checkout
            onPaymentSuccess={handlePaymentSuccess}
            formData={formData}
          />
        </div>
      </div>
    </div>
  );
}