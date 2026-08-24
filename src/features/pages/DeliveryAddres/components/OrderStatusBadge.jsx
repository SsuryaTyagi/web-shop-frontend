import React from "react";
import { normalizeOrderStatus } from "../statusConfig";

export default function OrderStatusBadge({ status, showDot = true, className = "" }) {
  const statusObj = normalizeOrderStatus(status);
  const Icon = statusObj.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${statusObj.badgeClass} ${className}`}
    >
      {showDot && <span className={`w-2 h-2 rounded-full ${statusObj.dotClass} animate-pulse`} />}
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{statusObj.label}</span>
    </span>
  );
}
