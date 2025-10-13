import React from 'react'
import { FaAddressCard, FaFacebook, FaPhoneAlt } from 'react-icons/fa'
import { IoMailSharp } from 'react-icons/io5'
import { FaSquareInstagram } from "react-icons/fa6";
import { BsTwitterX } from 'react-icons/bs';
import { IoLogoWhatsapp } from 'react-icons/io';

export default function Footer() {
  return (
<div className="bg-[#e0e0e0] mt-11 w-screen h-[500px] flex flex-col justify-center items-center">
  <div className="w-[1400px] h-[450px] flex flex-col md:flex-row justify-between p-10 ">
    
    {/* Logo / Image */}
    <div className=" w-auto h-full">
      <img 
        src="ChatGPT Image Oct 11, 2025, 02_04_05 PM.png" 
        alt="Logo" 
        className="h-[400px] w-[400px] object-center"
      />
    </div>

    {/* Contact Info */}
    <div className="mt-12 h-[200px] font-semibold flex flex-col justify-between  md:mb-0">
      <h2 className=" text-3xl font-bold mb-2">Contact Us</h2>
 <div className="space-y-2">
      {/* Email */}
      <p>
        <IoMailSharp className="inline-block mr-1" fontSize={25} />
        Email:{" "}
        <a href="mailto:at36742@gmail.com" className="hover:text-blue-300">
          at36742@gmail.com
        </a>
      </p>

      {/* Phone */}
      <p>
        <FaPhoneAlt className="inline-block mr-1" fontSize={25} />
        Phone:{" "}
        <a href="tel:+919354770802" className=" hover:text-blue-300">
          +91 9354770802
        </a>
      </p>

      {/* Address (optional clickable link to Google Maps) */}
      <p>
        <FaAddressCard className="inline-block mr-1" fontSize={25} />
        Address:{" "}
        <a
          href="https://www.google.com/maps/search/?api=1&query=Delhi,India"
          target="_blank"
          className=" hover:text-blue-300"
        >
          Delhi, India
        </a>
      </p>
    </div>
    </div>

    {/* Social Media Links */}
    <div className="mt-12 h-[200px] font-semibold md:mb-0">
      <h2 className="text-3xl font-bold mb-2">Follow Us</h2>
      <div className="flex mt-18 gap-4">
        <a href="#" className="hover:text-blue-600"><FaFacebook fontSize={25}/></a>
        <a href="#" className="hover:text-pink-600"><FaSquareInstagram fontSize={25} /></a>
        <a href="#" className="hover:text-blue-400"><BsTwitterX fontSize={25}/></a>
        <a href="#" className="hover:text-green-600"><IoLogoWhatsapp fontSize={25}/></a>
      </div>
    </div>

    {/* Copyright */}
   
  </div>
   <div>
      <p className="text-sm">&copy; 2025 The pizza hub. All rights reserved. Developed by Surya Tyagi</p>
    </div>
</div>

  )
}
