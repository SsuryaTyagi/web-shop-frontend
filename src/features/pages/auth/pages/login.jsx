import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAuth from "../hooks/useAuth.js";
import { toast } from "react-toastify";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    address: "",
  });

  const { handleRegister, handleLogin, handleGoogleLogin, user, loading, error, message } =
    useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      await handleLogin({
        email: formData.email,
        password: formData.password,
      });
    } else {
      if (
        !formData.name ||
        !formData.number ||
        !formData.email ||
        !formData.password ||
        !formData.address
      ) {
        return toast.error("All fields are required");
      }
      await handleRegister(formData);
    }

    setFormData({
      name: "",
      number: "",
      email: "",
      password: "",
      address: "",
    });
  };

  const handleGoogleLoginClick = () => {
    handleGoogleLogin();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name.toLowerCase()]: e.target.value,
    });
  };

  const inputValue = [
    { name: "name", type: "text", placeholder: "Enter your Name" },
    { name: "address", type: "text", placeholder: "Enter your address" },
    { name: "number", type: "tel", placeholder: "Enter your Phone No." },
    { name: "email", type: "email", placeholder: "Enter your Email" },
    {
      name: "password",
      type: showPassword ? "text" : "password",
      placeholder: "Enter your Password",
    },
  ];

  const filterValue = inputValue.filter(
    (value) => value.name === "email" || value.name === "password",
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="hidden md:flex w-1/2 bg-[url('https://i.imgur.com/Zf7Xk3Q.png')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="z-10 text-white p-10 flex flex-col justify-center h-full">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to The Pizza Hub
          </h1>
          <p className="text-lg leading-relaxed text-gray-200">
            Bringing you flavors that comfort the soul and freshness that
            excites your senses — because good food deserves great moments.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12 py-16 md:py-0">
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            {isLogin ? "Sign In" : "Create Account"}
          </h2>

          <button
            type="button"
            onClick={handleGoogleLoginClick}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 mb-4 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <FcGoogle className="text-xl" />
            <span className="text-sm font-medium text-gray-700">Continue with Google</span>
          </button>

          <div className="flex items-center mb-4">
            <hr className="flex-grow border-gray-200" />
            <span className="mx-3 text-gray-400 text-xs uppercase tracking-wide">or</span>
            <hr className="flex-grow border-gray-200" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4 space-y-4">
              {(isLogin ? filterValue : inputValue).map((value, index) => (
                <div key={index}>
                  <label
                    htmlFor={value.name}
                    className="block text-sm font-medium text-gray-700 mb-1 capitalize"
                  >
                    {value.name}
                  </label>
                  {value.name === "password" ? (
                    <div className="relative">
                      <input
                        id={value.name}
                        name={value.name}
                        value={formData[value.name]}
                        onChange={handleChange}
                        type={value.type}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#E33B32]/40 focus:border-[#E33B32] transition-colors"
                        placeholder={value.placeholder}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                      >
                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
                    </div>
                  ) : (
                    <input
                      id={value.name}
                      name={value.name}
                      value={formData[value.name]}
                      onChange={handleChange}
                      type={value.type}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#E33B32]/40 focus:border-[#E33B32] transition-colors"
                      placeholder={value.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E33B32] text-white py-2.5 rounded-lg font-semibold hover:bg-[#cf312a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#E33B32]/40"
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600 text-sm">
            {isLogin ? "New to our app?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#E33B32] font-medium hover:underline focus:outline-none"
            >
              {isLogin ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>

        <p className="text-xs text-gray-500 mt-6 text-center max-w-md px-4">
          By continuing, you agree to our Terms of Service & Privacy Policy.
        </p>
      </div>
    </div>
  );
}