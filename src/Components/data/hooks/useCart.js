import { useState, useEffect } from "react";

export default function useCart() {
  const [cartData, setCartData] = useState(() => {
    try {
      const saved = localStorage.getItem("cartData");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing cart data:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  const addToCart = (item) => {
    setCartData((prev) => [
      ...prev,
      { ...item, quantity: 1, basePrice: item.price },
    ]);
  };

  const updateQuantity = (index, newQty) => {
    setCartData((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: newQty,
              price: (item.basePrice || item.price) * newQty,
            }
          : item
      )
    );
  };

  const deleteFromCart = (index) => {
    setCartData((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCartData([]);

  const total = cartData.reduce(
    (acc, item) =>
      acc + (item.finalPrice || item.price || 0) * (item.quantity || 1),
    0
  );

  return {
    cartData,
    addToCart,
    updateQuantity,
    deleteFromCart,
    clearCart,
    total,
  };
}