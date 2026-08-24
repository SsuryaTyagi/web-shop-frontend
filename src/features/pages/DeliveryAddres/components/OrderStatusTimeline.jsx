import React from "react";
import { TIMELINE_STEPS, normalizeOrderStatus } from "../statusConfig";
import { Check, Clock, XCircle, AlertCircle } from "lucide-react";

export default function OrderStatusTimeline({ currentStatus = "Placed", createdAt }) {
  const activeStatusObj = normalizeOrderStatus(currentStatus);

  if (activeStatusObj.isCancelled) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 text-center space-y-2">
        <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-600">
          <XCircle className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-extrabold text-rose-900">
          Order {activeStatusObj.label}
        </h3>
        <p className="text-xs text-rose-700 max-w-md mx-auto">
          This order was {activeStatusObj.label.toLowerCase()}. If money was deducted, your refund will be processed within 3-5 business days. Please contact support if you need assistance.
        </p>
      </div>
    );
  }

  const currentStepIdx = activeStatusObj.stepIndex;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E33B32] bg-red-50 px-3 py-1 rounded-full">
            Live Order Tracking
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
            Order Status: <span className="text-[#E33B32]">{activeStatusObj.label}</span>
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Real-time Sync</span>
        </div>
      </div>

      {/* ── DESKTOP HORIZONTAL TIMELINE ── */}
      <div className="hidden md:block py-4">
        <div className="relative flex items-center justify-between">
          {/* Progress bar background */}
          <div className="absolute left-6 right-6 top-6 h-1 bg-slate-100 -z-0 rounded-full" />
          {/* Progress bar active fill */}
          <div
            className="absolute left-6 top-6 h-1 bg-emerald-500 -z-0 rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${Math.min(100, Math.max(0, (currentStepIdx / (TIMELINE_STEPS.length - 1)) * 100))}%`,
              right: `${100 - (currentStepIdx / (TIMELINE_STEPS.length - 1)) * 100}%`,
            }}
          />

          {TIMELINE_STEPS.map((step) => {
            const Icon = step.icon;
            const isCompleted = step.stepIndex < currentStepIdx;
            const isCurrent = step.stepIndex === currentStepIdx;

            return (
              <div key={step.key} className="relative z-10 flex flex-col items-center flex-1 text-center">
                {/* Node icon */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
                      : isCurrent
                      ? "bg-[#E33B32] text-white ring-4 ring-red-100 shadow-lg shadow-red-200 scale-110"
                      : "bg-white text-slate-300 border-2 border-slate-200"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6 stroke-[3]" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                {/* Step title */}
                <span
                  className={`mt-3 text-xs font-bold tracking-tight block ${
                    isCurrent
                      ? "text-slate-900 font-extrabold text-sm"
                      : isCompleted
                      ? "text-emerald-700"
                      : "text-slate-400"
                  }`}
                >
                  {step.shortLabel}
                </span>

                {/* Status indicator note */}
                {isCurrent && (
                  <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-extrabold text-[#E33B32] bg-red-50 border border-red-100 px-2 py-0.5 rounded-md animate-pulse">
                    Current Stage
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE VERTICAL TIMELINE ── */}
      <div className="md:hidden space-y-6 relative pl-2 pt-2">
        {TIMELINE_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = step.stepIndex < currentStepIdx;
          const isCurrent = step.stepIndex === currentStepIdx;
          const isLast = idx === TIMELINE_STEPS.length - 1;

          return (
            <div key={step.key} className="flex gap-4 relative">
              {/* Connecting vertical line */}
              {!isLast && (
                <div
                  className={`absolute left-5 top-10 bottom-0 w-0.5 -ml-px ${
                    isCompleted ? "bg-emerald-500" : "bg-slate-200"
                  }`}
                />
              )}

              {/* Node Icon */}
              <div
                className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center relative z-10 transition-all ${
                  isCompleted
                    ? "bg-emerald-500 text-white shadow-xs"
                    : isCurrent
                    ? "bg-[#E33B32] text-white ring-4 ring-red-100 shadow-md scale-105"
                    : "bg-white text-slate-300 border-2 border-slate-200"
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : <Icon className="w-5 h-5" />}
              </div>

              {/* Step info */}
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2">
                  <h4
                    className={`text-sm font-bold ${
                      isCurrent
                        ? "text-slate-900 font-extrabold"
                        : isCompleted
                        ? "text-emerald-700"
                        : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </h4>
                  {isCurrent && (
                    <span className="text-[10px] font-extrabold text-[#E33B32] bg-red-50 border border-red-100 px-2 py-0.5 rounded-full animate-pulse">
                      In Progress
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active step explanation box */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-[#E33B32]">
          <AlertCircle className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-900">What happens next?</h4>
          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
            {activeStatusObj.key === "Placed" &&
              "Our restaurant staff is reviewing your order. Food preparation will begin in a moment."}
            {activeStatusObj.key === "Confirmed" &&
              "The kitchen accepted your order! Fresh ingredients are being prepared for your meal."}
            {activeStatusObj.key === "Preparing" &&
              "Your dishes are cooking on the grill! A delivery partner will be assigned shortly."}
            {activeStatusObj.key === "Out for Delivery" &&
              "Your food is packed hot and fresh! Our delivery driver is on the way to your doorstep."}
            {activeStatusObj.key === "Delivered" &&
              "Your order has arrived! Thank you for ordering with us. Please leave your feedback!"}
          </p>
        </div>
      </div>
    </div>
  );
}
