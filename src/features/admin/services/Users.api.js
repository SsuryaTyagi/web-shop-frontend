// src/features/admin/services/users.api.js
import { getStoredData, saveStoredData } from "./localStorageStore";

export async function toggleUserStatus(userId) {
  return new Promise((resolve) => {
    const data = getStoredData();
    data.users = data.users.map((u) =>
      u.id === userId ? { ...u, isVerified: !u.isVerified } : u
    );
    saveStoredData(data);
    setTimeout(() => resolve(userId), 100);
  });
}