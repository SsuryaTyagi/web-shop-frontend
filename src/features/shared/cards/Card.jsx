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
    if (size === "M") return props.price_m || props.price;
    if (size === "L") return props.price_l || props.price;
    return props.price;
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
    <div className="w-full h-full flex flex-col justify-between bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
        <img
          src={props.img || props.image}
          alt={props.name || "Food item"}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {props.rating && (
          <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold text-slate-800 shadow-xs">
            <FaStar className="text-amber-400 text-[10px] sm:text-xs" aria-hidden="true" />
            <span>{props.rating}</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between gap-2">
        <div>
          {/* Header row: Title & Price */}
          <div className="flex justify-between items-start gap-1">
            <h3
              className="text-xs sm:text-base font-bold text-slate-900 line-clamp-1 leading-tight flex-1"
              title={props.name}
            >
              {props.name}
            </h3>
            <span className="font-black text-xs sm:text-base text-[#E33B32] shrink-0">
              ₹{getPrice()}
            </span>
          </div>

          {/* Subtitle / Category badge */}
          <div className="text-[10px] sm:text-xs text-gray-500 mt-1 flex items-center justify-between gap-1">
            <span className="font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded text-[10px] sm:text-xs truncate max-w-full">
              {props.category}
            </span>
          </div>

          {props.title && (
            <p
              className="text-[10px] sm:text-xs text-gray-400 mt-1 line-clamp-1 sm:line-clamp-2 leading-tight"
              title={props.title}
            >
              {props.title}
            </p>
          )}

          {/* Size Selector for Pizza */}
          {props.category === "Pizza" && (
            <div className="mt-2" role="group" aria-label="Select size">
              <div className="flex gap-1">
                {["S", "M", "L"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    disabled={isInCart}
                    aria-pressed={size === s}
                    className={`flex-1 py-0.5 sm:py-1 text-[10px] sm:text-xs font-extrabold rounded-md border transition-all focus:outline-none ${
                      size === s
                        ? "bg-[#E33B32] text-white border-[#E33B32] shadow-2xs"
                        : "bg-white text-slate-700 border-gray-200 hover:border-gray-300"
                    } ${isInCart ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-1.5 border-t border-gray-100">
          {!isInCart ? (
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-center text-xs sm:text-sm font-extrabold text-white bg-[#E33B32] hover:bg-[#cf312a] active:scale-[0.98] transition-all shadow-2xs focus:outline-none min-h-[34px] sm:min-h-[40px] flex items-center justify-center cursor-pointer"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-between bg-amber-50 rounded-lg sm:rounded-xl p-1 border border-amber-200">
              <button
                type="button"
                onClick={handleDecrease}
                aria-label="Decrease quantity"
                className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-amber-900 hover:bg-amber-200/60 rounded transition-colors focus:outline-none cursor-pointer"
              >
                <FiMinusCircle className="text-sm sm:text-base" />
              </button>
              <span className="text-xs sm:text-sm font-black text-amber-950 w-6 text-center">
                {currentQty}
              </span>
              <button
                type="button"
                onClick={handleIncrease}
                aria-label="Increase quantity"
                className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-amber-900 hover:bg-amber-200/60 rounded transition-colors focus:outline-none cursor-pointer"
              >
                <MdOutlineAddCircleOutline className="text-sm sm:text-base" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}