// src/features/admin/hooks/useAdminMenu.js
import { useSelector, useDispatch } from "react-redux";
import {
  setMenuCategoryFilter,
  setMenuSearchQuery,
  saveMenuItemThunk,
  deleteMenuItemThunk,
  toggleItemAvailabilityThunk,
} from "../admin.Slice";

export function useAdminMenu() {
  const dispatch = useDispatch();
  const { menuItems, filters, loading } = useSelector((state) => state.admin);

  const categoryFilter = filters.menuCategory;
  const searchQuery = filters.menuSearchQuery;

  const categories = ["All", "Pizza", "Sides", "Beverages", "Desserts"];

  const filteredMenuItems = menuItems.filter((item) => {
    // Category Filter
    if (categoryFilter !== "All" && item.category.toLowerCase() !== categoryFilter.toLowerCase()) {
      return false;
    }

    // Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(query);
      const matchDesc = item.description?.toLowerCase().includes(query);
      if (!matchName && !matchDesc) return false;
    }

    return true;
  });

  const setCategory = (cat) => {
    dispatch(setMenuCategoryFilter(cat));
  };

  const setSearch = (query) => {
    dispatch(setMenuSearchQuery(query));
  };

  const saveItem = (itemData) => {
    return dispatch(saveMenuItemThunk(itemData));
  };

  const deleteItem = (itemId) => {
    return dispatch(deleteMenuItemThunk(itemId));
  };

  const toggleAvailability = (itemId) => {
    return dispatch(toggleItemAvailabilityThunk(itemId));
  };

  return {
    menuItems: filteredMenuItems,
    allMenuItems: menuItems,
    categories,
    categoryFilter,
    searchQuery,
    loading,
    setCategory,
    setSearch,
    saveItem,
    deleteItem,
    toggleAvailability,
  };
}
