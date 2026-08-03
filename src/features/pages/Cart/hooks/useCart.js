import { useSelector, useDispatch } from "react-redux";
import {
  addToCart as addToCartAction,
  updateQuantity as updateQuantityAction,
  deleteFromCart as deleteFromCartAction,
  clearCart as clearCartAction,
} from "../cart.Slice.js";

export default function useCart() {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.items);

  const total = cartData.reduce(
    (acc, item) =>
      acc + (item.finalPrice || item.price || 0) * (item.quantity || 1),
    0
  );

  const addToCart = (item) => dispatch(addToCartAction(item));
  const updateQuantity = (index, newQty) =>
    dispatch(updateQuantityAction({ index, newQty }));
  const deleteFromCart = (index) => dispatch(deleteFromCartAction(index));
  const clearCart = () => dispatch(clearCartAction());

  return {
    cartData,
    addToCart,
    updateQuantity,
    deleteFromCart,
    clearCart,
    total,
  };
}