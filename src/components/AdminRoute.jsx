// src/components/AdminRoute.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import  useAuth  from "../features/pages/auth/hooks/useAuth.js"; 
import { useDispatch } from "react-redux";
import { setUser } from "../features/pages/auth/auth.Slice.js"; // adjust path
import { toast } from "react-toastify";
import { ShieldCheck, ArrowRight, Pizza } from "lucide-react";

export default function AdminRoute({ children }) {
const {handleLogin, user, loading, messages, error} = useAuth();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleAdminLogin = async (e) => {
    e.preventDefault();

   await handleLogin({ email, password })

      if (user?.role !== "admin") {
        toast.error("This account does not have admin access.", { toastId: "admin-login-error" }  );
        return;
      }

      toast.success("Welcome back, Admin", { toastId: "admin-login-success" });
  };


  // Not logged in, or logged in but not an admin → show login form
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-slate-100">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 bg-[#E33B32]/10 text-[#E33B32] rounded-2xl flex items-center justify-center mb-3">
              <Pizza className="w-9 h-9" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">The Pizza Hub</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Admin Operational Dashboard</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-3 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E33B32]/20 focus:border-[#E33B32]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-3 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E33B32]/20 focus:border-[#E33B32]"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#E33B32] hover:bg-[#c83129] active:bg-[#b02b23] disabled:opacity-60 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? "Signing in..." : "Login as Admin"}</span>
              {!loading && <ArrowRight className="w-4 h-4 ml-1" />}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return children;
}