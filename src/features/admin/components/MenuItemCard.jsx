// src/features/admin/components/MenuItemCard.jsx
import React from "react";
import { Edit2, Trash2, Star, CheckCircle, AlertCircle } from "lucide-react";

export default function MenuItemCard({ item, onEdit, onDelete, onToggleStock }) {
  const isVeg = item.isVeg ?? true;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Thumbnail Image Header */}
        <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

          {/* Veg / Non-Veg Indicator Badge */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-200/80 shadow-xs flex items-center gap-1.5 text-[11px] font-bold">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isVeg ? "bg-emerald-500" : "bg-rose-500"
              }`}
            />
            <span className={isVeg ? "text-emerald-700" : "text-rose-700"}>
              {isVeg ? "Veg" : "Non-Veg"}
            </span>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            {item.category}
          </div>

          {/* Popular Tag */}
          {item.isPopular && (
            <div className="absolute bottom-3 left-3 bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide">
              🔥 Popular
            </div>
          )}

          {/* Rating Tag */}
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-slate-900 px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{item.rating || 4.8}</span>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#E33B32] transition-colors">
              {item.name}
            </h4>
          </div>

          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 min-h-[32px]">
            {item.description}
          </p>

          {/* Price Breakdown for S / M / L */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1.5">
              Pricing Options
            </span>
            {item.prices && typeof item.prices === "object" ? (
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200/60">
                  <span className="block text-[10px] font-semibold text-slate-500">Small</span>
                  <span className="block text-xs font-extrabold text-slate-900">
                    ₹{item.prices.Small || item.price}
                  </span>
                </div>
                <div className="bg-amber-50/60 p-1.5 rounded-lg border border-amber-200/60">
                  <span className="block text-[10px] font-bold text-amber-700">Medium</span>
                  <span className="block text-xs font-extrabold text-amber-900">
                    ₹{item.prices.Medium || item.price}
                  </span>
                </div>
                <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200/60">
                  <span className="block text-[10px] font-semibold text-slate-500">Large</span>
                  <span className="block text-xs font-extrabold text-slate-900">
                    ₹{item.prices.Large || item.price}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 p-2 rounded-lg text-center border border-slate-200/60">
                <span className="text-sm font-extrabold text-slate-900">₹{item.price}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-4 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
        {/* Availability Toggle Switch */}
        <button
          onClick={() => onToggleStock(item.id)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
            item.inStock
              ? "bg-emerald-100/70 text-emerald-700 hover:bg-emerald-200"
              : "bg-slate-200 text-slate-600 hover:bg-slate-300"
          }`}
          title="Click to toggle availability stock status"
        >
          {item.inStock ? (
            <>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>In Stock</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
              <span>Out of Stock</span>
            </>
          )}
        </button>

        {/* Edit & Delete Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(item)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 shadow-2xs transition-all"
            title="Edit item"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all"
            title="Delete item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
