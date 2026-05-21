// src/pages/VerifyEmail.jsx
import { useSearchParams, useNavigate } from "react-router";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get("status");

  const content = {
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
  const current = content[status] || content["invalid"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full text-center">
        <div className="text-6xl mb-4">{current.emoji}</div>

        <h1 className={`text-2xl font-bold mb-2 ${current.color}`}>
          {current.title}
        </h1>

        <p className="text-gray-500 mb-8">{current.msg}</p>

        <button
          onClick={() => navigate("/login")}
          className="bg-[#E33B32] text-white px-8 py-3 rounded-lg 
                     hover:bg-[#cf312a] transition font-medium"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
