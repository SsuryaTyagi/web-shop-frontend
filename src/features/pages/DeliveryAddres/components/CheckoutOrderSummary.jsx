import React from "react";
import { ShoppingBag, ShieldCheck, Tag } from "lucide-react";

export default function CheckoutOrderSummary({ cartData = [], total = 0, deliveryFee = 0 }) {
  const finalTotal = total + deliveryFee;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm sticky top-28 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-[#E33B32]" />
          Order Summary
        </h2>
        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
          {cartData.length} {cartData.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      {/* Cart Items List */}
      <div className="max-h-72 overflow-y-auto pr-1 space-y-3 divide-y divide-slate-50">
        {cartData.map((item, index) => {
          const itemPrice = item.finalPrice || item.price || 0;
          const itemTotal = itemPrice * (item.quantity || 1);

          return (
            <div key={index} className="pt-3 first:pt-0 flex items-center gap-3">
              <img
                src={item.img || "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=120&q=80"}
                alt={item.name}
                className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-100 bg-slate-50"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                    Size: {item.selectedSize || "S"}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Qty: {item.quantity || 1}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm font-extrabold text-slate-900">₹{itemTotal}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Price Calculation Breakdown */}
      <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs font-medium text-slate-600">
        <div className="flex justify-between items-center">
          <span>Items Subtotal</span>
          <span className="font-bold text-slate-800">₹{total}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Delivery Charge</span>
          <span className="font-bold text-emerald-600">
            {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
          </span>
        </div>
        <div className="flex justify-between items-center text-slate-500">
          <span className="flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-emerald-500" />
            Taxes & Packaging
          </span>
          <span className="font-semibold text-emerald-600">Included</span>
        </div>
      </div>

      {/* Final Total */}
      <div className="pt-4 border-t-2 border-dashed border-slate-200 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500 block">
            Total Payable
          </span>
          <span className="text-2xl font-black text-[#E33B32]">₹{finalTotal}</span>
        </div>
        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
          Best Price Guaranteed
        </span>
      </div>

      {/* Security note */}
      <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-2xl border border-slate-100">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>100% Safe & Encrypted Checkout</span>
      </div>
    </div>
  );
}
