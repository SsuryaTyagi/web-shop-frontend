import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

import {
  login as loginService,
  signup as signupService,
  logout as logoutService,
  getProfile
} from "./services/authService";
import { fetchMenu, fetchBest } from "./services/menuService";
import { getorder } from "./services/orderService";
import { Contact } from "./services/contactService";
import useCart from "./hooks/useCart";

axios.defaults.withCredentials = true;

export const MyContext = createContext();

export default function Context({ children }) {
  const navigate = useNavigate();

  const [data, setData]     = useState([]);
  const [best, setBest]     = useState([]);
  const [user, setUser]     = useState(null);
  const [order, setOrder]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "", email: "", number: "", address: "",
  });

  const { cartData, addToCart, updateQuantity,
          deleteFromCart, clearCart, total } = useCart();

  const checkAuth = async () => {
    try {
      const res = await axios.get("https://web-shop-api.vercel.app/profile");
      setUser(res.data);
      return res.data;
    } catch {
      setUser(null);
      return null;
    }
  };

  const signup = (userData) => signupService(userData, toast);

  const login = async (userData) => {
    const result = await loginService(userData, toast);
    if (result) {
      await checkAuth(); 
      navigate("/");
    }
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
    navigate("/");
  };

useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const googleToken = urlParams.get("token");

  if (googleToken) {
    localStorage.setItem("token", googleToken);
    window.history.replaceState({}, "", window.location.pathname);
  }

  const loadData = async () => {
    const [menuData, bestData] = await Promise.all([
      fetchMenu(),
      fetchBest(),
    ]);
    setData(Array.isArray(menuData) ? menuData : []);
    setBest(Array.isArray(bestData) ? bestData : []);

   
    const profileData = await getProfile();
    setUser(profileData || null);
    setLoading(false);
  };

  loadData();
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
          data, best, user, loading,
          cartData, order,
          addToCart, deleteFromCart, updateQuantity,
          clearCart, total,
          login, signup, logout,
          checkAuth,  // ← expose karo
          Contact,
          formData, setFormData,
        }}
      >
        {children}
      </MyContext.Provider>
    </>
  );
}