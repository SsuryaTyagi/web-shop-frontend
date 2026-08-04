// src/components/AdminRoute.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { login } from "../features/pages/auth/services/auth.api.js"; // adjust path to your actual auth.api.js
import { useDispatch } from "react-redux";
import { setUser } from "../features/pages/auth/auth.Slice.js"; // adjust path
import { toast } from "react-toastify";
import { ShieldCheck, ArrowRight, Pizza } from "lucide-react";

export default function AdminRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setFormError("");
    setLoading(true);
    try {
      const res = await login({ email, password });

      if (res.user?.role !== "admin") {
        setFormError("This account does not have admin access.");
        setLoading(false);
        return;
      }

      dispatch(setUser(res.user));
      toast.success("Welcome back, Admin", { toastId: "admin-login-success" });
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      setFormError(msg);
      toast.error(msg, { toastId: "admin-login-error" });
    } finally {
      setLoading(false);
    }
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

            {formError && (
              <p className="text-sm text-red-500 font-medium">{formError}</p>
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