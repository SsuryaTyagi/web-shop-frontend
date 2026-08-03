import React from "react";
import { createOrder, verifyPayment, saveOrder } from "../../services/payment";
import { validateForm } from "../../features/pages/DeliveryAddres/orderValidation";
import { toast } from "react-toastify";
import useAuth from "../pages/auth/hooks/useAuth";
import useCart from "../pages/Cart/hooks/useCart";

const Checkout = ({ onPaymentSuccess, formData }) => {
  const { total, cartData, clearCart } = useCart();
  const { user } = useAuth();

  const handlePayment = async () => {
    const error = validateForm(formData, cartData);
    if (error) return toast.error(error);

    if (!window.Razorpay) {
      return toast.error("Razorpay SDK load failed");
    }

    try {
      const order = await createOrder(total);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "The Pizza Hub",
        description: "Food Order Payment",
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: { color: "#E33B32" },

        handler: async (response) => {
          try {
            const verified = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id || order.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (!verified.success) {
              return toast.error("Payment verification failed!");
            }

            await saveOrder({
              user: {
                name: user?.name || formData?.name,
                email: user?.email || formData?.email,
                number: user?.number || formData?.number,
                address: user?.address || formData?.address,
              },
              items: cartData,
              order_total: total,
              payment_id: response.razorpay_payment_id,
            });

            clearCart();
            onPaymentSuccess(response);
          } catch (err) {
            toast.error("Something went wrong after payment!");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        toast.error(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (err) {
      toast.error("Payment initiation failed!");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-green-600 text-white px-6 py-3 rounded-lg mt-5 w-full"
    >
      Confirm Order
    </button>
  );
};

export default Checkout;