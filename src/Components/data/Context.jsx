import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BASE_URL } from "./Api";

axios.defaults.withCredentials = true;

// create context
export const MyContext = createContext();

export default function Context({ children }) {

  const navigate = useNavigate();

  //STATES
  const [data, setData] = useState([]);
  const [best, setBest] = useState([]);
  const [user, setUser] = useState(null);

  const [cartData, setCartData] = useState(() => {
    try {
      const saved = localStorage.getItem("cartData");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing cart data:", error);
      return [];
    }
  });

  // Menu API CALLS
  const fetchMenu = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/menu`);
      setData(res.data);
    } catch (error) {
      console.error("Menu fetch error:", error);
    }
  };


// best api call
  const fetchBest = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/best`);
      setBest(res.data);
    } catch (error) {
      console.error("Best fetch error:", error);
    }
  };


// signup api call
  const signup = async (userData) => {
    try {
      const res = await axios.post(`${BASE_URL}/register`, userData,{ withCredentials:true });
      alert("Signup successful");
    } catch (error) {
      const msg = error.response?.data?.message || "Signup failed!";
      alert(msg);
    }
  };


// login Api call
  const login = async (userData) => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, userData,{ withCredentials:true });

      alert("Login successful");
      await getProfile();
      navigate("/");
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong!";
      alert(msg);
    }
  };


// profile api call
  const getProfile = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/profile`,{},{ withCredentials:true });

      console.log("Profile:", res.data.user);
      setUser(res.data.user);
    } catch (error) {
      console.error("Profile Error:", error.response?.data || error);
      return null;
    }
  };


  // logout api call
  const logout = async () => {
  try {
    await axios.post(`${BASE_URL}/logout`,);

    setUser(null);
    alert("Logout successful");
    navigate("/login");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

  //CART HANDLERS
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

  //SIDE EFFECTS
  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  useEffect(() => {
    fetchMenu();
    fetchBest();
    getProfile();
  }, []);

  return (
    <MyContext.Provider value={{ data, best, user, cartData, addToCart, deleteFromCart, updateQuantity, clearCart, login, signup, logout  }} >
      {children}
    </MyContext.Provider>
  );
}
