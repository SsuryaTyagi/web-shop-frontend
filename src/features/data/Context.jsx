import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getorder } from "./services/orderService";
import useCart from "./hooks/useCart";
import useAuth from "../pages/auth/hooks/useAuth";

axios.defaults.withCredentials = true;

export const MyContext = createContext();


export default function Context({ children }) {
  const { user } = useAuth();

  const [order, setOrder] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
  });

  const {
    cartData,
    addToCart,
    updateQuantity,
    deleteFromCart,
    clearCart,
    total,
  } = useCart();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const googleToken = urlParams.get("token");

    if (googleToken) {
      localStorage.setItem("token", googleToken);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (!user?.email) return;
    const loadOrders = async () => {
      const orders = await getorder(user.email);
      setOrder(orders);
    };
    loadOrders();
  }, [user]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <MyContext.Provider
        value={{
          cartData,
          order,
          addToCart,
          deleteFromCart,
          updateQuantity,
          clearCart,
          total,
          formData,
          setFormData,
        }}
      >
        {children}
      </MyContext.Provider>
    </>
  );
}
