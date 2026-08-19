import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { BsCart3 } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import useCart from "../../pages/Cart/hooks/useCart";
import useAuth from "../../pages/auth/hooks/useAuth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const { cartData } = useCart();
  const location = useLocation();

  const links = [
    { icon: <IoHomeOutline />, Name: "Home", path: "/" },
    { icon: <FaSearch />, Name: "Search", path: "/search" },
    { icon: <CgProfile />, Name: "Sign In", path: "/login" },
    { icon: <BsCart3 />, Name: "Cart", path: "/cart" },
    { icon: <IoIosContact />, Name: "Contact Us", path: "/contact" },
  ];

  const links2 = links.filter((val) => val.Name !== "Sign In");

  links2.splice(2, 0, {
    icon: <CgProfile />,
    Name: "Profile",
    path: "/profile",
  });

  const activeLinks = user === null ? links : links2;

  const NavItem = ({ link, mobile = false }) => {
    const isActive = location.pathname === link.path;
    return (
      <Link
        to={link.path}
        onClick={mobile ? () => setMenuOpen(false) : undefined}
        className="relative"
      >
        <li
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-200 text-sm font-semibold cursor-pointer ${
            isActive
              ? "text-[#E33B32] bg-red-50"
              : "text-slate-700 hover:text-[#E33B32] hover:bg-slate-50"
          }`}
        >
          <span className="text-lg shrink-0">{link.icon}</span>
          <span>{link.Name}</span>
          {link.Name === "Cart" && cartData.length > 0 && (
            <span className="relative flex h-2.5 w-2.5 ml-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E33B32]"></span>
            </span>
          )}
        </li>
      </Link>
    );
  };

  return (
    <nav className="shadow-xs fixed top-0 left-0 right-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5">
        {/* Logo */}
        <Link to="/" aria-label="Go to homepage" className="flex items-center gap-2">
          <div className="w-[42px] h-[42px] sm:w-[50px] sm:h-[50px]">
            <img
              src="https://ik.imagekit.io/gb1lyvp8q/The%20pizza%20hub/logo/logo_two.png"
              alt="The Pizza Hub logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight hidden xs:inline-block">
            The Pizza Hub
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1 lg:gap-2">
          {activeLinks.map((link, idx) => (
            <NavItem key={idx} link={link} />
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden relative flex items-center">
          {cartData.length > 0 && !menuOpen && (
            <GoDotFill
              fontSize={14}
              className="text-[#E33B32] absolute -right-0.5 -top-0.5 pointer-events-none"
              aria-hidden="true"
            />
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="text-2xl p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#E33B32]/30 transition-colors"
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100 border-b border-slate-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 bg-white w-full px-4 pb-4 pt-1">
          {activeLinks.map((link, idx) => (
            <NavItem key={idx} link={link} mobile />
          ))}
        </ul>
      </div>
    </nav>
  );
}