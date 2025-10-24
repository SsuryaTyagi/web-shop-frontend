import React from "react";
import Navbar from "./Components/Items/Navbar";
import { Route, Routes } from "react-router";
import Home from "./Components/Pages/HomePage/Home.jsx";
import List from "./Components/Pages/Menu/Menu";
import Cart from "./Components/Pages/Cart/Cart";
// import Footer from "./Components/Items/Footer";
import Search from "./Components/Pages/Search";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/menu" element={<List />} />
        <Route path="/search" element={<Search/>}/>
      </Routes>
      {/* <Footer/> */}
    </div>
  )
};
