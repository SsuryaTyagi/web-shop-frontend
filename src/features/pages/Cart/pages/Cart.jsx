import React from "react";
import { FiMinusCircle } from "react-icons/fi";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../auth/hooks/useAuth.js";
import useCart from "../hooks/useCart";

export default function Cart() {
  const { cartData, deleteFromCart, updateQuantity, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const order = () => {
    if (!user) {
      toast.error("Please login to continue your order");
      return;
    } else {
      navigate("/cart/address");
    }
  };

  const handleDecrease = (i) => {
    const newQty = (cartData[i].quantity || 1) - 1;
    if (newQty <= 0) {
      deleteFromCart(i); // fully remove instead of leaving a 0-qty row
      toast.info(`${cartData[i].name} removed from cart`);
    } else {
      updateQuantity(i, newQty);
    }
  };

  return (
    <div className="w-full flex justify-center bg-slate-50/50 min-h-screen">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6">
          <HiOutlineShoppingBag className="text-[#E33B32]" aria-hidden="true" />
          Your Cart
        </h2>

        {cartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-2xl border border-gray-100">
            <HiOutlineShoppingBag className="text-5xl text-gray-300 mb-4" aria-hidden="true" />
            <p className="text-lg font-semibold text-gray-600">Your cart is empty</p>
            <p className="text-sm text-gray-400 mt-1">
              Add something delicious to get started.
            </p>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-6 px-6 py-2.5 bg-[#E33B32] hover:bg-[#cf312a] text-white font-semibold rounded-xl transition-colors"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3">
              {cartData.map((item, i) => (
                <div
                  key={item._id + item.selectedSize}
                  className="bg-white border border-gray-100 p-3 sm:p-4 rounded-2xl shadow-sm flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 truncate">{item.name}</span>
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {item.selectedSize || "S"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      ₹{item.finalPrice || item.price}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        className="text-gray-500 hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full"
                        onClick={() => handleDecrease(i)}
                      >
                        <FiMinusCircle fontSize={26} />
                      </button>
                      <span className="font-bold text-lg text-slate-800 w-5 text-center">
                        {item.quantity || 1}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        className="text-green-600 hover:text-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-200 rounded-full"
                        onClick={() =>
                          updateQuantity(i, (cartData[i].quantity || 1) + 1)
                        }
                      >
                        <MdOutlineAddCircleOutline fontSize={26} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="font-bold text-slate-900">
                      ₹{(item.finalPrice || item.price) * (item.quantity || 1)}
                    </p>
                    <button
                      type="button"
                      className="mt-2 text-sm font-semibold text-red-600 hover:text-red-700 hover:underline transition-colors focus:outline-none"
                      onClick={() => deleteFromCart(i)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-28 bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Order Summary</h3>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Items</span>
                <span>{cartData.length}</span>
              </div>
              <div className="flex justify-between text-lg font-extrabold text-slate-900 pt-3 border-t border-gray-100">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <button
                type="button"
                onClick={order}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl w-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Confirm Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}