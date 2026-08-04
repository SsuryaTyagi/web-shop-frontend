// src/features/admin/components/OrdersTable.jsx
import React, { useState } from "react";
import StatusBadge from "./StatusBadge";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  CreditCard,
  Phone,
  ShoppingBag,
  Info,
  CheckCircle,
} from "lucide-react";

export default function OrdersTable({ orders, onUpdateStatus, isCompact = false }) {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [selectedAddressOrder, setSelectedAddressOrder] = useState(null);

  const toggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const statusOptions = [
    "Pending",
    "Preparing",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  if (!orders || orders.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-slate-100">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h4 className="text-base font-bold text-slate-800">No orders found</h4>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          There are no orders matching your current search or filter criteria. Try clearing search filters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <th className="py-3.5 px-4 sm:px-6">Order ID</th>
              <th className="py-3.5 px-4">Customer</th>
              <th className="py-3.5 px-4 text-center">Items</th>
              {!isCompact && <th className="py-3.5 px-4">Delivery & Payment</th>}
              <th className="py-3.5 px-4">Total (₹)</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Time</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
            {orders.map((order) => {
              const isExpanded = expandedOrderId === order.id;

              return (
                <React.Fragment key={order.id}>
                  <tr className="hover:bg-slate-50/80 transition-colors group">
                    {/* Order ID */}
                    <td className="py-4 px-4 sm:px-6">
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-md text-xs">
                        {order.id}
                      </span>
                    </td>

                    {/* Customer Info */}
                    <td className="py-4 px-4">
                      <div>
                        <span className="block font-bold text-slate-900">{order.customerName}</span>
                        {order.customerPhone && (
                          <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-slate-400" />
                            {order.customerPhone}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Items Count Badge */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => toggleExpand(order.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                        title="Click to expand item details"
                      >
                        <span>{order.itemsCount || order.itemsList?.length || 1} items</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </td>

                    {/* Delivery & Payment (Full mode only) */}
                    {!isCompact && (
                      <td className="py-4 px-4">
                        <div className="space-y-1 text-xs">
                          <button
                            onClick={() => setSelectedAddressOrder(order)}
                            className="flex items-center gap-1.5 text-slate-700 hover:text-[#E33B32] text-left max-w-xs truncate font-medium group/addr"
                          >
                            <MapPin className="w-3.5 h-3.5 text-[#E33B32] flex-shrink-0" />
                            <span className="truncate group-hover/addr:underline">
                              {order.deliveryAddress}
                            </span>
                          </button>
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                            <span>
                              {order.paymentMethod || "UPI"} • {order.paymentId}
                            </span>
                          </div>
                        </div>
                      </td>
                    )}

                    {/* Total Amount */}
                    <td className="py-4 px-4 font-extrabold text-slate-900">
                      ₹{order.totalAmount?.toLocaleString("en-IN")}
                    </td>

                    {/* Status Badge & Dropdown */}
                    <td className="py-4 px-4">
                      {onUpdateStatus ? (
                        <div className="relative inline-block">
                          <select
                            value={order.status}
                            onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                            className="text-xs font-bold rounded-full py-1 pl-3 pr-7 bg-slate-100 text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E33B32]/30 cursor-pointer appearance-none"
                          >
                            {statusOptions.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      ) : (
                        <StatusBadge status={order.status} />
                      )}
                    </td>

                    {/* Order Time */}
                    <td className="py-4 px-4 text-xs font-medium text-slate-500">
                      {order.orderTime}
                    </td>

                    {/* Action button to expand */}
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => toggleExpand(order.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        title="Toggle order item details"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>

                  {/* Expandable Order Details Row */}
                  {isExpanded && (
                    <tr className="bg-slate-50/70 border-b border-slate-100">
                      <td colSpan={isCompact ? 7 : 8} className="p-4 sm:p-5">
                        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                              <ShoppingBag className="w-4 h-4 text-[#E33B32]" />
                              Order Breakdown ({order.id})
                            </h5>
                            <span className="text-xs font-semibold text-slate-500">
                              Payment: {order.paymentMethod || "Prepaid"}
                            </span>
                          </div>

                          <div className="divide-y divide-slate-100">
                            {order.itemsList?.map((item, idx) => (
                              <div
                                key={idx}
                                className="py-2 flex items-center justify-between text-xs"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[11px]">
                                    {item.qty}x
                                  </span>
                                  <span className="font-semibold text-slate-800">
                                    {item.name}
                                  </span>
                                  {item.size && (
                                    <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200/60 rounded text-[10px] font-bold">
                                      {item.size}
                                    </span>
                                  )}
                                </div>
                                <span className="font-bold text-slate-900">
                                  ₹{(item.price * item.qty).toLocaleString("en-IN")}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900">
                            <span>Delivery Address:</span>
                            <span className="text-slate-600 font-normal truncate max-w-md">
                              {order.deliveryAddress}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Address Details Modal */}
      {selectedAddressOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#E33B32]" />
                Delivery Details ({selectedAddressOrder.id})
              </h4>
              <button
                onClick={() => setSelectedAddressOrder(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <span className="block font-bold text-slate-500 uppercase text-[10px]">
                  Customer Name
                </span>
                <p className="font-bold text-slate-900 text-sm">{selectedAddressOrder.customerName}</p>
              </div>

              <div>
                <span className="block font-bold text-slate-500 uppercase text-[10px]">
                  Phone Number
                </span>
                <p className="font-semibold text-slate-800">{selectedAddressOrder.customerPhone}</p>
              </div>

              <div>
                <span className="block font-bold text-slate-500 uppercase text-[10px]">
                  Full Address
                </span>
                <p className="font-medium text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200 mt-1">
                  {selectedAddressOrder.deliveryAddress}
                </p>
              </div>

              <div>
                <span className="block font-bold text-slate-500 uppercase text-[10px]">
                  Payment Transaction
                </span>
                <p className="font-semibold text-slate-800">
                  {selectedAddressOrder.paymentMethod} • ID: {selectedAddressOrder.paymentId}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedAddressOrder(null)}
              className="mt-5 w-full bg-slate-900 text-white font-semibold py-2.5 rounded-xl text-xs hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
