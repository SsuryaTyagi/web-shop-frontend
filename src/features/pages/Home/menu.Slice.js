import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    popularItem: [],
    menuItem: null,
    data: [],
    loading: true,
    error: null,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setPopularItem: (state, action) => {
      state.popularItem = action.payload;
    },
    setMenuItem: (state, action) => {
      state.menuItem = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setData, setLoading, setError, setMenuItem,setPopularItem } = menuSlice.actions;

export default menuSlice.reducer;
