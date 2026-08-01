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

  const handleRegister = async (userData) => {
    try {
      dispatch(setLoading(true));
      const res = await register(userData);
      dispatch(setMessage(res.message));
      toast.success(message);
    } catch (error) {
      dispatch(setError(error));
      toast.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogin = async (userData) => {
    try {
      dispatch(setLoading(true));
      const res = await login(userData);
      console.log(res);
      
      dispatch(setMessage(res.message));
      dispatch(setUser(res));
      toast.success(message);
      navigate("/");
    } catch (error) {
      dispatch(setError(error));
      toast.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetMe = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getMe();
      dispatch(setUser(res.user));
      toast.success(message);
    } catch (error) {
      dispatch(setError(error));
      toast.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleLogin = (isLogin) => {
    try {
      const mode = isLogin ? "login" : "register";
      googleLogin(mode);
    } catch (error) {
      dispatch(setError(error.message || "Google login failed"));
      toast.error(error);
    }
  };
  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      const res = await logout();
      await handleGetMe();
      navigate("/");
      dispatch(setMessage(res.message));
      toast.success(message);
    } catch (error) {
      dispatch(setError(error));
      toast.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    handleGetMe();
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
