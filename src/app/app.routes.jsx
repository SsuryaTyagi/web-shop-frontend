// app.routes.jsx
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import Login from "../features/pages/auth/pages/login.jsx";
import Profile from "../features/pages/Profile/pages/Profile.jsx";
import ContactPage from "../features/pages/Contact/pages/Contact.jsx";
import Checkout from "../features/pages/Checkout.jsx";
import Address from "../features/pages/DeliveryAddres/Address.jsx";
import OrderSuccess from "../features/pages/DeliveryAddres/OrderSucces.jsx";
import YouOrder from "../features/pages/profile/components/Order.jsx";
import VerifyEmail from "../features/pages/VerifyEmail.jsx";

const Home = lazy(() => import("../features/pages/Home/pages/Home.jsx"));
const List = lazy(() => import("../features/pages/Home/components/Menu.jsx"));
const Cart = lazy(() => import("../features/pages/Cart/pages/Cart.jsx"));
const Search = lazy(() => import("../features/pages/Home/components/Search.jsx"));
const AdminRoutes = lazy(() => import("./admin.routes.jsx"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/menu" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/razorpay" element={<Checkout />} />
        <Route path="/cart/address" element={<Address />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order" element={<YouOrder />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Suspense>
  );
}