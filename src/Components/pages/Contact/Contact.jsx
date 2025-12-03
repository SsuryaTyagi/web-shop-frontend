import React, { useState } from "react";
import Swal from "sweetalert2";

export default function ContactPage() {
    const [msg , useMsg] = useState({
        name:"",
        email:"",
        subject:"",
        message:""
    })
  

    const handleChange = (e)=>{
        useMsg({...msg ,[e.target.name]:e.target.value});
    }

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", msg);
    
  Swal.fire({
    title: "Message Sent!",
    text: "Thanks for contacting us. We will get back to you soon.",
    icon: "success",
    confirmButtonColor: "#facc15", // yellow-400
  });

  useMsg({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  };
    
  return (
    <div className="w-full min-h-screen bg-gray-50 ">
      {/* Top Banner */}
      <div
        className="w-full h-[35vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Contact <span className="text-yellow-400">Us</span>
        </h1>
      </div>

      {/* Main Section */}
      <div className="w-full max-w-7xl mx-auto py-12 px-[3vw] grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left Side Form */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-600 text-lg">Your Name</label>
            <input
              type="text"
              name="name"
              value={msg.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:border-yellow-400"
              placeholder="Full Name"
            />
          </div>

          <div>
            <label className="text-gray-600 text-lg">Your Email</label>
            <input
              name="email"
              type="email"
              value={msg.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:border-yellow-400"
              placeholder="Email Address"
            />
          </div>

          <div>
            <label className="text-gray-600 text-lg">Subject</label>
            <input
              type="text"
              name="subject"
              value={msg.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:border-yellow-400"
              placeholder="Subject"
            />
          </div>

          <div>
            <label className="text-gray-600 text-lg">Your Message</label>
            <textarea
              rows="5"
              name="message"
              value={msg.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:border-yellow-400"
              placeholder="Message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-md w-fit"
          >
            SEND MESSAGE
          </button>
        </form>

        {/* Right Side Contact Info */}
        <div className="px-2">
          <h3 className="text-yellow-500 font-semibold text-lg">Contact Us</h3>
          <h2 className="text-3xl md:text-4xl font-bold mt-1">Get In Touch</h2>

          <p className="text-gray-600 leading-relaxed mt-4 text-[1.05rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            velit unde vel earum aperiam suscipit magni esse ea eaque, nisi
            dolores expedita!
          </p>

          {/* Contact Details */}
          <div className="mt-6 space-y-4 text-gray-700 text-lg">
            <p className="flex gap-3 items-center">
              📞 <span>+91 9354770802</span>
            </p>
            <p className="flex gap-3 items-center">
              📧 <span>2040surya@gmail.com</span>
            </p>
            <p className="flex gap-3 items-center">
              🌐 <span>www.awesomesite.com</span>
            </p>
            <p className="flex gap-3 items-center">
              📍 <span>uttam nager,rajapuri</span>
            </p>
          </div>

          {/* Social Icons */}
          <div className="mt-6">
            <h3 className="text-gray-700 font-semibold">Follow Us On</h3>
            <div className="flex gap-4 mt-3 text-yellow-500 text-2xl cursor-pointer">
              <i className="ri-facebook-fill"></i>
              <i className="ri-twitter-fill"></i>
              <i className="ri-instagram-fill"></i>
              <i className="ri-youtube-fill"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[35vh] grayscale">
        <iframe
          title="map"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19808.635291266977!2d-0.1341365!3d51.5098651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ad40c4f1a6d%3A0xa0f0f9fa9c6af8d!2sLondon!5e0!3m2!1sen!2suk!4v1700000000000"
        ></iframe>
      </div>
    </div>
  );
}
