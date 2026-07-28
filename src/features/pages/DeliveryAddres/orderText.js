export const buildOrderText = (cartData) =>
  cartData
    .map(
      (item, i) =>
        `${i + 1}. ${item.name} (${item.selectedSize || "S"}) x${
          item.quantity || 1
        } - ₹${(item.finalPrice || item.price) * (item.quantity || 1)}`
    )
    .join("\n");
