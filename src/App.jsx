 import React, { Suspense, lazy } from "react";
import Navbar from "./Components/Items/Navbar";
import { Route, Routes } from "react-router";
import Footer from "./Components/Items/Footer.jsx";
import Login from "./Components/pages/user.jsx/login.jsx";

// Lazy imports
const Home = lazy(() => import("./Components/pages/Homepage/Home.jsx"));
const List = lazy(() => import("./Components/pages/Menu/Menu"));
const Cart = lazy(() => import("./Components/pages/Cart/Cart"));
const Search = lazy(() => import("./Components/pages/Search"));


export default function App() {
  return (
<div className="h-screen sticky bottom-0 overflow-x-hidden ">
      <div className=" ">
      <Navbar />
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/menu" element={<List />} />
           <Route path="/login" element={<Login/>} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Suspense>
      
    </div>
    <Footer/>
</div>
  );
}

