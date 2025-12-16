import React, { useContext } from "react";
import { createOrder } from "../../services/payment";
import { MyContext } from "../data/Context";
import { validateForm } from "../../Components/pages/DeliveryAddres/orderValidation";
import { toast, ToastContainer } from "react-toastify";

const Checkout = ({ onPaymentSuccess }) => {

  const { total,cartData,formData } = useContext(MyContext);
  const handlePayment = async () => {

    const error = validateForm(formData, cartData);

    if (error) return toast.error(error);

 
    // 🛑 Safety check
    if (!window.Razorpay) {
      toast.error("Razorpay SDK load failed");
      return;
    }

    // 1️⃣ frontend → backend
    const order = await createOrder(total);

    // 2️⃣ Razorpay popup
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,

      handler: function (response) {
        console.log("Payment Success", response);
        onPaymentSuccess(response);
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
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
