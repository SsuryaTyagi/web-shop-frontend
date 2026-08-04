// src/features/admin/pages/MenuManager.jsx
import React, { useState } from "react";
import { useAdminMenu } from "../hooks/useAdminMenu";
import MenuItemCard from "../components/MenuItemCard";
import AddMenuItemModal from "../components/AddMenuItemModal";
import { Plus, Search, UtensilsCrossed, Sparkles } from "lucide-react";

export default function MenuManager() {
  const {
    menuItems,
    allMenuItems,
    categories,
    categoryFilter,
    searchQuery,
    setCategory,
    setSearch,
    saveItem,
    deleteItem,
    toggleAvailability,
  } = useAdminMenu();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      deleteItem(itemId);
    }
  };

  const handleSaveItem = (itemPayload) => {
    saveItem(itemPayload);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Menu Management
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage food catalog, sizes & pricing, stock availability, and special highlights.
          </p>
        </div>

        {/* Add New Item Button */}
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-[#E33B32] hover:bg-[#c83129] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-[#E33B32]/25 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Item</span>
        </button>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => {
              const isActive = categoryFilter.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items by name or description..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E33B32]/20 focus:border-[#E33B32]"
            />
          </div>
        </div>
      </div>

      {/* Grid of Menu Item Cards */}
      {menuItems.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-100">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <h4 className="text-base font-bold text-slate-800">No menu items found</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            No menu items match your active category or search term. Try resetting your search filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              onToggleStock={toggleAvailability}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <AddMenuItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        itemToEdit={editingItem}
      />
    </div>
  );
}
