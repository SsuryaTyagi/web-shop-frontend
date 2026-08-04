// src/features/admin/hooks/useAdminAuth.js
import { useSelector, useDispatch } from "react-redux";
import { adminLogin, adminLogout } from "../admin.Slice";

export function useAdminAuth() {
  const dispatch = useDispatch();
  const { isAuthenticated, adminProfile } = useSelector((state) => state.admin);

  const login = (credentials) => {
    dispatch(adminLogin(credentials));
  };

  const logout = () => {
    dispatch(adminLogout());
  };

  return {
    isAuthenticated,
    adminProfile,
    login,
    logout,
  };
}
