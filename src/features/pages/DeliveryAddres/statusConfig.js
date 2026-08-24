import {
  ShoppingBag,
  CheckCircle2,
  ChefHat,
  Bike,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

export const TIMELINE_STEPS = [
  {
    key: "Placed",
    label: "Order Placed",
    shortLabel: "Placed",
    description: "Your order has been received and sent to the restaurant.",
    icon: ShoppingBag,
    stepIndex: 0,
  },
  {
    key: "Confirmed",
    label: "Order Confirmed",
    shortLabel: "Confirmed",
    description: "Restaurant has accepted your order and confirmed details.",
    icon: CheckCircle2,
    stepIndex: 1,
  },
  {
    key: "Preparing",
    label: "Preparing Food",
    shortLabel: "Preparing",
    description: "Our chefs are preparing your delicious meal.",
    icon: ChefHat,
    stepIndex: 2,
  },
  {
    key: "Out for Delivery",
    label: "Out for Delivery",
    shortLabel: "On the way",
    description: "Your rider is on the way to your delivery address.",
    icon: Bike,
    stepIndex: 3,
  },
  {
    key: "Delivered",
    label: "Delivered",
    shortLabel: "Delivered",
    description: "Order delivered. Enjoy your meal!",
    icon: CheckCircle,
    stepIndex: 4,
  },
];

export const STATUS_LOOKUP = {
  Placed: {
    key: "Placed",
    label: "Order Placed",
    badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
    dotClass: "bg-sky-500",
    icon: ShoppingBag,
    isCancelled: false,
    isCompleted: false,
    stepIndex: 0,
  },
  Confirmed: {
    key: "Confirmed",
    label: "Order Confirmed",
    badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
    dotClass: "bg-indigo-500",
    icon: CheckCircle2,
    isCancelled: false,
    isCompleted: false,
    stepIndex: 1,
  },
  Preparing: {
    key: "Preparing",
    label: "Preparing Food",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    dotClass: "bg-amber-500",
    icon: ChefHat,
    isCancelled: false,
    isCompleted: false,
    stepIndex: 2,
  },
  "Out for Delivery": {
    key: "Out for Delivery",
    label: "Out for Delivery",
    badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
    dotClass: "bg-purple-500",
    icon: Bike,
    isCancelled: false,
    isCompleted: false,
    stepIndex: 3,
  },
  Delivered: {
    key: "Delivered",
    label: "Delivered",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dotClass: "bg-emerald-500",
    icon: CheckCircle,
    isCancelled: false,
    isCompleted: true,
    stepIndex: 4,
  },
  Cancelled: {
    key: "Cancelled",
    label: "Cancelled",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
    dotClass: "bg-rose-500",
    icon: XCircle,
    isCancelled: true,
    isCompleted: false,
    stepIndex: -1,
  },
  "Payment Failed": {
    key: "Payment Failed",
    label: "Payment Failed",
    badgeClass: "bg-red-50 text-red-700 border-red-200",
    dotClass: "bg-red-500",
    icon: AlertTriangle,
    isCancelled: true,
    isCompleted: false,
    stepIndex: -1,
  },
};

/**
 * Maps raw backend status strings to standardized status object
 */
export function normalizeOrderStatus(rawStatus) {
  if (!rawStatus) return STATUS_LOOKUP.Placed;

  const s = String(rawStatus).trim().toLowerCase();

  if (s === "pending" || s === "placed") return STATUS_LOOKUP.Placed;
  if (s === "confirmed" || s === "accepted") return STATUS_LOOKUP.Confirmed;
  if (s === "preparing" || s === "processing" || s === "cooking") return STATUS_LOOKUP.Preparing;
  if (s === "ready" || s === "out for delivery" || s === "on the way" || s === "dispatched") {
    return STATUS_LOOKUP["Out for Delivery"];
  }
  if (s === "delivered" || s === "completed") return STATUS_LOOKUP.Delivered;
  if (s === "cancelled" || s === "canceled" || s === "rejected") return STATUS_LOOKUP.Cancelled;
  if (s === "failed" || s === "payment failed") return STATUS_LOOKUP["Payment Failed"];

  return STATUS_LOOKUP.Placed;
}

/**
 * Formats order creation date and estimated delivery window
 */
export function calculateEstimatedDeliveryTime(createdAt) {
  const dateObj = createdAt ? new Date(createdAt) : new Date();

  if (isNaN(dateObj.getTime())) {
    return {
      orderTimeString: "Just now",
      etaWindowString: "30–40 Mins",
      expectedTime: "Within 40 mins",
    };
  }

  const orderTimeString = dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const etaStart = new Date(dateObj.getTime() + 30 * 60000);
  const etaEnd = new Date(dateObj.getTime() + 45 * 60000);

  const startFormatted = etaStart.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endFormatted = etaEnd.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    orderTimeString,
    etaWindowString: `${startFormatted} – ${endFormatted}`,
    expectedTime: `Expected by ${endFormatted}`,
    formattedDate: dateObj.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };
}
