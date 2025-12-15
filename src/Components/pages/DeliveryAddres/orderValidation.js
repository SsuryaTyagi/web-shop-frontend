export const validateForm = (formData, cartData) => {
  const { name, email, number, address } = formData;

  if (cartData.length === 0) return "Cart is empty!";
  if (!name || !email || !number || !address)
    return "Please fill all the details!";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Please enter a valid email address!";

  if (!/^0?[6-9]\d{9}$/.test(number))
    return "Please enter a valid 10-digit WhatsApp number!";

  return null;
};
