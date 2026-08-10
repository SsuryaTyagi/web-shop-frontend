import React from "react";
import { toast } from "react-toastify";
import { validateForm } from "../../DeliveryAddres/orderValidation";
import useAuth from "../../auth/hooks/useAuth";
import useCart from "../../Cart/hooks/useCart";
import { usePayment } from "../hooks/usePayment";

const Checkout = ({ onPaymentSuccess, formData }) => {
  const { total, cartData, clearCart } = useCart();
  const { user } = useAuth();
  const { loading, initiatePayment } = usePayment();

  const handlePayment = async () => {
    const error = validateForm(formData, cartData);
    if (error) return toast.error(error);

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
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-green-600 text-white px-6 py-3 rounded-lg mt-5 w-full disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? "Processing..." : "Confirm Order"}
    </button>
  );
};

export default Checkout;