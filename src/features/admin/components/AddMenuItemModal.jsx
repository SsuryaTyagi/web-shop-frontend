// src/features/admin/components/AddMenuItemModal.jsx
import React, { useState, useEffect } from "react";
import { X, Upload, Sparkles, Check } from "lucide-react";

export default function AddMenuItemModal({ isOpen, onClose, onSave, itemToEdit = null }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "Pizza",
    description: "",
    image: "",
    priceSmall: "",
    priceMedium: "",
    priceLarge: "",
    isVeg: true,
    isPopular: false,
  });

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        id: itemToEdit.id || "",
        name: itemToEdit.name || "",
        category: itemToEdit.category || "Pizza",
        description: itemToEdit.description || "",
        image: itemToEdit.image || "",
        priceSmall: itemToEdit.prices?.Small || itemToEdit.price || "",
        priceMedium: itemToEdit.prices?.Medium || itemToEdit.price || "",
        priceLarge: itemToEdit.prices?.Large || itemToEdit.price || "",
        isVeg: itemToEdit.isVeg !== undefined ? itemToEdit.isVeg : true,
        isPopular: itemToEdit.isPopular || false,
      });
    } else {
      setFormData({
        id: "",
        name: "",
        category: "Pizza",
        description: "",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80",
        priceSmall: "299",
        priceMedium: "449",
        priceLarge: "599",
        isVeg: true,
        isPopular: false,
      });
    }
  }, [itemToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const payload = {
      id: formData.id || undefined,
      name: formData.name,
      category: formData.category,
      description: formData.description,
      image: formData.image || "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80",
      prices: {
        Small: Number(formData.priceSmall) || 0,
        Medium: Number(formData.priceMedium) || 0,
        Large: Number(formData.priceLarge) || 0,
      },
      price: Number(formData.priceMedium) || 0,
      isVeg: formData.isVeg,
      isPopular: formData.isPopular,
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <h3 className="font-bold text-base flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>{itemToEdit ? "Edit Menu Item" : "Add New Menu Item"}</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Item Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Tuscan Truffle Delight"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E33B32]/30 focus:border-[#E33B32]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E33B32]/30 focus:border-[#E33B32]"
              >
                <option value="Pizza">Pizza</option>
                <option value="Sides">Sides</option>
                <option value="Beverages">Beverages</option>
                <option value="Desserts">Desserts</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Dietary Preference *
              </label>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                  <input
                    type="radio"
                    name="dietType"
                    checked={formData.isVeg}
                    onChange={() => setFormData({ ...formData, isVeg: true })}
                    className="accent-emerald-600 w-4 h-4"
                  />
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Vegetarian
                  </span>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                  <input
                    type="radio"
                    name="dietType"
                    checked={!formData.isVeg}
                    onChange={() => setFormData({ ...formData, isVeg: false })}
                    className="accent-rose-600 w-4 h-4"
                  />
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    Non-Veg
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Image URL
            </label>
            <div className="relative">
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E33B32]/30 focus:border-[#E33B32]"
              />
              <Upload className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide a delicious item summary..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E33B32]/30 focus:border-[#E33B32]"
            />
          </div>

          {/* Pricing inputs for Small / Medium / Large */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Prices (₹) for Sizes
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <span className="block text-[11px] text-slate-500 mb-1">Small</span>
                <input
                  type="number"
                  value={formData.priceSmall}
                  onChange={(e) => setFormData({ ...formData, priceSmall: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E33B32]/30"
                />
              </div>
              <div>
                <span className="block text-[11px] font-bold text-amber-600 mb-1">Medium</span>
                <input
                  type="number"
                  value={formData.priceMedium}
                  onChange={(e) => setFormData({ ...formData, priceMedium: e.target.value })}
                  className="w-full px-3 py-2 bg-amber-50/70 border border-amber-200 rounded-xl text-xs font-bold text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>
              <div>
                <span className="block text-[11px] text-slate-500 mb-1">Large</span>
                <input
                  type="number"
                  value={formData.priceLarge}
                  onChange={(e) => setFormData({ ...formData, priceLarge: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E33B32]/30"
                />
              </div>
            </div>
          </div>

          {/* Popular Switch */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="block font-bold text-xs text-slate-800">Highlight as Popular</span>
              <span className="text-[11px] text-slate-400">
                Displays 🔥 Popular badge on menu cards
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPopular}
                onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E33B32]"></div>
            </label>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#E33B32] hover:bg-[#c83129] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{itemToEdit ? "Update Item" : "Save Menu Item"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
