import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "payment",
  initialState: {
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCurrentOrder, setLoading, setError } = orderSlice.actions;

export default orderSlice.reducer;
