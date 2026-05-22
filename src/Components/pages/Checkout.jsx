import React, { useContext } from "react";
import { createOrder, verifyPayment, saveOrder } from "../../services/payment";
import { MyContext } from "../data/Context";
import { validateForm } from "../../Components/pages/DeliveryAddres/orderValidation";
import { toast, ToastContainer } from "react-toastify";

const Checkout = ({ onPaymentSuccess }) => {
  const { total, cartData, formData, user, clearCart } = useContext(MyContext);

  const handlePayment = async () => {
    const error = validateForm(formData, cartData);
    if (error) return toast.error(error);

    if (!window.Razorpay) {
      return toast.error("Razorpay SDK load failed");
    }

    try {
      // Step 1 — order banao
      const order = await createOrder(total);
      console.log("Order created:", order); // ✅ debug

      const options = {
        key:       import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount:    order.amount,
        currency:  order.currency,
        order_id:  order.id,
        name:      "The Pizza Hub",
        description: "Food Order Payment",
        prefill: {
          name:  user?.name  || "",
          email: user?.email || "",
        },
        theme: { color: "#E33B32" },

        handler: async (response) => {
          console.log("Razorpay response:", response); // ✅ debug

          try {
            // Step 3 — verify karo
            const verified = await verifyPayment({
              razorpay_order_id:   response.razorpay_order_id || order.id, // ✅ fallback
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
            });

            console.log("Verified:", verified); // ✅ debug

            if (!verified.success) {
              return toast.error("Payment verification failed!");
            }

            // Step 4 — order save karo
            await saveOrder({
              user: {
                name:    user?.name    || formData.name,
                email:   user?.email   || formData.email,
                number:  user?.number  || formData.number,
                address: user?.address || formData.address,
              },
              items:       cartData,
              order_total: total,
              payment_id:  response.razorpay_payment_id,
            });

            clearCart();
            onPaymentSuccess(response);

          } catch (err) {
            toast.error("Something went wrong after payment!");
            console.error("Verify/Save Error:", err);
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
      console.error("Payment Error:", err);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-6 py-3 rounded-lg mt-5 w-full"
      >
        Confirm Order
      </button>
    </>
  );
};

export default Checkout;