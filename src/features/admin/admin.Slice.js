// src/features/admin/admin.Slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminApi } from "./services/admin.api";

export const fetchAdminData = createAsyncThunk(
  "admin/fetchAdminData",
  async () => {
    const data = await adminApi.getInitialData();
    return data;
  }
);

export const updateOrderStatusThunk = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ orderId, newStatus }) => {
    const res = await adminApi.updateOrderStatus(orderId, newStatus);
    return res;
  }
);

export const saveMenuItemThunk = createAsyncThunk(
  "admin/saveMenuItem",
  async (itemData) => {
    const updatedMenuItems = await adminApi.saveMenuItem(itemData);
    return updatedMenuItems;
  }
);

export const deleteMenuItemThunk = createAsyncThunk(
  "admin/deleteMenuItem",
  async (itemId) => {
    await adminApi.deleteMenuItem(itemId);
    return itemId;
  }
);

export const toggleItemAvailabilityThunk = createAsyncThunk(
  "admin/toggleItemAvailability",
  async (itemId) => {
    await adminApi.toggleItemAvailability(itemId);
    return itemId;
  }
);

export const toggleUserStatusThunk = createAsyncThunk(
  "admin/toggleUserStatus",
  async (userId) => {
    await adminApi.toggleUserStatus(userId);
    return userId;
  }
);

export const markMessageReadThunk = createAsyncThunk(
  "admin/markMessageRead",
  async (messageId) => {
    await adminApi.markMessageRead(messageId);
    return messageId;
  }
);

export const deleteMessageThunk = createAsyncThunk(
  "admin/deleteMessage",
  async (messageId) => {
    await adminApi.deleteMessage(messageId);
    return messageId;
  }
);

export const resetDemoDataThunk = createAsyncThunk(
  "admin/resetDemoData",
  async () => {
    const resetData = await adminApi.resetDemoData();
    return resetData;
  }
);

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: true, // Default true for smooth demo experience
  stats: {
    totalOrdersToday: 0,
    totalOrdersChange: 0,
    revenueToday: 0,
    revenueChange: 0,
    pendingOrders: 0,
    pendingChange: 0,
    totalUsers: 0,
    usersChange: 0,
    revenue7Days: [],
  },
  popularItems: [],
  orders: [],
  menuItems: [],
  users: [],
  messages: [],
  adminProfile: {
    name: "Chef Marco V.",
    role: "General Operations Manager",
    email: "admin@pizzahub.com",
    avatar: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&auto=format&fit=crop&q=80",
    isLoggedIn: true,
  },
  filters: {
    orderStatus: "All",
    orderDateRange: "All",
    orderSearchQuery: "",
    menuCategory: "All",
    menuSearchQuery: "",
    userSearchQuery: "",
    messageFilter: "All",
  },
  sidebarCollapsed: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setOrderStatusFilter: (state, action) => {
      state.filters.orderStatus = action.payload;
    },
    setOrderDateRangeFilter: (state, action) => {
      state.filters.orderDateRange = action.payload;
    },
    setOrderSearchQuery: (state, action) => {
      state.filters.orderSearchQuery = action.payload;
    },
    setMenuCategoryFilter: (state, action) => {
      state.filters.menuCategory = action.payload;
    },
    setMenuSearchQuery: (state, action) => {
      state.filters.menuSearchQuery = action.payload;
    },
    setUserSearchQuery: (state, action) => {
      state.filters.userSearchQuery = action.payload;
    },
    setMessageFilter: (state, action) => {
      state.filters.messageFilter = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
    adminLogin: (state, action) => {
      state.isAuthenticated = true;
      if (action.payload) {
        state.adminProfile = { ...state.adminProfile, ...action.payload, isLoggedIn: true };
      }
    },
    adminLogout: (state) => {
      state.isAuthenticated = false;
      state.adminProfile.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminData.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.popularItems = action.payload.popularItems;
        state.orders = action.payload.orders;
        state.menuItems = action.payload.menuItems;
        state.users = action.payload.users;
        state.messages = action.payload.messages;
        if (action.payload.adminProfile) {
          state.adminProfile = action.payload.adminProfile;
        }
      })
      .addCase(fetchAdminData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        const { orderId, newStatus, pendingCount } = action.payload;
        const targetOrder = state.orders.find((o) => o.id === orderId);
        if (targetOrder) {
          targetOrder.status = newStatus;
        }
        state.stats.pendingOrders = pendingCount;
      })
      .addCase(saveMenuItemThunk.fulfilled, (state, action) => {
        state.menuItems = action.payload;
      })
      .addCase(deleteMenuItemThunk.fulfilled, (state, action) => {
        state.menuItems = state.menuItems.filter((m) => m.id !== action.payload);
      })
      .addCase(toggleItemAvailabilityThunk.fulfilled, (state, action) => {
        const target = state.menuItems.find((m) => m.id === action.payload);
        if (target) {
          target.inStock = !target.inStock;
        }
      })
      .addCase(toggleUserStatusThunk.fulfilled, (state, action) => {
        const target = state.users.find((u) => u.id === action.payload);
        if (target) {
          target.isVerified = !target.isVerified;
        }
      })
      .addCase(markMessageReadThunk.fulfilled, (state, action) => {
        const target = state.messages.find((m) => m.id === action.payload);
        if (target) {
          target.isRead = true;
        }
      })
      .addCase(deleteMessageThunk.fulfilled, (state, action) => {
        state.messages = state.messages.filter((m) => m.id !== action.payload);
      })
      .addCase(resetDemoDataThunk.fulfilled, (state, action) => {
        state.stats = action.payload.stats;
        state.popularItems = action.payload.popularItems;
        state.orders = action.payload.orders;
        state.menuItems = action.payload.menuItems;
        state.users = action.payload.users;
        state.messages = action.payload.messages;
      });
  },
});

export const {
  setOrderStatusFilter,
  setOrderDateRangeFilter,
  setOrderSearchQuery,
  setMenuCategoryFilter,
  setMenuSearchQuery,
  setUserSearchQuery,
  setMessageFilter,
  toggleSidebar,
  setSidebarCollapsed,
  adminLogin,
  adminLogout,
} = adminSlice.actions;

export default adminSlice.reducer;
