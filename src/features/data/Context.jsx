import axios from "axios";
import React, { createContext} from "react";
import useCart from "./hooks/useCart";
import useAuth from "../pages/auth/hooks/useAuth";

axios.defaults.withCredentials = true;

export const MyContext = createContext();


export default function Context({ children }) {
  const { user } = useAuth();


  const {
    cartData,
    addToCart,
    updateQuantity,
    deleteFromCart,
    clearCart,
    total,
  } = useCart();


  return (
    <>
      <MyContext.Provider
        value={{
          cartData,
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
