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
  const { handleContact, loading } = useContact();

  const handleChange = (e) => {
    setMsg({
      ...msg,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleContact(msg);

      Swal.fire({
        title: "Message Sent!",
        text: "Thanks for reaching out! Our team will get back to you shortly.",
        icon: "success",
        confirmButtonColor: "#E33B32",
        customClass: {
          popup: "rounded-3xl",
          confirmButton: "rounded-xl font-bold px-6 py-2.5",
        },
      });

      setMsg({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      Swal.fire({
        title: "Submission Error",
        text: "Could not send your message right now. Please try again or call us directly.",
        icon: "error",
        confirmButtonColor: "#E33B32",
      });
    }
  };

  const contactDetails = [
    { icon: <FiPhone />, label: "Phone", text: "+91 9354770802", href: "tel:+919354770802" },
    { icon: <FiMail />, label: "Email", text: "2040surya@gmail.com", href: "mailto:2040surya@gmail.com" },
    { icon: <FiGlobe />, label: "Website", text: "www.thepizzahub.com", href: "#" },
    {
      icon: <FiMapPin />,
      label: "Location",
      text: "E-90, Chanakya Place, Delhi, India",
      href: "https://www.google.com/maps/search/?api=1&query=E-90+Chanakya+Place+Delhi",
    },
  ];

  const socials = [
    { icon: <FaFacebookF />, label: "Facebook" },
    { icon: <FaTwitter />, label: "Twitter" },
    { icon: <FaInstagram />, label: "Instagram" },
    { icon: <FaYoutube />, label: "YouTube" },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-16 sm:pt-20">
      {/* Responsive Top Hero Banner */}
      <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden flex items-center justify-center bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=1350&q=80"
          alt="The Pizza Hub Contact Banner"
          className="w-full h-full object-cover object-center max-w-full"
        />
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs" />
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <span className="inline-block bg-[#E33B32] text-white text-[10px] sm:text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-md">
            Customer Support
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Contact <span className="text-amber-400">The Pizza Hub</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-200 mt-1.5 max-w-lg mx-auto font-medium leading-normal">
            Have questions, order feedback, or party catering requests? We're located at E-90, Chanakya Place, Delhi!
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="w-full max-w-7xl mx-auto py-8 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side: Contact Form Card */}
          <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 font-medium">
              Fill out the form below and we will get back to you within 24 hours.
            </p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={msg.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#E33B32]/30 focus:border-[#E33B32] transition-colors min-h-[44px]"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={msg.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#E33B32]/30 focus:border-[#E33B32] transition-colors min-h-[44px]"
                  placeholder="e.g. rahul@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={msg.subject}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#E33B32]/30 focus:border-[#E33B32] transition-colors min-h-[44px]"
                  placeholder="Order inquiry, feedback, catering..."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  rows="4"
                  name="message"
                  value={msg.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#E33B32]/30 focus:border-[#E33B32] transition-colors resize-none"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#E33B32] hover:bg-[#cf312a] text-white font-extrabold px-8 py-3.5 rounded-xl transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-[#E33B32]/40 min-h-[44px] cursor-pointer mt-2 text-sm"
              >
                {loading ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Right Side: Contact Info & Socials */}
          <div className="space-y-6">
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#E33B32] bg-red-50 px-2.5 py-1 rounded-md inline-block mb-2">
                Get In Touch
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                We're Here to Help
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium leading-relaxed">
                Visit us at our Delhi outlet or reach out via phone/email for quick support.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6">
                {contactDetails.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-red-200 transition-all flex items-start gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E33B32] flex items-center justify-center shrink-0 text-lg group-hover:bg-[#E33B32] group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {item.label}
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-800 break-words">
                        {item.text}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Channels Card */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs">
              <h3 className="text-base font-extrabold text-slate-900 mb-3">
                Follow Us On Social Media
              </h3>
              <div className="flex gap-2.5 flex-wrap">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label={`Follow us on ${s.label}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-[#E33B32] hover:text-white transition-all text-xs font-bold"
                  >
                    {s.icon}
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section pointing to E-90 Chanakya Place Delhi */}
      <div className="w-full h-64 sm:h-80 md:h-96 border-t border-slate-200 grayscale hover:grayscale-0 transition-all duration-500">
        <iframe
          title="The Pizza Hub at E-90 Chanakya Place Delhi Google Map"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          src="https://maps.google.com/maps?q=E-90%20Chanakya%20Place%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
        />
      </div>
    </div>
  );
}