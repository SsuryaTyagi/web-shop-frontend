import React from "react";
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiInformationCircle,
  HiXCircle,
  HiX,
} from "react-icons/hi";

const alertVariants = {
  success: {
    container: "bg-emerald-50 border-emerald-300 text-emerald-900",
    icon: <HiCheckCircle className="text-emerald-600 text-xl shrink-0" aria-hidden="true" />,
    border: "border-l-4 border-l-emerald-600",
  },
  error: {
    container: "bg-red-50 border-red-300 text-red-900",
    icon: <HiXCircle className="text-red-600 text-xl shrink-0" aria-hidden="true" />,
    border: "border-l-4 border-l-red-600",
  },
  warning: {
    container: "bg-amber-50 border-amber-300 text-amber-900",
    icon: <HiExclamationCircle className="text-amber-600 text-xl shrink-0" aria-hidden="true" />,
    border: "border-l-4 border-l-amber-600",
  },
  info: {
    container: "bg-blue-50 border-blue-300 text-blue-900",
    icon: <HiInformationCircle className="text-blue-600 text-xl shrink-0" aria-hidden="true" />,
    border: "border-l-4 border-l-blue-600",
  },
};

/**
 * Traditional, familiar, and accessible inline Alert UI pattern
 */
export default function Alert({
  type = "info",
  title,
  message,
  onClose,
  className = "",
}) {
  const variant = alertVariants[type] || alertVariants.info;

  if (!message && !title) return null;

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 p-4 rounded-xl border ${variant.container} ${variant.border} shadow-xs transition-all duration-200 ${className}`}
    >
      {variant.icon}
      <div className="flex-1 text-sm">
        {title && <h4 className="font-bold text-base leading-snug mb-0.5">{title}</h4>}
        {message && <p className="leading-relaxed font-medium">{message}</p>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss alert"
          className="p-1 rounded-lg hover:bg-black/5 text-current opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-current shrink-0"
        >
          <HiX className="text-lg" />
        </button>
      )}
    </div>
  );
}
