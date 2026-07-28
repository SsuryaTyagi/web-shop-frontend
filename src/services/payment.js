import axios from "axios";
import { BASE_URL } from "../features/data/Api";

// ─── CREATE ORDER ──────────────────────────────────────────
export const createOrder = async (amount) => {
  const res = await axios.post(
    `${BASE_URL}/api/payment/create-order`,
    { amount },
    { withCredentials: true }
  );
  return res.data;
};

// ─── VERIFY PAYMENT ───────────────────────────────────────
export const verifyPayment = async (paymentData) => {
  const res = await axios.post(
    `${BASE_URL}/api/payment/verify`,
    paymentData,
    { withCredentials: true }
  );
  return res.data;
};

// ─── SAVE ORDER ───────────────────────────────────────────
export const saveOrder = async (orderData) => {
  const res = await axios.post(
    `${BASE_URL}/create`,
    orderData,
    { withCredentials: true }
  );
  return res.data;
};