import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {
    SetOrder: (state, action) => {
      state.order = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {setOrder, setError, setLoading}= profileSlice.actions;
export default profileSlice.reducer


