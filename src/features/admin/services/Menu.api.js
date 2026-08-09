// src/features/admin/services/menu.api.js
import { getStoredData, saveStoredData } from "./admin.api.js";

export async function saveMenuItem(itemData) {
  return new Promise((resolve) => {
    const data = getStoredData();
    if (itemData.id) {
      data.menuItems = data.menuItems.map((m) =>
        m.id === itemData.id ? { ...m, ...itemData } : m
      );
    } else {
      const newItem = {
        ...itemData,
        id: `m_${Date.now()}`,
        rating: 4.8,
        inStock: true,
      };
      data.menuItems.unshift(newItem);
    }
    saveStoredData(data);
    setTimeout(() => resolve(data.menuItems), 100);
  });
}

export async function deleteMenuItem(itemId) {
  return new Promise((resolve) => {
    const data = getStoredData();
    data.menuItems = data.menuItems.filter((m) => m.id !== itemId);
    saveStoredData(data);
    setTimeout(() => resolve(itemId), 100);
  });
}

export async function toggleItemAvailability(itemId) {
  return new Promise((resolve) => {
    const data = getStoredData();
    data.menuItems = data.menuItems.map((m) =>
      m.id === itemId ? { ...m, inStock: !m.inStock } : m
    );
    saveStoredData(data);
    setTimeout(() => resolve(itemId), 100);
  });
}