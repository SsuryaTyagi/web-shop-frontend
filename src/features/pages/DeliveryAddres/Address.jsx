import React, { useEffect, useState } from "react";
import Checkout from "../payment/pages/Checkout";
import { useNavigate } from "react-router-dom";
import useCart from "../Cart/hooks/useCart";
import useAuth from "../auth/hooks/useAuth";
import { ShieldCheck, User, Mail, Phone, MapPin, AlertCircle } from "lucide-react";
import CheckoutProgress from "./components/CheckoutProgress";
import CheckoutOrderSummary from "./components/CheckoutOrderSummary";

export default function Address() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
  });

  const [touched, setTouched] = useState({});
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

  // Validation helper
  const validateFields = (data = formData) => {
    const errors = {};
    if (!data.name?.trim()) {
      errors.name = "Full Name is required";
    } else if (data.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!data.email?.trim()) {
      errors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.email = "Please enter a valid email address";
    }

    if (!data.number?.trim()) {
      errors.number = "Phone Number is required";
    } else if (!/^0?[6-9]\d{9}$/.test(data.number.trim())) {
      errors.number = "Please enter a valid 10-digit mobile number";
    }

    if (!data.address?.trim()) {
      errors.address = "Complete Delivery Address is required";
    } else if (data.address.trim().length < 10) {
      errors.address = "Please provide detailed house/street/pincode address (min 10 chars)";
    }

    return errors;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errors = validateFields();
    setFieldErrors(errors);
  };

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (touched[field]) {
      const errors = validateFields(updated);
      setFieldErrors(errors);
    }
  };

  const handlePaymentSuccess = (paymentData) => {
    const orderId = paymentData?.orderId || paymentData?.savedOrder?.order?._id || paymentData?.savedOrder?._id;
    
    if (orderId) {
      navigate(`/order-success?orderId=${orderId}`, {
        state: {
          orderId,
          payment: paymentData.paymentResponse || paymentData,
          savedOrder: paymentData.savedOrder,
          cartData,
          total,
          formData,
        },
      });
    } else {
      navigate("/order-success", {
        state: {
          payment: paymentData.paymentResponse || paymentData,
          cartData,
          total,
          formData,
        },
      });
    }
  };

  const isFormValid = Object.keys(validateFields()).length === 0;

  return (
    <div className="w-full min-h-screen bg-slate-50 flex justify-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl space-y-6">
        {/* Header & Step Indicator */}
        <CheckoutProgress currentStep={1} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Delivery Information Form (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E33B32] bg-red-50 px-3 py-1 rounded-full">
                Step 1 of 2
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                Delivery Details
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Please enter your accurate contact and delivery address to ensure fast delivery.
              </p>
            </div>

            {/* Input fields */}
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className={`w-full bg-white border rounded-xl pl-10 pr-3.5 py-3 text-sm font-semibold text-slate-900 outline-none transition-all min-h-[44px] ${
                      touched.name && fieldErrors.name
                        ? "border-red-400 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                        : "border-slate-300 focus:ring-2 focus:ring-[#E33B32]/20 focus:border-[#E33B32]"
                    }`}
                    value={formData.name}
                    onBlur={() => handleBlur("name")}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                </div>
                {touched.name && fieldErrors.name && (
                  <p className="text-xs font-bold text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Email & Phone grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className={`w-full bg-white border rounded-xl pl-10 pr-3.5 py-3 text-sm font-semibold text-slate-900 outline-none transition-all min-h-[44px] ${
                        touched.email && fieldErrors.email
                          ? "border-red-400 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                          : "border-slate-300 focus:ring-2 focus:ring-[#E33B32]/20 focus:border-[#E33B32]"
                      }`}
                      value={formData.email}
                      onBlur={() => handleBlur("email")}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </div>
                  {touched.email && fieldErrors.email && (
                    <p className="text-xs font-bold text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="number" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                    Phone Number (WhatsApp) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="number"
                      type="tel"
                      maxLength={10}
                      placeholder="9876543210"
                      className={`w-full bg-white border rounded-xl pl-10 pr-3.5 py-3 text-sm font-semibold text-slate-900 outline-none transition-all min-h-[44px] ${
                        touched.number && fieldErrors.number
                          ? "border-red-400 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                          : "border-slate-300 focus:ring-2 focus:ring-[#E33B32]/20 focus:border-[#E33B32]"
                      }`}
                      value={formData.number}
                      onBlur={() => handleBlur("number")}
                      onChange={(e) => handleChange("number", e.target.value)}
                    />
                  </div>
                  {touched.number && fieldErrors.number && (
                    <p className="text-xs font-bold text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {fieldErrors.number}
                    </p>
                  )}
                </div>
              </div>

              {/* Complete Address */}
              <div>
                <label htmlFor="address" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                  Complete Delivery Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <textarea
                    id="address"
                    rows="3"
                    placeholder="House no., Apartment, Street, Landmark, City & Pincode"
                    className={`w-full bg-white border rounded-xl pl-10 pr-3.5 py-3 text-sm font-semibold text-slate-900 outline-none transition-all resize-none ${
                      touched.address && fieldErrors.address
                        ? "border-red-400 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                        : "border-slate-300 focus:ring-2 focus:ring-[#E33B32]/20 focus:border-[#E33B32]"
                    }`}
                    value={formData.address}
                    onBlur={() => handleBlur("address")}
                    onChange={(e) => handleChange("address", e.target.value)}
                  />
                </div>
                {touched.address && fieldErrors.address && (
                  <p className="text-xs font-bold text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {fieldErrors.address}
                  </p>
                )}
              </div>
            </div>

            {/* Privacy notice */}
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <ShieldCheck className="text-emerald-600 shrink-0 w-4 h-4" />
              <span>Your delivery information is encrypted and strictly used for order updates.</span>
            </div>

            {/* Payment Section embedded */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E33B32] bg-red-50 px-3 py-1 rounded-full">
                Step 2 of 2
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mt-2 mb-4">
                Confirm & Pay
              </h3>

              <Checkout
                onPaymentSuccess={handlePaymentSuccess}
                formData={formData}
                validateForm={() => {
                  setTouched({
                    name: true,
                    email: true,
                    number: true,
                    address: true,
                  });
                  const errors = validateFields();
                  setFieldErrors(errors);
                  return Object.keys(errors).length === 0;
                }}
              />
            </div>
          </div>

          {/* Sticky Sidebar Order Summary (Right 5 Cols on Desktop) */}
          <div className="lg:col-span-5 w-full">
            <CheckoutOrderSummary cartData={cartData} total={total} deliveryFee={0} />
          </div>
        </div>
      </div>
    </div>
  );
}