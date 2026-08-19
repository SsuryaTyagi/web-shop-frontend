import React from "react";
import { FaAddressCard, FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { IoMailSharp, IoLogoWhatsapp } from "react-icons/io5";
import { FaSquareInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 w-full overflow-hidden border-t border-slate-800">
      {/* Top Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" aria-label="Go to homepage" className="inline-block">
              <div className="bg-white/90 p-2 rounded-xl inline-block shadow-sm">
                <img
                  src="https://ik.imagekit.io/gb1lyvp8q/The%20pizza%20hub/logo/logo_two.png"
                  alt="The Pizza Hub logo"
                  className="h-12 sm:h-14 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Bringing you mouth-watering pizzas, delicious sides, and soul-comforting meals crafted with the freshest ingredients.
            </p>
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-white text-base font-bold tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-white transition-colors focus:outline-none focus:underline inline-block py-1"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="hover:text-white transition-colors focus:outline-none focus:underline inline-block py-1"
                >
                  Search Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-white transition-colors focus:outline-none focus:underline inline-block py-1"
                >
                  View Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-white transition-colors focus:outline-none focus:underline inline-block py-1"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors focus:outline-none focus:underline inline-block py-1"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-3">
            <h3 className="text-white text-base font-bold tracking-wide uppercase">
              Contact Us
            </h3>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:at36742@gmail.com"
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors focus:outline-none focus:underline py-1"
              >
                <IoMailSharp className="text-[#E33B32] text-lg shrink-0" aria-hidden="true" />
                <span className="break-all">at36742@gmail.com</span>
              </a>

              <a
                href="tel:+919354770802"
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors focus:outline-none focus:underline py-1"
              >
                <FaPhoneAlt className="text-[#E33B32] text-base shrink-0" aria-hidden="true" />
                <span>+91 9354770802</span>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=E-90+Chanakya+Place+Delhi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-slate-300 hover:text-white transition-colors focus:outline-none focus:underline py-1"
              >
                <FaAddressCard className="text-[#E33B32] text-lg shrink-0 mt-0.5" aria-hidden="true" />
                <span>E-90, Chanakya Place, Delhi, India</span>
              </a>
            </div>
          </div>

          {/* Column 4: Social Links & Community */}
          <div className="space-y-4">
            <h3 className="text-white text-base font-bold tracking-wide uppercase">
              Follow Us
            </h3>
            <p className="text-sm text-slate-400">
              Stay tuned for special offers, discount coupons, and new flavors!
            </p>
            <div className="flex gap-2.5 flex-wrap">
              <a
                href="#"
                aria-label="Follow us on Facebook"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-[#E33B32] hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#E33B32]"
              >
                <FaFacebook fontSize={18} />
              </a>
              <a
                href="#"
                aria-label="Follow us on Instagram"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-[#E33B32] hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#E33B32]"
              >
                <FaSquareInstagram fontSize={18} />
              </a>
              <a
                href="#"
                aria-label="Follow us on X (Twitter)"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-[#E33B32] hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#E33B32]"
              >
                <BsTwitterX fontSize={18} />
              </a>
              <a
                href="#"
                aria-label="Message us on WhatsApp"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-[#E33B32] hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#E33B32]"
              >
                <IoLogoWhatsapp fontSize={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-800 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} The Pizza Hub. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Designed & Developed by Surya Tyagi
          </p>
        </div>
      </div>
    </footer>
  );
}