import { createSlice } from "@reduxjs/toolkit";
import { loadCart } from "./service/cartStorage.js";

const initialState = {
  items: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existingIndex = state.items.findIndex(
        (item) =>
          item._id === newItem._id &&
          item.selectedSize === newItem.selectedSize
      );

      if (existingIndex !== -1) {
        const existing = state.items[existingIndex];
        existing.quantity += 1;
        existing.price =
          (existing.basePrice || existing.price) * existing.quantity;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          basePrice: newItem.price,
        });
      }
    },

    updateQuantity: (state, action) => {
      const { index, newQty } = action.payload;
      const item = state.items[index];
      if (item) {
        item.quantity = newQty;
        item.price = (item.basePrice || item.price) * newQty;
      }
    },

    deleteFromCart: (state, action) => {
      state.items.splice(action.payload, 1);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, deleteFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;