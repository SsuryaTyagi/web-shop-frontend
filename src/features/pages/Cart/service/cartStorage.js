const CART_KEY = "cartData";

export const loadCart = () => {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error parsing cart data:", error);
    return [];
  }
};

export const saveCart = (cartData) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cartData));
  } catch (error) {
    console.error("Error saving cart data:", error);
  }
};