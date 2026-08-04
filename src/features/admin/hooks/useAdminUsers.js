// src/features/admin/hooks/useAdminUsers.js
import { useSelector, useDispatch } from "react-redux";
import { setUserSearchQuery, toggleUserStatusThunk } from "../admin.Slice";

export function useAdminUsers() {
  const dispatch = useDispatch();
  const { users, filters, loading } = useSelector((state) => state.admin);

  const searchQuery = filters.userSearchQuery;

  const filteredUsers = users.filter((user) => {
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const matchName = user.name.toLowerCase().includes(query);
      const matchEmail = user.email.toLowerCase().includes(query);
      const matchPhone = user.phone.toLowerCase().includes(query);
      if (!matchName && !matchEmail && !matchPhone) return false;
    }
    return true;
  });

  const setSearch = (query) => {
    dispatch(setUserSearchQuery(query));
  };

  const toggleVerification = (userId) => {
    dispatch(toggleUserStatusThunk(userId));
  };

  return {
    users: filteredUsers,
    totalUsersCount: users.length,
    searchQuery,
    loading,
    setSearch,
    toggleVerification,
  };
}
