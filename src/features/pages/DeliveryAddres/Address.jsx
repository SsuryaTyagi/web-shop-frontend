import React, { useContext, useEffect } from "react";
import { MyContext } from "../../data/Context";
import { ToastContainer } from "react-toastify";
import Checkout from "../Checkout";
import { useNavigate } from "react-router";

export default function Address() {
  const { user, cartData, total, formData, setFormData } =
    useContext(MyContext);

  const navigate = useNavigate();

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

  const handlePaymentSuccess = (paymentResponse) => {
    navigate("/order-success", {
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

      <div className="w-full  bg-gray-50 flex justify-center py-28 px-4">
        
        <div className="w-full max-w-[1200px] bg-white rounded-xl shadow-sm p-6 md:p-8">


          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Delivery Details
            </h1>
            <p className="text-gray-600 mt-2">
              Please confirm your address before proceeding to payment
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Phone Number (WhatsApp)
              </label>
              <input
                type="text"
                placeholder="Enter active phone number"
                className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none"
                value={formData.number}
                onChange={(e) =>
                  setFormData({ ...formData, number: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Delivery Address
              </label>
              <textarea
                rows="3"
                placeholder="House no, street, area, city"
                className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>

          </div>


          <p className="text-sm text-gray-500 mt-6">
            ✔ Your details are safe and used only for delivery
          </p>


          <div className="mt-8 max-w-[420px]">
            <Checkout onPaymentSuccess={handlePaymentSuccess} />
          </div>

        </div>
      </div>
    </>
  );
}
