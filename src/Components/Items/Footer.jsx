import React from 'react'
import { FaAddressCard, FaFacebook, FaPhoneAlt } from 'react-icons/fa'
import { IoMailSharp } from 'react-icons/io5'
import { FaSquareInstagram } from "react-icons/fa6";
import { BsTwitterX } from 'react-icons/bs';
import { IoLogoWhatsapp } from 'react-icons/io';

export default function Footer() {
  return (
<div className="bg-[#e0e0e0] mt-11 w-screen  flex flex-col justify-center items-center ">
  <div className=" md:w-[85vw] w-full flex flex-row  justify-between md:p-10">
    
    {/* Logo / Image */}
    <div className=" w-auto h-full mt-20 md:m-0">
      <img 
        src="ChatGPT Image Oct 11, 2025, 02_04_05 PM.png" 
        alt="Logo" 
        className=" w-[25vw] object-center"
      />
    </div>

    {/* Contact Info */}
    <div className="mt-12 h-[2vw] font-semibold flex flex-col justify-between ">
      <h2 className="md:text-3xl text-[1.5rem] font-bold mb-[3vw]">Contact Us</h2>
 <div className="space-y-2 text-[.7em] md:text-[1.5rem]">
      {/* Email */}
      <p>
        <IoMailSharp className="inline-block mr-1" md:fontSize={25}  />
        Email:{" "}
        <a href="mailto:at36742@gmail.com" className="hover:text-blue-300">
          at36742@gmail.com
        </a>
      </p>

      {/* Phone */}
      <p>
        <FaPhoneAlt className="inline-block mr-1" md:fontSize={25} />
        Phone:{" "}
        <a href="tel:+919354770802" className=" hover:text-blue-300">
          +91 9354770802
        </a>
      </p>

      {/* Address (optional clickable link to Google Maps) */}
      <p>
        <FaAddressCard className="inline-block mr-1" md:fontSize={25} />
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
    <div className=" mt-12 font-semibold md:mb-0">
      <h2 className="md:text-3xl text-[1.5rem] font-bold mb-[3vw]">Follow Us</h2>
      <div className="flex mt-14  gap-4">
        <a href="#" className="hover:text-blue-600"><FaFacebook md:fontSize={25}/></a>
        <a href="#" className="hover:text-pink-600"><FaSquareInstagram md:fontSize={25} /></a>
        <a href="#" className="hover:text-blue-400"><BsTwitterX md:fontSize={25}/></a>
        <a href="#" className="hover:text-green-600"><IoLogoWhatsapp md:fontSize={25}/></a>
      </div>
    </div>
   
  </div>
   <div className='flex justify-center mt-8'>
      <p className="text-[.7rem] md:text-[1rem] ">&copy; 2025 The pizza hub. All rights reserved. Developed by Surya Tyagi</p>
    </div>
</div>

  )
}
