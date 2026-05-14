import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

// Services
import { login as loginService, signup as signupService, logout as logoutService, getProfile } from "./services/authService";
import { fetchMenu, fetchBest } from "./services/menuService";
import { getorder } from "./services/orderService";
import { Contact } from "./services/contactService";

// Hook
import useCart from "./hooks/useCart";

axios.defaults.withCredentials = true;

export const MyContext = createContext();

export default function Context({ children }) {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [best, setBest] = useState([]);
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState([]);
  const [loading, setloading] = useState(true);
  const [formData, setFormData] = useState({
    name: "", email: "", number: "", address: "",
  });

  const { cartData, addToCart, updateQuantity, deleteFromCart, clearCart, total } = useCart();

  // Auth functions
  const signup = (userData) => signupService(userData, toast);

  const login = async (userData) => {
    const result = await loginService(userData, toast);
    if (result) {
      const profile = await getProfile();
      setUser(profile);
      navigate("/");
    }
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
    navigate("/");
  };

  // Data fetch
  useEffect(() => {
    const loadData = async () => {
      const [menuData, bestData, profileData] = await Promise.all([
        fetchMenu(),
        fetchBest(),
        getProfile(),
      ]);
      setData(menuData);
      setBest(bestData);
      setUser(profileData);
      setloading(false);
    };
    loadData();
  }, []);

  // Orders
  useEffect(() => {
    const loadOrders = async () => {
      const orders = await getorder(user?.email);
      setOrder(orders);
    };
    loadOrders();
  }, [user]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <MyContext.Provider
        value={{
          data, best, user, loading, cartData, order,
          addToCart, deleteFromCart, updateQuantity, clearCart,
          login, signup, logout, Contact,
          total, formData, setFormData,
        }}
      >
        {children}
      </MyContext.Provider>
    </>
  );
}