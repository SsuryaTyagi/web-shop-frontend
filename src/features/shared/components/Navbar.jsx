import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { BsCart3 } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link } from "react-router";
import useCart from "../../pages/Cart/hooks/useCart";
import useAuth from "../../pages/auth/hooks/useAuth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const { cartData } = useCart();

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

  const NavItem = ({ link, mobile = false }) => (
    <Link
      to={link.path}
      onClick={mobile ? () => setMenuOpen(false) : undefined}
      className="relative"
    >
      <li className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-gray-700 hover:text-red-500 hover:bg-red-50/60 transition-colors duration-200">
        <span className="text-lg">{link.icon}</span>
        <span>{link.Name}</span>
        {link.Name === "Cart" && cartData.length > 0 && (
          <GoDotFill
            fontSize={14}
            className="text-red-600 -translate-y-2"
            aria-hidden="true"
          />
        )}
      </li>
    </Link>
  );

  return (
    <nav className="shadow-sm fixed top-0 left-0 right-0 z-20 w-full bg-white/85 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-3 py-2">
        {/* Logo */}
        <Link to="/" aria-label="Go to homepage">
          <div className="w-[46px] h-[46px] sm:w-[56px] sm:h-[56px]">
            <img
              src="https://ik.imagekit.io/gb1lyvp8q/The%20pizza%20hub/logo/logo_two.png"
              alt="The Pizza Hub logo"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-2 lg:gap-4 text-base font-medium">
          {activeLinks.map((link, idx) => (
            <NavItem key={idx} link={link} />
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden relative">
          {cartData.length > 0 && !menuOpen && (
            <GoDotFill
              fontSize={14}
              className="text-red-600 absolute -right-0.5 -top-0.5 pointer-events-none"
              aria-hidden="true"
            />
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="text-2xl p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-200 transition-colors"
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 bg-white w-full px-3 pb-3 pt-1 border-t border-gray-100 text-base font-medium">
          {activeLinks.map((link, idx) => (
            <NavItem key={idx} link={link} mobile />
          ))}
        </ul>
      </div>
    </nav>
  );
}