import React, { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { BsCart3 } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router";
import { MyContext } from "../Context";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const {user} = useContext(MyContext);

const links = [
  { icon: <IoHomeOutline />, Name: "Home", path: "/" },
  { icon: <FaSearch />, Name: "Search", path: "/search" },
  ...(user
    ? [{ icon: <CgProfile />, Name: "Profile", path: "/profile" }]
    : [{ icon: <CgProfile />, Name: "Sign In", path: "/login" }]
  ),
  { icon: <BsCart3 />, Name: "Cart", path: "/cart" },
  { icon: <IoIosContact />, Name: "Contact Us", path: "/contact" },
];

  return (
    <nav className="shadow-xl fixed z-10 w-screen bg-white p-2">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]">
          <img
            src="ChatGPT Image Oct 11, 2025, 02_04_05 PM.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-10 lg:gap-20 text-lg font-medium">
          {links.map((link, idx) => (
            <Link key={idx} to={link.path}>
              <li className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors duration-200">
                {link.icon} {link.Name}
              </li>
            </Link>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col bg-white w-full mt-2 shadow-lg text-lg font-medium">
          {links.map((link, idx) => (
            <Link key={idx} to={link.path}>
              <li
                className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => setMenuOpen(false)} // close menu on click
              >
                {link.icon} {link.Name}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </nav>
  );
}
