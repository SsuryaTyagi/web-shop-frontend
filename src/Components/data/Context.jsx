import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const MyContext = createContext();
export default function Context({ children }) {
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [best, setBest] = useState();
  const [user, setUser] = useState();
  const [cartData, setCartData] = useState(() => {
    try {
      const saved = localStorage.getItem("cartData");
      if (!saved || saved === "undefined" || saved === "null") return [];
      return JSON.parse(saved);
    } catch (error) {
      console.error("Error parsing cart data:", error);
      return [];
    }
  });

  const menu = async () => {
    try {
      const res = await axios.get("https://web-shop-nine-zeta.vercel.app/menu");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };
  const Best = async () => {
    try {
      const res = await axios.get("https://web-shop-nine-zeta.vercel.app/best");
      setBest(res.data);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };
  const signup = async (userData) => {
    try {
      const res = await axios.post(
        "https://web-shop-nine-zeta.vercel.app/register",
        userData
      );
      alert("singn up successful ");
      console.log(res.data.message);
    } catch (error) {
      console.error("Signup error:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong! Please try again.");
      }
    }
  };
  const login = async (userData) => {
    try {
      const res = await axios.post(
        "https://web-shop-nine-zeta.vercel.app/login",
        userData,
        { withCredentials: true }
      );
      alert("login successful ");
      console.log(res.data.message);
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong! Please try again.");
      }
    }
  };
  const verify = async () => {
    try {
      const res = await axios.post(
        "https://web-shop-nine-zeta.vercel.app/verify",
        { withCredentials: true }
      );
      console.log(res.data.message);
      setUser(res.data.user);
    } catch (error) {
      console.error(error.response.data.message);
      setUser(null);
    }
  };
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

  const clearCart = () => setCartData([]);

  const deleteFromCart = (index) => {
    setCartData((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    menu();
    Best();
    // verify();
  }, []);
  return (
    <MyContext.Provider
      value={{
        data,
        best,
        user,
        cartData,
        addToCart,
        deleteFromCart,
        updateQuantity,
        login,
        clearCart,
        signup,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
