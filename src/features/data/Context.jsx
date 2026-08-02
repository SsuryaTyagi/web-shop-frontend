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


  const {
    cartData,
    addToCart,
    updateQuantity,
    deleteFromCart,
    clearCart,
    total,
  } = useCart();



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
      <MyContext.Provider
        value={{
          cartData,
          order,
          addToCart,
          deleteFromCart,
          updateQuantity,
          clearCart,
          total,
        }}
      >
        {children}
      </MyContext.Provider>
    </>
  );
}
