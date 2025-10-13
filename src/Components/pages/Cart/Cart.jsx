import React, { useContext, useState } from "react";
import { MyContext } from "../../Context";

export default function Cart() {
  const { cartData, clearCart } = useContext(MyContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const total = cartData.reduce((acc, item) => acc + item.price, 0);

  const handleOrder = () => {
    if (cartData.length === 0) return alert("Cart is empty!");
    const { name, email, phone, address } = formData;

    if (!name || !email || !phone || !address)
  return alert("⚠️ Please fill all the details!");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return alert("❌ Please enter a valid email address!");
}

const phoneRegex = /^[6-9]\d{9}$/; // Indian 10-digit number (6–9 se start)
if (!phoneRegex.test(phone)) {
  return alert("❌ Please enter a valid 10-digit WhatsApp number!");
}


const orderText = cartData
  .map((item, i) => `${i + 1}. ${item.name.trim()} - ₹${item.finalPrice || item.price}`)
  .join("\n");  // normal new line

const message = encodeURIComponent(`🛒 New Order
Name: ${name.trim()}
Phone: ${phone.trim()}
Email: ${email.trim()}
Address: ${address.trim()}
--------------------------------
${orderText}
--------------------------------
Total: ₹${total}`);


    // 🔹 Owner ka number
    const ownerNumber = "8529503358"; // apna WhatsApp number
    // 🔹 Customer ka number
    const customerNumber = phone.replace(/^0+/, "91");

    // Send message to owner
    window.open(`https://wa.me/${ownerNumber}?text=${message}`, "_blank");

    // Send confirmation to customer
    const confirmMsg = `Hello ${name},%0AThank you for your order!%0AWe have received your request:%0A${orderText}%0A%0ATotal: ₹${total}%0AWe’ll contact you soon.`;
    window.open(`https://wa.me/${customerNumber}?text=${confirmMsg}`, "_blank");

    clearCart();
  };

  return (
    <div className="p-6 pt-22 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">🛍 Your Cart</h2>
      {cartData.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartData.map((item, i) => (
            <div key={i} className="border p-2 mb-2 rounded-md">
              <span>{item.name}</span> <b>₹{item.price}</b>
            </div>
          ))}

          <h3 className="text-xl font-bold mt-3">Total: ₹{total}</h3>

          <div className="mt-5 space-y-2">
            <input
              className="border p-2 w-full rounded"
              type="text"
              placeholder="Your Name"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              className="border p-2 w-full rounded"
              type="email"
              placeholder="Your Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              className="border p-2 w-full rounded"
              type="text"
              placeholder="Your Phone (WhatsApp)"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <textarea
              className="border p-2 w-full rounded"
              placeholder="Your Address"
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            ></textarea>
          </div>

          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg mt-5 w-full"
            onClick={handleOrder}
          >
            Confirm Order via WhatsApp
          </button>
        </>
      )}
    </div>
  );
}
