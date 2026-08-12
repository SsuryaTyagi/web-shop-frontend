import React, { useEffect, useState } from "react";
import Checkout from "../payment/pages/Checkout";
import { useNavigate } from "react-router";
import useCart from "../Cart/hooks/useCart";
import useAuth from "../auth/hooks/useAuth";
import { FiCheckCircle } from "react-icons/fi";

export default function Address() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
  });
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
    { key: "number", label: "Phone Number (WhatsApp)", type: "text", placeholder: "Enter active phone number" },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center py-24 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Delivery Details
          </h1>
          <p className="text-gray-600 mt-2">
            Please confirm your address before proceeding to payment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.key}>
              <label htmlFor={field.key} className="text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                id={field.key}
                type={field.type}
                placeholder={field.placeholder}
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-colors"
                value={formData[field.key]}
                onChange={(e) =>
                  setFormData({ ...formData, [field.key]: e.target.value })
                }
              />
            </div>
          ))}

          <div>
            <label htmlFor="address" className="text-sm font-medium text-gray-700">
              Delivery Address
            </label>
            <textarea
              id="address"
              rows="3"
              placeholder="House no, street, area, city"
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-colors resize-none"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
        </div>

        <p className="flex items-center gap-2 text-sm text-gray-500 mt-6">
          <FiCheckCircle className="text-green-500 shrink-0" aria-hidden="true" />
          Your details are safe and used only for delivery
        </p>

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