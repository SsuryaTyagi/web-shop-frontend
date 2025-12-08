 import React, { Suspense, lazy } from "react";
import Navbar from "./Components/Items/Navbar";
import { Route, Routes } from "react-router";
import Footer from "./Components/Items/Footer.jsx";
import Login from "./Components/pages/user.jsx/login.jsx";
import Profile from "./Components/pages/profile/Profile.jsx";
import ScrollToTop from "./Components/Items/ScrollToTop.jsx";
import ContactPage from "./Components/pages/Contact/Contact.jsx";



// Lazy imports
const Home = lazy(() => import("./Components/pages/Homepage/Home"));
const List = lazy(() => import("./Components/pages/Menu/Menu"));
const Cart = lazy(() => import("./Components/pages/Cart/Cart"));
const Search = lazy(() => import("./Components/pages/Search"));


export default function App() {
  return (
<>

<div className=" no-scrollbar min-h-screen w-full overflow-x-hidden ">
   <ScrollToTop/>
      <div className=" ">
      <Navbar />
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/menu" element={<List />} />
           <Route path="/login" element={<Login/>} />
           <Route path="/profile" element={<Profile/>} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<ContactPage/>} />

        </Routes>
      </Suspense>
      
    </div>
    <Footer/>
</div>
</>
  );
}

