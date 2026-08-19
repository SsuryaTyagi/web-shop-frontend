import React, { useState } from "react";
import { validateForm } from "../../DeliveryAddres/orderValidation";
import useAuth from "../../auth/hooks/useAuth";
import useCart from "../../Cart/hooks/useCart";
import { usePayment } from "../hooks/usePayment";
import Alert from "../../../shared/components/Alert";

const Checkout = ({ onPaymentSuccess, formData }) => {
  const { total, cartData, clearCart } = useCart();
  const { user } = useAuth();
  const { loading, initiatePayment } = usePayment();
  const [errorMessage, setErrorMessage] = useState("");

  const handlePayment = async () => {
    setErrorMessage("");
    const error = validateForm(formData, cartData);
    if (error) {
      setErrorMessage(error);
      return;
    }

    await initiatePayment({
      amount: total,
      user,
      formData,
      cartData,
      onSuccess: (response) => {
        clearCart();
        onPaymentSuccess(response);
      },
    });
  };

  return (
    <div className="w-full space-y-4">
      {errorMessage && (
        <Alert
          type="error"
          title="Please check your details"
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl w-full transition-all shadow-xs disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-400 min-h-[44px] cursor-pointer text-base"
      >
        {loading ? "Connecting to Payment Gateway..." : `Pay & Confirm Order (₹${total})`}
      </button>
    </div>
  );
};

export default Checkout;