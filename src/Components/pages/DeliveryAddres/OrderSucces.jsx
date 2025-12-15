import React, { useContext } from "react";
import { validateForm } from "./orderValidation";
import { getLocation } from "./location";
import { buildOrderText } from "./orderText";

import { useLocation, useNavigate } from "react-router-dom";
import { MyContext } from "../../data/Context";
import { toast, ToastContainer } from "react-toastify";

export default function OrderSuccess() {
const { clearCart } = useContext(MyContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/");
    return null;
  }

  const { payment, cartData, total, formData, } = state;

    const handleOrder = async () => {
        
    const error = validateForm(formData, cartData);
    if (error) return toast.error(error);

    try {
      const { latitude, longitude } = await getLocation();
      const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

      const orderText = buildOrderText(cartData);
      const { name, email, number, address } = formData;

      // 🔥 PAID ORDER MESSAGE
      const message = encodeURIComponent(`🛒 New Order (PAID ✅)

Payment ID: ${payment.razorpay_payment_id}

Name: ${name}
Number: ${number}
Email: ${email}
Address: ${address}
Location: ${locationUrl}

----------------------------
${orderText}
----------------------------
Total: ₹${total}
`);
console.log("chal");

      const ownerNumber = "8529503358";
      const customerNumber = number.replace(/^0+/, "91");

      // Owner WhatsApp
      window.location.href =`https://wa.me/${ownerNumber}?text=${message}`;

      // Customer WhatsApp
      const confirmMsg = encodeURIComponent(`Hello ${name},

Your order is CONFIRMED ✅
Payment ID: ${payment.razorpay_payment_id}

${orderText}

Total Paid: ₹${total}
`);
      window.location.href = `https://wa.me/${customerNumber}?text=${confirmMsg}`;

      clearCart();
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
    <ToastContainer position="top-right" autoClose={2000} />
    <div className="min-h-screen pt-32 bg-gray-100 flex justify-center items-start">
      <div className="bg-white w-full max-w-md mt-10 p-5 rounded-xl shadow-lg">

        {/* ✅ SUCCESS HEADER */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-green-600">
            Payment Successful ✅
          </h2>
          <p className="text-sm text-gray-500">
            Payment ID: {payment.razorpay_payment_id}
          </p>
        </div>

        {/* ✅ ORDER ITEMS */}
        <div className="border-t border-b py-3">
          {cartData.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center mb-2"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-gray-500">
                  {item.selectedSize || "S"} × {item.quantity}
                </p>
              </div>
              <p className="font-bold">
                ₹{(item.finalPrice || item.price) * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* ✅ TOTAL */}
        <div className="flex justify-between mt-3 text-lg font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        {/* ✅ ADDRESS */}
        <div className="mt-4 text-sm text-gray-700">
          <p className="font-semibold">Delivery Address</p>
          <p>{formData.address}</p>
        </div>

        {/* ✅ WHATSAPP BUTTON */}
        <button
          onClick={handleOrder}
          className="mt-5 w-full bg-green-600 text-white py-3 rounded-lg text-lg"
        >
          Send Order on WhatsApp
        </button>
      </div>
    </div>
    </>
  );
}
