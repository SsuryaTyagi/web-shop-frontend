// src/features/admin/services/messages.api.js
import { getStoredData, saveStoredData } from "./localStorageStore";

export async function markMessageRead(messageId) {
  return new Promise((resolve) => {
    const data = getStoredData();
    data.messages = data.messages.map((msg) =>
      msg.id === messageId ? { ...msg, isRead: true } : msg
    );
    saveStoredData(data);
    setTimeout(() => resolve(messageId), 100);
  });
}

export async function deleteMessage(messageId) {
  return new Promise((resolve) => {
    const data = getStoredData();
    data.messages = data.messages.filter((msg) => msg.id !== messageId);
    saveStoredData(data);
    setTimeout(() => resolve(messageId), 100);
  });
}