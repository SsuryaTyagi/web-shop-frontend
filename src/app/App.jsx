import React from "react";
import Navbar from "../features/shared/components/Navbar.jsx";
import Footer from "../features/shared/components/Footer.jsx";
import ScrollToTop from "../features/shared/components/ScrollToTop.jsx";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./app.routes.jsx";

export default function App() {
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
        <div>
          <Navbar />
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </>
  );
}