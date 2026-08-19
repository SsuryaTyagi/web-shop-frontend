import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAuth from "../hooks/useAuth.js";
import Alert from "../../../shared/components/Alert";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    address: "",
  });

  const { handleRegister, handleLogin, handleGoogleLogin, loading, error, message } =
    useAuth();

  const validate = () => {
    const errors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.password || formData.password.length < 4) {
      errors.password = "Password must be at least 4 characters.";
    }

    if (!isLogin) {
      if (!formData.name?.trim()) {
        errors.name = "Full name is required.";
      }
      if (!formData.number?.trim()) {
        errors.number = "Phone number is required.";
      }
      if (!formData.address?.trim()) {
        errors.address = "Address is required.";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isLogin) {
      await handleLogin({
        email: formData.email,
        password: formData.password,
      });
    } else {
      await handleRegister(formData);
    }
  };

  const handleGoogleLoginClick = () => {
    handleGoogleLogin();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // clear error for modified field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const inputFields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "Enter your full name" },
    { name: "address", label: "Address", type: "text", placeholder: "Enter your delivery address" },
    { name: "number", label: "Phone Number", type: "tel", placeholder: "Enter your phone number" },
    { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email address" },
    {
      name: "password",
      label: "Password",
      type: showPassword ? "text" : "password",
      placeholder: "Enter your password",
    },
  ];

  const activeFields = isLogin
    ? inputFields.filter((f) => f.name === "email" || f.name === "password")
    : inputFields;

  return (
    <div className="min-h-screen flex bg-slate-50 pt-16 sm:pt-20">
      {/* Left Hero Graphic Section */}
      <div className="hidden md:flex w-1/2 bg-[url('https://i.imgur.com/Zf7Xk3Q.png')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-xs" />
        <div className="z-10 text-white p-12 flex flex-col justify-center h-full max-w-lg mx-auto">
          <span className="inline-block bg-[#E33B32] text-white text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4">
            The Pizza Hub
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight mb-4">
            Craving Fresh, Hot Pizza?
          </h1>
          <p className="text-base leading-relaxed text-slate-200 font-medium">
            Bringing you authentic flavors, golden crispy crusts, and unbeatable quality right to your doorstep.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 sm:px-8 py-10 sm:py-16">
        <div className="bg-white shadow-sm border border-slate-200 rounded-3xl p-6 sm:p-10 w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-slate-900">
            {isLogin ? "Sign In" : "Create Account"}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">
            {isLogin
              ? "Welcome back! Please enter your details."
              : "Sign up to track orders and save your favorite pizzas."}
          </p>

          {/* Traditional Alert Message for API error/message */}
          {error && (
            <Alert
              type="error"
              message={typeof error === "string" ? error : "Authentication failed. Please check your credentials."}
              className="mb-6"
            />
          )}
          {message && (
            <Alert type="success" message={message} className="mb-6" />
          )}

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLoginClick}
            className="w-full flex items-center justify-center gap-3 border border-slate-300 rounded-xl py-3 px-4 hover:bg-slate-50 transition-all focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer min-h-[44px]"
          >
            <FcGoogle className="text-2xl shrink-0" />
            <span className="text-sm font-bold text-slate-700">Continue with Google</span>
          </button>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-slate-200" />
            <span className="mx-3 text-slate-400 text-xs uppercase font-extrabold tracking-wider">or</span>
            <hr className="flex-grow border-slate-200" />
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4 mb-6">
              {activeFields.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      type={field.type}
                      placeholder={field.placeholder}
                      className={`w-full bg-white border rounded-xl px-3.5 py-3 outline-none transition-all text-sm min-h-[44px] ${
                        validationErrors[field.name]
                          ? "border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                          : "border-slate-300 focus:ring-2 focus:ring-[#E33B32]/30 focus:border-[#E33B32]"
                      }`}
                    />
                    {field.name === "password" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 p-1.5 rounded-lg focus:outline-none"
                      >
                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
                    )}
                  </div>
                  {validationErrors[field.name] && (
                    <p className="text-xs font-semibold text-red-600 mt-1 flex items-center gap-1">
                      <span>•</span> {validationErrors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E33B32] text-white py-3 rounded-xl font-bold hover:bg-[#cf312a] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-xs focus:outline-none focus:ring-2 focus:ring-[#E33B32]/40 min-h-[44px] text-sm cursor-pointer"
            >
              {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-6 pt-4 border-t border-slate-100">
            <p className="text-sm text-slate-600">
              {isLogin ? "New to The Pizza Hub?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setValidationErrors({});
                }}
                className="text-[#E33B32] font-bold hover:underline focus:outline-none"
              >
                {isLogin ? "Create an account" : "Sign in"}
              </button>
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-6 text-center max-w-sm px-4">
          By signing in, you agree to our Terms of Service & Privacy Policy.
        </p>
      </div>
    </div>
  );
}