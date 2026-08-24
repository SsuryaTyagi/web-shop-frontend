import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createOrder, verifyPayment, saveOrder } from "../services/payment.api";
import { setLoading, setError, setCurrentOrder } from "../payment.Slice.js";
import { loadRazorpayScript } from "../../../../utils/loadRazorpay";
import { storeRecentOrder } from "../../DeliveryAddres/services/orderService";
import useCart from "../../Cart/hooks/useCart";

export const usePayment = () => {
  const dispatch = useDispatch();
  const { loading, error, currentOrder } = useSelector((state) => state.payment);
  const { clearCart } = useCart();

  const handlePaymentSuccess = async (response, rzpOrder, ctx) => {
    const { user, formData, cartData, amount, onSuccess } = ctx;

    try {
      // 1. Verify Razorpay Payment Signature
      const verified = await verifyPayment({
        razorpay_order_id: response.razorpay_order_id || rzpOrder.id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      });

      if (!verified.success) {
        return toast.error("Payment verification failed!", {
          toastId: "verify-payment-error",
        });
      }

      // 2. Create Order in Backend Database
      const savedResponse = await saveOrder({
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

      const backendOrder = savedResponse?.order || savedResponse;
      const orderId = backendOrder?._id || backendOrder?.id;

      if (backendOrder) {
        storeRecentOrder(backendOrder);
      }

      // 3. Clear Cart ONLY after successful order creation in backend
      clearCart();

      toast.success("Order placed successfully!", { toastId: "order-success" });

      onSuccess?.({
        paymentResponse: response,
        orderId,
        savedOrder: backendOrder,
      });
    } catch (err) {
      console.error("Post payment order creation error", err);
      toast.error("Payment received, but order creation failed. Please contact support.", {
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

        const rzpOrder = await createOrder(amount);
        dispatch(setCurrentOrder(rzpOrder));

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: rzpOrder.amount,
          currency: rzpOrder.currency,
          order_id: rzpOrder.id,
          name: "The Pizza Hub",
          description: "Food Order Payment",
          prefill: {
            name: user?.name || formData?.name || "",
            email: user?.email || formData?.email || "",
          },
          theme: { color: "#E33B32" },
          handler: (response) =>
            handlePaymentSuccess(response, rzpOrder, {
              user,
              formData,
              cartData,
              amount,
              onSuccess,
            }),
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
    [dispatch, clearCart]
  );

  return { loading, error, currentOrder, initiatePayment };
};