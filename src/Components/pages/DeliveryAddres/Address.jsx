import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../data/Context";
import { toast, ToastContainer } from "react-toastify";
import Checkout from "../Checkout";
import { useNavigate } from "react-router";

export default function Address() {
  const { user, cartData, total } = useContext(MyContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
  });
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        number: user.number || "",
        address: user.address || "",
      });
    }
  }, [user]);

const navigate = useNavigate();

const handlePaymentSuccess = (paymentResponse) => {
  navigate("/cart/address/order-success", {
    state: {
      payment: paymentResponse,
      cartData,
      total,
      user,
      formData,
    },
  });
};
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="w-screen flex justify-center">
        <div className="p-6 pt-32 w-[95vw] min-h-[70vh] ">
          {/* ✅ Form */}
          <div className="mt-5 space-y-2">
            <input
              className="border p-2 w-full rounded"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              className="border p-2 w-full rounded"
              type="email"
              value={formData.email}
              placeholder="Your Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              className="border p-2 w-full rounded"
              type="text"
              placeholder="Your number (WhatsApp)"
              value={formData.number}
              onChange={(e) =>
                setFormData({ ...formData, number: e.target.value })
              }
            />
            <textarea
              className="border p-2 w-full rounded"
              placeholder="Your Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            ></textarea>
          </div>

          {/* ✅ Confirm Order Button */}
          <Checkout onPaymentSuccess={handlePaymentSuccess} />
        </div>
      </div>
    </>
  );
}
