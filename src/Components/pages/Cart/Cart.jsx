import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../data/Context";
import { FiMinusCircle } from "react-icons/fi";
import { MdOutlineAddCircleOutline } from "react-icons/md";

export default function Cart() {
  const {
    cartData,
    setCartData,
    user,
    clearCart,
    deleteFromCart,
    updateQuantity,
  } = useContext(MyContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        number: user.number || "",
        address:user.address || ""
      });
    }
  }, [user]);

  // ✅ Delete item
  const removeItem = (index) => {
    const updatedCart = [...cartData];
    updatedCart.splice(index, 1);
    setCartData(updatedCart);
  };

  // ✅ Total price (size + quantity ke hisaab se)
  const total = cartData.reduce(
    (acc, item) =>
      acc + (item.finalPrice || item.price || 0) * (item.quantity || 1),
    0
  );

  // ✅ Handle Order
  const handleOrder = () => {
    if (cartData.length === 0) return alert("Cart is empty!");
    const { name, email, number, address } = formData;

    if (!name || !email || !number || !address)
      return alert("Please fill all the details!");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return alert("Please enter a valid email address!");

    const numberRegex = /^0?[6-9]\d{9}$/;
    if (!numberRegex.test(number))
      return alert("Please enter a valid 10-digit WhatsApp number!");

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    //  Get customer location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

        const orderText = cartData
          .map(
            (item, i) =>
              `${i + 1}.${String(item.name || "").trim()}
(${item.selectedSize || "S"}) x${item.quantity || 1} - ₹${
                (item.finalPrice || item.price) * (item.quantity || 1)
              }`
          )
          .join("\n");

        const message = encodeURIComponent(`🛒 New Order
Name: ${String(name || "").trim()}
number: ${String(number || "").trim()}
Email: ${String(email || "").trim()}
Address: ${String(address || "").trim()}
Location:${locationUrl}
--------------------------------
${orderText}
--------------------------------
Total: ₹${total}`);

        const ownerNumber = "8529503358";
        const customerNumber = String(number || "").replace(/^0+/, "91");

        // Send order to owner
        window.open(`https://wa.me/${ownerNumber}?text=${message}`, "_blank");

        window.addEventListener("blur", () => {
  console.log("User went to WhatsApp");
   clearCart();
});

        // Send confirmation to customer
        const confirmMsg = encodeURIComponent(`Hello ${name},
Thank you for your order!
We have received your request:
${orderText}

Total: ₹${total}
We’ll contact you soon.
Your location: ${locationUrl}`);
        window.open(
          `https://wa.me/${customerNumber}?text=${confirmMsg}`,
          "_blank"
        );

       
      },
      (error) => {
        alert(
          "Could not get your location. Please allow location access in your browser."
        );
      }
    );
  };

  return (
    <div className="w-screen flex justify-center">
      <div className="p-6 pt-32 w-[95vw] min-h-[70vh] ">
        <h2 className="text-2xl font-bold mb-4">🛍 Your Cart</h2>
        {cartData.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {/* ✅ Cart Items */}
            {cartData.map((item, i) => (
              <div
                key={i}
                className="border p-3 mb-3 rounded-md shadow-sm flex justify-between items-center"
              >
                <div>
                  <span className="font-bold">{item.name}</span>
                  <p className="text-sm text-gray-600">
                    Size: {item.selectedSize || "S"} | ₹
                    {item.finalPrice || item.price}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="text-gray-500"
                      onClick={() =>
                        updateQuantity(i, (cartData[i].quantity || 1) - 1)
                      }
                    >
                      <FiMinusCircle fontSize={30} />
                    </button>
                    <span className="font-bold text-[20px] text-green-500">
                      {item.quantity || 1}
                    </span>
                    <button
                      className="text-green-500"
                      onClick={() =>
                        updateQuantity(i, (cartData[i].quantity || 1) + 1)
                      }
                    >
                      <MdOutlineAddCircleOutline fontSize={30} />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <b>
                    ₹{(item.finalPrice || item.price) * (item.quantity || 1)}
                  </b>
                  <button
                    className="block bg-red-700 font-bold p-2 rounded-2xl text-white text-sm mt-1 hover:underline"
                    onClick={() => deleteFromCart(i)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {/* ✅ Total */}
            <h3 className="text-xl font-bold mt-3">Total: ₹{total}</h3>

            {/* ✅ Form */}
            <div className="mt-5 space-y-2">
              <input
                className="border p-2 w-full rounded"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                className="border p-2 w-full rounded"
                type="email"
                value={formData.email}
                placeholder="Your Email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                className="border p-2 w-full rounded"
                type="text"
                placeholder="Your number (WhatsApp)"
                value={formData.number}
                onChange={(e) =>
                  setFormData({ ...formData, number: e.target.value })
                }
              />
              <textarea
                className="border p-2 w-full rounded"
                placeholder="Your Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              ></textarea>
            </div>

            {/* ✅ Confirm Order Button */}
            <button
              className="bg-green-600 text-white px-6 py-3 rounded-lg mt-5 w-full"
              onClick={handleOrder}
            >
              Confirm Order via WhatsApp
            </button>
          </>
        )}
      </div>
    </div>
  );
}
