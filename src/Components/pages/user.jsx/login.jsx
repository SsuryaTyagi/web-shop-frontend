import { useContext, useState } from "react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi"; 
import { MyContext } from "../../data/Context";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false); 

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    address:""
  });

  const { signup,login,msg } = useContext(MyContext);

  // ✅ Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
  if (isLogin) {
    // console.log("Logging in:", formData);
    await login({
      email: formData.email,
      password: formData.password,
    });
  } else {
    console.log("Registering:", formData);
    await signup(formData);
  }
   
    setFormData({   
    name: "",
    number: "",
    email: "",
    password: "",
    address:""
  }
    )
  };

  //  Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name.toLowerCase()]: e.target.value });
  };

  //  Inputs
  const inputValue = [
    { name: "name", type: "text", placeholder: "Enter your Name" },
    { name: "address", type: "address", placeholder: "Enter your address" },
    { name: "number", type: "phone no", placeholder: "Enter your Phone No." },
    { name: "email", type: "email", placeholder: "Enter your Email" },
    { name: "password", type: showPassword ? "text" : "password", placeholder: "Enter your Password" },
  ];

  //  Login form ke liye sirf email & password
  const filterValue = inputValue.filter(
    (value) => value.name === "email" || value.name === "password"
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 bg-[url('https://i.imgur.com/Zf7Xk3Q.png')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="z-10 text-white p-10 flex flex-col justify-center h-full">
          <h1 className="text-4xl font-bold mb-4">Welcome to The Pizza Hub 🍕</h1>
          <p className="text-lg leading-relaxed">
            Bringing you flavors that comfort the soul and freshness that excites your senses — 
            because good food deserves great moments.
          </p>
        </div>
      </div>

      {/*  Right Section  */}
      <div className="w-full mt-20 md:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            {isLogin ? "Sign In" : "Create Account"}
          </h2>

          {/* Google Button */}
          <button className="w-full flex items-center justify-center border rounded-lg py-2 mb-4 hover:bg-gray-100 transition">
            <FcGoogle className="text-2xl mr-2" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center mb-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
             <p className="mb-1 text-2xl">{msg}</p>
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4 space-y-4">
              {(isLogin ? filterValue : inputValue).map((value, index) => (
                <div key={index}>
                  <label className="block text-gray-700 mb-1 capitalize">{value.name}</label>
                  {value.name === "password" ? (
                    <div className="relative">
                      <input
                        name={value.name}
                        value={formData[value.name]}
                        onChange={handleChange}
                        type={value.type}
                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder={value.placeholder}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
                      >
                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                      </span>
                    </div>
                  ) : (
                    <input
                      name={value.name}
                      value={formData[value.name]}
                      onChange={handleChange}
                      type={value.type}
                      className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder={value.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#E33B32] text-white py-2 rounded-lg hover:bg-[#cf312a] transition"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          {/* Toggle Between Sign In / Up */}
          <p className="text-center mt-6 text-gray-600 text-sm">
            {isLogin ? "New to our app?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-500 font-medium hover:underline"
            >
              {isLogin ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>

        <p className="text-xs text-gray-500 mt-8">
          By continuing, you agree to our Terms of Service & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
