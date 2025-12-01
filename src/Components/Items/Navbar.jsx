import React, { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { BsCart3 } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router";
import { MyContext } from "../data/Context";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, cartData } = useContext(MyContext);

  const links = [
    { icon: <IoHomeOutline />, Name: "Home", path: "/" },
    { icon: <FaSearch />, Name: "Search", path: "/search" },
    { icon: <CgProfile />, Name: "Sign In", path: "/login" },
    { icon: <BsCart3 />, Name: "Cart", path: "/cart" },
    { icon: <IoIosContact />, Name: "Contact Us", path: "/contact" },
  ];
    
  const links2 = links.filter((val)=> val.Name !== "Sign In")
  
 links2.splice(2, 0, { icon: <CgProfile />, Name: "Profile", path: "/profile" });
  
  return (
    <nav className="shadow-xl fixed z-10 w-screen bg-white p-2">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]">
            <img
              src="logo_two.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>
        {/* Desktop Links */}
        <ul className="hidden md:flex gap-10 lg:gap-20 text-lg font-medium">
          {(user === null?links:links2).map((link, idx) => (
            <Link key={idx} to={link.path}>
              {link.Name === "Cart" && cartData.length > 0 ? (
                <div className="relative flex items-center px-3 py-2">
                  <li className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors duration-200">
                    {link.icon} {link.Name}
                  </li>

                  <GoDotFill
                    fontSize={32}
                    className="text-red-600 absolute -right-2 -top-0 wiggle"
                  />
                </div>
              ) : (
                <li className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors duration-200">
                  {link.icon} {link.Name}
                </li>
              )}
            </Link>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        {/* Mobile Hamburger */}
        <div className="md:hidden relative">
          {/* DOT only when cart has items AND menu is closed */}
          {cartData.length > 0 && !menuOpen && (
            <GoDotFill
              onClick={() => setMenuOpen(!menuOpen)}
              fontSize={28}
              className="text-red-600 absolute -right-2 -top-1 wiggle"
            />
          )}

          <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col bg-white w-full mt-2 shadow-lg text-lg font-medium">
          {links.map((link, idx) => (
            <Link key={idx} to={link.path}>
              {link.Name === "Cart" && cartData.length > 0 ? (
                <div className="relative flex items-center px-3 py-2">
                  <li className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors duration-200">
                    {link.icon} {link.Name}
                  </li>

                  <GoDotFill
                    fontSize={32}
                    className="text-red-600 absolute right-75 -top-0 wiggle"
                  />
                </div>
              ) : (
                <li className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors duration-200">
                  {link.icon} {link.Name}
                </li>
              )}
            </Link>
          ))}
        </ul>
      )}
    </nav>
  );
}
