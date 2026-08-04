import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../features/shared/components/Navbar.jsx";
import Footer from "../features/shared/components/Footer.jsx";
import ScrollToTop from "../features/shared/components/ScrollToTop.jsx";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./app.routes.jsx";

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ToastContainer
        position="top-right"
        pauseOnHover={false}
        autoClose={2000}
        pauseOnFocusLoss={false}
      />
      <div className="no-scrollbar min-h-screen w-full overflow-x-hidden">
        <ScrollToTop />
        {isAdminRoute ? (
          <AppRoutes />
        ) : (
          <div>
            <Navbar />
            <AppRoutes />
            <Footer />
          </div>
        )}
      </div>
    </>
  );
}