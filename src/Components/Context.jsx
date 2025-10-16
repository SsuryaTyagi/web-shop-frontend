import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const MyContext = createContext();
export default function Context({ children }) {
  const [data, setData] = useState();
  const [best, setBest] = useState();
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
      const res = await axios.get("http://localhost:8000/menu");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };
  const Best = async () => {
    try {
      const res = await axios.get("http://localhost:8000/best");
      setBest(res.data);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };
  const [Menu] = useState([
    {
      img: "menu/margarita-pizza.png",
      rating: 4.9,
      category: "Pizza",
      name: "Double Cheese Margarita",
      title: "Loaded with extra cheese",
      price: 120,
      price_m: 250,
      price_l: 350,
    },
    {
      img: "menu/Fresh veggie.png",
      rating: 4.8,
      category: "Pizza",
      name: "Fresh Veggie",
      title: "Onion, Tomato, Capsicum & Sweet Corn",
      price: 150,
      price_m: 200,
      price_l: 349,
    },
    {
      img: "menu/Exotica.png",
      rating: 4.7,
      category: "Pizza",
      name: "Exotica",
      title: "Onion, Capsicum, Mushroom, Jalapeno & Black Olive",
      price: 130,
      price_m: 220,
      price_l: 399,
    },
    {
      img: "menu/Framhouse.png",
      rating: 4.9,
      category: "Pizza",
      name: "Farmhouse",
      title: "Onion, Tomato, Capsicum, Mushroom & Red Paprika",
      price: 150,
      price_m: 250,
      price_l: 399,
    },
    {
      img: "menu/veg Supreme.png",
      rating: 4.8,
      category: "Pizza",
      name: "Veg Supreme",
      title: "Onion, Tomato, Capsicum, Mushroom",
      price: 150,
      price_m: 250,
      price_l: 399,
    },
    {
      img: "menu/Deluxe Veggie.png",
      rating: 4.7,
      category: "Pizza",
      name: "Deluxe Veggie",
      title: "Onion, Capsicum, Paneer & Sweet Corn",
      price: 150,
      price_m: 250,
      price_l: 399,
    },
    {
      img: "menu/Duble paneer.jpg",
      rating: 4.9,
      category: "Pizza",
      name: "Double Paneer Supreme",
      title: "Paneer, Red Paprika, Jalapeno & Black Olive",
      price: 150,
      price_m: 320,
      price_l: 450,
    },
    {
      img: "menu/Corn.png",
      rating: 4.5,
      category: "Pizza",
      name: "Cheese & Corn Pizza",
      title: "Sweet Corn with cheese",
      price: 70,
      price_m: 150,
      price_l: 249,
    },
    {
      img: "menu/onion Pizza.jpg",
      rating: 4.8,
      category: "Pizza",
      name: "Cheese & Onion Pizza",
      title: "Onion with cheese",
      price: 70,
      price_m: 150,
      price_l: 249,
    },
    {
      img: "menu/paneer pizza.jpg",
      rating: 4.7,
      category: "Pizza",
      name: "Cheese & Paneer Pizza",
      title: "Paneer & cheese topping",
      price: 99,
      price_m: 170,
      price_l: 299,
    },
    {
      img: "menu/Capsicum.png",
      rating: 4.6,
      category: "Pizza",
      name: "Cheese & Capsicum Pizza",
      title: "Capsicum, cheese topping",
      price: 70,
      price_m: 150,
      price_l: 249,
    },
    {
      img: "menu/Burger/Aloo tikki.jpg",
      rating: 4.6,
      category: "Burger",
      name: "Aloo Tikki Burger",
      title: "Aloo tikki,onion",
      price: 50,
    },
    {
      img: "menu/Burger/paneer burger.jpg",
      rating: 4.8,
      category: "Burger",
      name: "Spicy Paneer with cheese ",
      title: "Paneer,aloo tikki,cheese,onion,spicy",
      price: 90,
    },
    {
      img: "menu/Burger/Veg Cheese.jpg",
      rating: 4.8,
      category: "Burger",
      name: "Veg Cheese",
      title: "Onion with cheese Burger",
      price: 65,
    },
    {
      img: "menu/Burger/veggie King Double cheese.jpg",
      rating: 4.9,
      category: "Burger",
      name: "Veggie king double cheese Burger",
      title: "Special items",
      price: 120,
    },
    {
      img: "menu/French Fries/cheese french frice.jpg",
      rating: 4.9,
      category: "french fries",
      name: "Cheese french frice",
      title: "cheese french frice with peri-peri",
      price: 150,
    },
    {
      img: "menu/French Fries/salted french fries.jpg",
      rating: 4.6,
      category: "french fries",
      name: "Salted french frice",
      title: "french frice with salte",
      price: 100,
    },
    {
      img: "menu/French Fries/peri-peri french frice.jpg",
      rating: 4.8,
      category: "french fries",
      name: "Pari-pari french frice",
      title: "french frice with pari-pari",
      price: 120,
    },
    {
      img: "menu/Wraps/Double paneer wrap.jpg",
      rating: 4.9,
      category: "wraps",
      name: "paneer wrap",
      title: "Paneer,onion,corn,tomato",
      price: 99,
    },
    {
      img: "menu/Wraps/Mushrooms chilli.jpg",
      rating: 4.8,
      category: "wraps",
      name: "Mushrooms wraps",
      title: "mushrooms,onion,tomato,corn",
      price: 150,
    },
    {
      img: "menu/Wraps/Mix veg wrap.jpg",
      rating: 4.6,
      category: "wraps",
      name: "mix veg wrap",
      title: "mix all veggies",
      price: 80,
    },
    {
      img: "menu/Wraps/Paneer wrap.jpg",
      rating: 4.9,
      category: "wraps",
      name: "double paneer wrap",
      title: "double Paneer,onion,corn,tomato",
      price: 150,
    },
  ]);

  
 
  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

 const addToCart = (item) => {
  setCartData((prev) => [
    ...prev,
    { ...item, quantity: 1, basePrice: item.price },
  ]);
};

// 🟡 NEW: Update quantity of a cart item
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
  // 🟢 NEW: Delete item from cart
const deleteFromCart = (index) => {
  setCartData((prev) => prev.filter((_, i) => i !== index));
};


  useEffect(() => {
    menu();
    Best();
  }, []);
  return (
    <MyContext.Provider
      value={{ data, best, Menu, cartData, addToCart,deleteFromCart,updateQuantity, clearCart }}
    >
      {children}
    </MyContext.Provider>
  );
}
