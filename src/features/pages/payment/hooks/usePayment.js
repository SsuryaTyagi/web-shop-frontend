import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createOrder, verifyPayment, saveOrder } from "../services/payment.api";
import { setLoading, setError, setCurrentOrder } from "../payment.slice";
import { loadRazorpayScript } from "../../../../utils/loadRazorpay";

export const usePayment = () => {
  const dispatch = useDispatch();
  const { loading, error, currentOrder } = useSelector((state) => state.payment);

  const handlePaymentSuccess = async (response, order, ctx) => {
    const { user, formData, cartData, amount, onSuccess } = ctx;

    try {
      const verified = await verifyPayment({
        razorpay_order_id: response.razorpay_order_id || order.id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      });

      if (!verified.success) {
        return toast.error("Payment verification failed!", {
          toastId: "verify-payment-error",
        });
      }

      await saveOrder({
        user: {
          name: user?.name || formData?.name,
          email: user?.email || formData?.email,
          number: user?.number || formData?.number,
          address: user?.address || formData?.address,
        },
        items: cartData,
        order_total: amount,
        payment_id: response.razorpay_payment_id,
      });

      toast.success("Order placed successfully!", { toastId: "order-success" });
      onSuccess?.(response);
    } catch (err) {
      toast.error("Something went wrong after payment!", {
        toastId: "post-payment-error",
      });
    }
  };

  const initiatePayment = useCallback(
    async ({ amount, user, formData, cartData, onSuccess }) => {
      dispatch(setLoading(true));

      try {
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          throw new Error("Razorpay SDK failed to load. Are you online?");
        }

        const order = await createOrder(amount);
        dispatch(setCurrentOrder(order));

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          order_id: order.id,
          name: "The Pizza Hub",
          description: "Food Order Payment",
          prefill: {
            name: user?.name || formData?.name || "",
            email: user?.email || formData?.email || "",
          },
          theme: { color: "#E33B32" },
          handler: (response) =>
            handlePaymentSuccess(response, order, { user, formData, cartData, amount, onSuccess }),
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", (response) => {
          toast.error(`Payment failed: ${response.error.description}`, {
            toastId: "payment-failed",
          });
        });
        rzp.open();
      } catch (err) {
        dispatch(setError(err.message));
        toast.error(err.message || "Payment initiation failed!", {
          toastId: "payment-init-error",
        });
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  return { loading, error, currentOrder, initiatePayment };
};