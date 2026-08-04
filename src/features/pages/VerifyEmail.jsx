import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../Api.js";

export default function VerifyEmail() {
  const { token } = useParams();           
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const verify = async () => {
      try {
        await axios.get(`${BASE_URL}/verify-email/${token}`);
        setStatus("success");
      } catch (err) {
        const msg = err.response?.data?.message || "";
        if (msg.includes("expired"))       setStatus("expired");
        else if (msg.includes("already"))  setStatus("already-verified");
        else                               setStatus("invalid");
      }
    };
    if (token) verify();
  }, [token]);

  const content = {
    loading: {
      emoji: "⏳",
      title: "Verifying your email...",
      msg: "Please wait.",
      color: "text-gray-500",
    },
    success: {
      emoji: "✅",
      title: "Email Verified Successfully!",
      msg: "Your account has been verified. You can now login.",
      color: "text-green-600",
    },
    expired: {
      emoji: "⏰",
      title: "Link Expired",
      msg: "Your verification link has expired. Please register again.",
      color: "text-orange-500",
    },
    invalid: {
      emoji: "❌",
      title: "Invalid Link",
      msg: "This verification link is not valid.",
      color: "text-red-500",
    },
    "already-verified": {
      emoji: "👍",
      title: "Already Verified",
      msg: "Your email is already verified. Please login.",
      color: "text-blue-500",
    },
  };

  const current = content[status];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full text-center">
        
        <div className="text-6xl mb-4">{current.emoji}</div>

        <h1 className={`text-2xl font-bold mb-2 ${current.color}`}>
          {current.title}
        </h1>

        <p className="text-gray-500 mb-8">{current.msg}</p>

        {/* Loading mein button mat dikhao */}
        {status !== "loading" && (
          <button
            onClick={() => navigate("/login")}
            className="bg-[#E33B32] text-white px-8 py-3 rounded-lg 
                       hover:bg-[#cf312a] transition font-medium"
          >
            Go to Login
          </button>
        )}

      </div>
    </div>
  );
}