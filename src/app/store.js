import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "../features/pages/Home/menu.Slice";
import authSlice from "../features/pages/auth/auth.Slice";
import profileSlice from "../features/pages/Profile/profile.Slice";
import contactSlice from "../features/pages/Contact/contact.Slice";
import cartReducer from "../features/pages/Cart/cart.Slice.js";
import { saveCart } from "../features/pages/Cart/service/cartStorage.js";

export const store = configureStore({
  reducer: {
    menu: menuSlice,
    auth: authSlice,
    profile: profileSlice,
    contact: contactSlice,
    cart: cartReducer,
  },
});



let previousCart = store.getState().cart.items;
store.subscribe(() => {
  const currentCart = store.getState().cart.items;
  if (currentCart !== previousCart) {
    saveCart(currentCart);
    previousCart = currentCart;
  }
});