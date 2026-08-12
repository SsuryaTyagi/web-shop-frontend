import React from "react";
import { FaAddressCard, FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { IoMailSharp, IoLogoWhatsapp } from "react-icons/io5";
import { FaSquareInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-[#e0e0e0] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-10 md:gap-6 md:justify-between">
        {/* Logo */}
        <div className="flex justify-center md:justify-start">
          <img
            src="https://ik.imagekit.io/gb1lyvp8q/The%20pizza%20hub/logo/logo_two.png"
            alt="The Pizza Hub logo"
            className="w-28 sm:w-36 md:w-40 object-contain"
          />
        </div>

        {/* Contact Info */}
        <div className="font-semibold">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Contact Us</h2>
          <div className="space-y-3 text-sm md:text-base font-normal">
            <p className="flex items-center gap-2">
              <IoMailSharp className="shrink-0" fontSize={20} aria-hidden="true" />
              <span>
                Email:{" "}
                <a
                  href="mailto:at36742@gmail.com"
                  className="hover:text-blue-600 focus:outline-none focus:underline transition-colors"
                >
                  at36742@gmail.com
                </a>
              </span>
            </p>

            <p className="flex items-center gap-2">
              <FaPhoneAlt className="shrink-0" fontSize={18} aria-hidden="true" />
              <span>
                Phone:{" "}
                <a
                  href="tel:+919354770802"
                  className="hover:text-blue-600 focus:outline-none focus:underline transition-colors"
                >
                  +91 9354770802
                </a>
              </span>
            </p>

            <p className="flex items-center gap-2">
              <FaAddressCard className="shrink-0" fontSize={18} aria-hidden="true" />
              <span>
                Address:{" "}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Delhi,India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 focus:outline-none focus:underline transition-colors"
                >
                  Delhi, India
                </a>
              </span>
            </p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="font-semibold">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Follow Us</h2>
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Follow us on Facebook"
              className="p-2 rounded-full hover:bg-white/60 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
            >
              <FaFacebook fontSize={22} />
            </a>
            <a
              href="#"
              aria-label="Follow us on Instagram"
              className="p-2 rounded-full hover:bg-white/60 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-colors"
            >
              <FaSquareInstagram fontSize={22} />
            </a>
            <a
              href="#"
              aria-label="Follow us on X (Twitter)"
              className="p-2 rounded-full hover:bg-white/60 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            >
              <BsTwitterX fontSize={22} />
            </a>
            <a
              href="#"
              aria-label="Message us on WhatsApp"
              className="p-2 rounded-full hover:bg-white/60 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors"
            >
              <IoLogoWhatsapp fontSize={22} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10">
        <p className="text-center text-xs md:text-sm text-gray-700 py-4 px-4">
          &copy; 2025 The Pizza Hub. All rights reserved. Developed by Surya Tyagi
        </p>
      </div>
    </footer>
  );
}