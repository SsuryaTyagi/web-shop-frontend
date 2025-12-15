export const sendWhatsAppMessage = (number, message) => {
  window.open(
    `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};
