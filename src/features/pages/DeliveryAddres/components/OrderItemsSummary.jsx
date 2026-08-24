import React from "react";
import { Utensils, Receipt, Tag } from "lucide-react";

export default function OrderItemsSummary({ items = [], totalAmount = 0, paymentId }) {
  const deliveryFee = 0; // Free delivery or calculated

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Utensils className="w-5 h-5 text-[#E33B32]" />
          Order Items & Receipt
        </h3>
        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {items.length} {items.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      {/* Items list */}
      <div className="divide-y divide-slate-100">
        {items.map((item, idx) => {
          const price = item.price || item.finalPrice || 0;
          const qty = item.quantity || item.qty || 1;
          const size = item.selectedSize || item.size || "S";

          return (
            <div key={idx} className="py-3.5 first:pt-0 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={
                    item.img ||
                    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=120&q=80"
                  }
                  alt={item.name}
                  className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-slate-100 bg-slate-50"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                    <span className="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-md text-[11px]">
                      Size: {size}
                    </span>
                    <span>×</span>
                    <span className="font-semibold text-slate-800">{qty}</span>
                    <span>(₹{price} each)</span>
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm font-extrabold text-slate-900">
                  ₹{price * qty}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Financial breakdown */}
      <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs font-medium text-slate-600 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
        <div className="flex justify-between items-center">
          <span>Items Subtotal</span>
          <span className="font-bold text-slate-800">₹{totalAmount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Delivery Fee</span>
          <span className="font-bold text-emerald-600">FREE</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-emerald-500" />
            Taxes & Packaging
          </span>
          <span className="font-semibold text-emerald-600">Included</span>
        </div>
        {paymentId && (
          <div className="flex justify-between items-center pt-2 border-t border-slate-200/60 text-slate-500">
            <span>Payment ID</span>
            <span className="font-mono font-bold text-slate-700 break-all">{paymentId}</span>
          </div>
        )}
      </div>

      {/* Final Total */}
      <div className="pt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Receipt className="w-5 h-5 text-slate-400" />
          <span className="text-sm font-extrabold text-slate-900">Total Paid</span>
        </div>
        <span className="text-2xl font-black text-[#E33B32]">₹{totalAmount}</span>
      </div>
    </div>
  );
}
