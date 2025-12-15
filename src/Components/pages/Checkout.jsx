import React, { useContext } from "react";
import { createOrder } from "../../services/payment";
import { MyContext } from "../data/Context";


const Checkout = ({ onPaymentSuccess }) => {
const {total} = useContext(MyContext)
  const handlePayment = async () => {


        // 🛑 Safety check
    if (!window.Razorpay) {
      alert("Razorpay SDK load failed");
      return;
    }

    // 1️⃣ frontend → backend
    const order = await createOrder(total);

    // 2️⃣ Razorpay popup
    const options = {
      key: "rzp_live_RrmnR5Ik7IYBoM",
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

  return  <button onClick={handlePayment} className="bg-green-600 text-white px-6 py-3 rounded-lg mt-5 w-full">Confirm Order</button>

};

export default Checkout;
