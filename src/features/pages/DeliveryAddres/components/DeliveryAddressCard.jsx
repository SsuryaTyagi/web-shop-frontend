import React from "react";
import { MapPin, Phone, Mail, User, ShieldCheck } from "lucide-react";

export default function DeliveryAddressCard({ formData = {}, user = {} }) {
  const name = formData?.name || user?.name || "Customer";
  const phone = formData?.number || user?.number || "N/A";
  const email = formData?.email || user?.email || "N/A";
  const address = formData?.address || user?.address || "Address details unavailable";

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#E33B32]" />
          Delivering To
        </h3>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          Verified Address
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Recipient Name */}
        <div className="flex items-start gap-3 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-600">
            <User className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Recipient Name
            </span>
            <span className="text-sm font-extrabold text-slate-900">{name}</span>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-600">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Phone Number
            </span>
            <span className="text-sm font-extrabold text-slate-900">{phone}</span>
          </div>
        </div>
      </div>

      {/* Full Address */}
      <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0 text-[#E33B32]">
          <MapPin className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
            Complete Delivery Address
          </span>
          <p className="text-xs font-bold text-slate-800 mt-1 leading-relaxed">{address}</p>
        </div>
      </div>
    </div>
  );
}
