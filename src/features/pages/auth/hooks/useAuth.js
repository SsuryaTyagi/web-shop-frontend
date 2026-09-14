import {
  login,
  register,
  getMe,
  googleLogin,
  logout,
} from "../services/auth.api.js";
import { setMessage, setUser, setError, setLoading } from "../auth.Slice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, message, loading, error } = useSelector((state) => state.auth);

  // Handle Register
  const handleRegister = async (userData) => {
    try {
      dispatch(setLoading(true));
      const res = await register(userData);
      dispatch(setMessage(res.message));
      toast.success(res.message, { toastId: "register-success" });
    } catch (error) {
      const errMsg = error?.response?.data?.message || error?.message || "Registration failed";
      dispatch(setError(errMsg));
      toast.error(errMsg, { toastId: "register-error" });
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Handle Login
  const handleLogin = async (userData) => {
    try {
      dispatch(setLoading(true));
      const res = await login(userData);

      dispatch(setMessage(res.message));
      dispatch(setUser(res.user ?? null));
      toast.success(res.message, { toastId: "login-success" });
      navigate("/");
    } catch (error) {
      const errMsg = error?.response?.data?.message || error?.message || "Login failed";
      dispatch(setError(errMsg));
      toast.error(errMsg, { toastId: "login-error" });
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Handle Get User
  const handleGetMe = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getMe();
      dispatch(setUser(res.user));
    } catch (error) {
      const errMsg = error?.response?.data?.message || error?.message || "Failed to fetch user";
      dispatch(setError(errMsg));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
    } catch (error) {
      const errMsg = error?.message || "Google login failed";
      dispatch(setError(errMsg));
      toast.error(errMsg, { toastId: "google-login-error" });
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      const res = await logout();
      dispatch(setMessage(res.message));
      dispatch(setUser(null));
      toast.success(res.message, { toastId: "logout-success" });
      navigate("/");
    } catch (error) {
      const errMsg = error?.response?.data?.message || error?.message || "Logout failed";
      dispatch(setError(errMsg));
      toast.error(errMsg, { toastId: "logout-error" });
    } finally {
      dispatch(setLoading(false));
    }
  };

 useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    localStorage.setItem("token", token);
    window.history.replaceState({}, document.title, window.location.pathname);
    handleGetMe(); 
  } else {
    handleGetMe();
  }
}, []);

  return {
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout,
    handleGoogleLogin,
    user,
    loading,
    error,
    message,
  };
}