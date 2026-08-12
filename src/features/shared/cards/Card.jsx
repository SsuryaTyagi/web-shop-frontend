import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { FiMinusCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import useCart from "../../pages/Cart/hooks/useCart";

export default function Card(props) {
  const [size, setSize] = useState("S");
  const { addToCart, updateQuantity, cartData } = useCart();

  const getPrice = () => {
    if (size === "S") return props.price;
    if (size === "M") return props.price_m;
    if (size === "L") return props.price_l;
  };

  // derive from real cart data — matches on _id + selectedSize
  const cartIndex = cartData.findIndex(
    (item) => item._id === props._id && item.selectedSize === size
  );
  const isInCart = cartIndex !== -1;
  const currentQty = isInCart ? cartData[cartIndex].quantity : 0;

  const handleAddToCart = () => {
    addToCart({
      ...props,
      selectedSize: size,
      finalPrice: getPrice(),
      quantity: 1,
    });
    toast.success(`${props.name} added to cart!`);
  };

  const handleIncrease = () => {
    updateQuantity(cartIndex, currentQty + 1);
  };

  const handleDecrease = () => {
    const newQty = currentQty - 1;
    if (newQty <= 0) {
      updateQuantity(cartIndex, 0);
    } else {
      updateQuantity(cartIndex, newQty);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={props.img}
          alt={props.name || "Food item"}
          loading="lazy"
          className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-sm sm:text-base md:text-lg font-bold truncate">
            {props.name}
          </h3>
          <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 shrink-0">
            <FaStar className="text-yellow-500" aria-hidden="true" />
            <span className="font-semibold">{props.rating}</span>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-gray-500 mt-1 flex justify-between items-center gap-2">
          <span className="truncate">{props.category}</span>
          <span className="font-bold text-gray-800 shrink-0">₹{getPrice()}</span>
        </div>

        {props.title && (
          <div className="text-xs sm:text-sm text-gray-400 truncate mt-0.5">
            {props.title}
          </div>
        )}

        {props.category === "Pizza" && (
          <div className="flex justify-center gap-2 mt-3" role="group" aria-label="Select size">
            {["S", "M", "L"].map((s) => (
              <button
                key={s}
                type="button"
                disabled={isInCart}
                aria-pressed={size === s}
                className={`px-3 py-1 text-sm rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
                  size === s
                    ? "bg-yellow-500 text-white border-yellow-500"
                    : "bg-white text-gray-700 border-gray-300 hover:border-yellow-400"
                } ${isInCart ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4">
          {!isInCart ? (
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-2 rounded-2xl text-center text-sm sm:text-base font-semibold text-white bg-green-500 hover:bg-green-600 active:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleDecrease}
                aria-label="Decrease quantity"
                className="bg-amber-400 hover:bg-amber-500 rounded-full p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300"
              >
                <FiMinusCircle fontSize={26} />
              </button>
              <span className="text-lg font-semibold w-6 text-center">{currentQty}</span>
              <button
                type="button"
                onClick={handleIncrease}
                aria-label="Increase quantity"
                className="bg-amber-400 hover:bg-amber-500 rounded-full p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300"
              >
                <MdOutlineAddCircleOutline fontSize={26} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}