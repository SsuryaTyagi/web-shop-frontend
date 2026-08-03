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

  // 🔑 derive from real cart data — matches on _id + selectedSize
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
    <div className="w-[32vw] flex flex-col justify-between max-w-[320px] bg-white mb-4 rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl duration-300">
      <div className="relative group">
        <img
          src={props.img}
          alt=""
          loading="lazy"
          className="w-full h-[120px] sm:h-[150px] md:h-[180px] object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-2 sm:p-3">
        <div className="flex justify-between">
          <h3 className="text-sm sm:text-base md:text-lg font-bold truncate">
            {props.name}
          </h3>
          <div className="flex items-start text-[12px] sm:text-sm text-gray-600 mt-1">
            <FaStar className="text-yellow-500 mr-1" />
            <span className="font-semibold">{props.rating}</span>
          </div>
        </div>

        <div className="text-sm sm:text-sm text-gray-500 mt-1 truncate flex justify-between items-center">
          <span>{props.category}</span>
          <div className="font-bold">₹{getPrice()}</div>
        </div>

        <div className="text-sm sm:text-sm text-gray-400 truncate">
          {props.title}
        </div>

        {props.category === "Pizza" && (
          <div className="flex justify-around mt-2">
            {["S", "M", "L"].map((s) => (
              <button
                key={s}
                disabled={isInCart}
                className={`md:px-3 px-2 py-1 rounded-full border ${
                  size === s
                    ? "bg-yellow-500 text-white"
                    : "bg-white text-gray-700"
                } ${isInCart ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {!isInCart ? (
          <button
            onClick={handleAddToCart}
            className="w-full mt-6 rounded-2xl text-center md:text-2xl text-[12px] text-white bg-green-400 active:bg-green-800"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={handleDecrease} className="bg-amber-400 rounded-full p-1">
              <FiMinusCircle fontSize={30} />
            </button>
            <span className="text-lg font-semibold">{currentQty}</span>
            <button onClick={handleIncrease} className="bg-amber-400 rounded-full p-1">
              <MdOutlineAddCircleOutline fontSize={30} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}