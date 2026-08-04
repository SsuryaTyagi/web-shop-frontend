// src/features/admin/components/StatusBadge.jsx
import React from "react";
import { Clock, ChefHat, Bike, CheckCircle2, XCircle } from "lucide-react";

export default function StatusBadge({ status }) {
  const getBadgeConfig = (st) => {
    switch (st?.toLowerCase()) {
      case "pending":
        return {
          label: "Pending",
          bg: "bg-amber-50 text-amber-700 border-amber-200/80",
          dot: "bg-amber-500",
          icon: Clock,
        };
      case "preparing":
        return {
          label: "Preparing",
          bg: "bg-sky-50 text-sky-700 border-sky-200/80",
          dot: "bg-sky-500",
          icon: ChefHat,
        };
      case "out for delivery":
        return {
          label: "Out for Delivery",
          bg: "bg-purple-50 text-purple-700 border-purple-200/80",
          dot: "bg-purple-500",
          icon: Bike,
        };
      case "delivered":
        return {
          label: "Delivered",
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
          dot: "bg-emerald-500",
          icon: CheckCircle2,
        };
      case "cancelled":
        return {
          label: "Cancelled",
          bg: "bg-rose-50 text-rose-700 border-rose-200/80",
          dot: "bg-rose-500",
          icon: XCircle,
        };
      default:
        return {
          label: st || "Unknown",
          bg: "bg-slate-50 text-slate-700 border-slate-200",
          dot: "bg-slate-500",
          icon: Clock,
        };
    }
  };

  const config = getBadgeConfig(status);
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg} shadow-2xs`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{config.label}</span>
    </span>
  );
}
