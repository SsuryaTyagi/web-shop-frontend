import { login, register, getMe, googleLogin } from "../services/auth.api.js";
import { setMessage, setUser, setError, setLoading } from "../auth.Slice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function useAuth() {
  const dispatch = useDispatch();
  const { user, message, loading, error } = useSelector((state) => state.auth);

  const handleRegister = async (userData) => {
    try {
      dispatch(setLoading(true));
      const res = await register(userData);
      dispatch(setMessage(res.message));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogin = async (userData) => {
    try {
      dispatch(setLoading(true));
      const res = await login(userData);
      dispatch(setMessage(res.message));
      dispatch(setUser(res));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetMe = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getMe();
      dispatch(setUser(res.user));
    } catch (error) {
      dispatch(setError(error));
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
    }
  };
useEffect(()=>{
    handleGetMe()
})
  return {
    handleRegister,
    handleLogin,
    handleGetMe,
    handleGoogleLogin,
    user,
    loading,
    error,
    message,
  };
}