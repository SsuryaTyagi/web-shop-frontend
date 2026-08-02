import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    message: null,
    success: false,
    loading: false,
    error: null,
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setMessage, setSuccess, setLoading, setError } = contactSlice.actions;
export default contactSlice.reducer;