import React, { useState } from "react";
import Swal from "sweetalert2";
import { FiPhone, FiMail, FiGlobe, FiMapPin } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import useContact from "../hooks/useContect.js";

export default function ContactPage() {
  const [msg, setMsg] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { handleContact } = useContact();

  const handleChange = (e) => {
    setMsg({
      ...msg,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleContact(msg);

    Swal.fire({
      title: "Message Sent!",
      text: "Thanks for contacting us. We will get back to you soon.",
      icon: "success",
      confirmButtonColor: "#facc15",
    });

    setMsg({ name: "", email: "", subject: "", message: "" });
  };

  const contactDetails = [
    { icon: <FiPhone />, text: "+91 9354770802" },
    { icon: <FiMail />, text: "2040surya@gmail.com" },
    { icon: <FiGlobe />, text: "www.awesomesite.com" },
    { icon: <FiMapPin />, text: "Uttam Nagar, Rajapuri" },
  ];

  const socials = [
    { icon: <FaFacebookF />, label: "Facebook" },
    { icon: <FaTwitter />, label: "Twitter" },
    { icon: <FaInstagram />, label: "Instagram" },
    { icon: <FaYoutube />, label: "YouTube" },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-20">
      {/* Top Banner */}
      <div
        className="w-full h-[30vh] sm:h-[35vh] bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Contact <span className="text-yellow-400">Us</span>
        </h1>
      </div>

      {/* Main Section */}
      <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="text-gray-600 text-sm font-medium">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={msg.name}
              onChange={handleChange}
              required
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2.5 text-base outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-colors"
              placeholder="Full Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-gray-600 text-sm font-medium">
              Your Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={msg.email}
              onChange={handleChange}
              required
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2.5 text-base outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-colors"
              placeholder="Email Address"
            />
          </div>

          <div>
            <label htmlFor="subject" className="text-gray-600 text-sm font-medium">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              value={msg.subject}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2.5 text-base outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-colors"
              placeholder="Subject"
            />
          </div>

          <div>
            <label htmlFor="message" className="text-gray-600 text-sm font-medium">
              Your Message
            </label>
            <textarea
              id="message"
              rows="5"
              name="message"
              value={msg.message}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2.5 text-base outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-colors resize-none"
              placeholder="Message"
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-lg w-fit transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            Send Message
          </button>
        </form>

        {/* Right Side Contact Info */}
        <div>
          <h3 className="text-yellow-500 font-semibold text-sm uppercase tracking-wide">
            Contact Us
          </h3>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-1 text-slate-900">
            Get In Touch
          </h2>

          <p className="text-gray-600 leading-relaxed mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            velit unde vel earum aperiam suscipit magni esse ea eaque, nisi
            dolores expedita!
          </p>

          {/* Contact Details */}
          <div className="mt-6 space-y-4">
            {contactDetails.map((item, i) => (
              <p key={i} className="flex gap-3 items-center text-gray-700">
                <span className="text-yellow-500 text-lg shrink-0" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.text}</span>
              </p>
            ))}
          </div>

          {/* Social Icons */}
          <div className="mt-8">
            <h3 className="text-gray-700 font-semibold text-sm uppercase tracking-wide">
              Follow Us On
            </h3>
            <div className="flex gap-3 mt-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={`Follow us on ${s.label}`}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-50 text-yellow-500 hover:bg-yellow-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[30vh] sm:h-[35vh] grayscale hover:grayscale-0 transition-all duration-500">
        <iframe
          title="Our location on map"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19808.635291266977!2d-0.1341365!3d51.5098651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ad40c4f1a6d%3A0xa0f0f9fa9c6af8d!2sLondon!5e0!3m2!1sen!2suk!4v1700000000000"
        />
      </div>
    </div>
  );
}