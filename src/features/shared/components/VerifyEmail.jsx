import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../../Api.js";

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
        if (msg.includes("expired")) setStatus("expired");
        else if (msg.includes("already")) setStatus("already-verified");
        else setStatus("invalid");
      }
    };
    if (token) verify();
  }, [token]);

  const content = {
    loading: {
      emoji: "⏳",
      title: "Verifying your email...",
      msg: "Please wait while we validate your verification token.",
      color: "text-slate-700",
    },
    success: {
      emoji: "✅",
      title: "Email Verified Successfully!",
      msg: "Your account is active and verified. You can now log in.",
      color: "text-emerald-600",
    },
    expired: {
      emoji: "⏰",
      title: "Verification Link Expired",
      msg: "Your verification link has expired. Please register or request a new link.",
      color: "text-amber-600",
    },
    invalid: {
      emoji: "❌",
      title: "Invalid Verification Link",
      msg: "This email verification link is malformed or invalid.",
      color: "text-rose-600",
    },
    "already-verified": {
      emoji: "👍",
      title: "Already Verified",
      msg: "Your email address is already verified. You can log in right away.",
      color: "text-sky-600",
    },
  };

  const current = content[status];

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50/50 p-4">
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-xl max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-4xl shadow-inner border border-slate-100">
          {current.emoji}
        </div>

        <div className="space-y-2">
          <h1 className={`text-2xl font-extrabold tracking-tight ${current.color}`}>
            {current.title}
          </h1>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            {current.msg}
          </p>
        </div>

        {status !== "loading" && (
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3.5 bg-[#E33B32] hover:bg-[#cf312a] text-white font-bold text-xs rounded-2xl shadow-lg shadow-[#E33B32]/30 transition-all"
          >
            Proceed to Login
          </button>
        )}
      </div>
    </div>
  );
}