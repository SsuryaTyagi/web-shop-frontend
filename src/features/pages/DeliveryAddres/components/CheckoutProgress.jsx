import React from "react";
import { Check, MapPin, CreditCard, CheckCircle2 } from "lucide-react";

export default function CheckoutProgress({ currentStep = 1 }) {
  const steps = [
    { id: 1, label: "Delivery Details", icon: MapPin },
    { id: 2, label: "Payment", icon: CreditCard },
    { id: 3, label: "Order Confirmed", icon: CheckCircle2 },
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative max-w-2xl mx-auto">
        {/* Connecting line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-0 rounded-full" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#E33B32] -z-0 rounded-full transition-all duration-500 ease-in-out"
          style={{
            width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%",
          }}
        />

        {steps.map((step) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isCompleted
                    ? "bg-[#E33B32] text-white ring-4 ring-red-100 shadow-md shadow-red-200"
                    : isCurrent
                    ? "bg-slate-900 text-white ring-4 ring-slate-100 shadow-md"
                    : "bg-white text-slate-400 border-2 border-slate-200"
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : <Icon className="w-5 h-5" />}
              </div>
              <span
                className={`mt-2 text-xs font-bold tracking-tight text-center transition-colors ${
                  isCurrent
                    ? "text-slate-900 font-extrabold"
                    : isCompleted
                    ? "text-[#E33B32]"
                    : "text-slate-400"
                }`}
              >
                <span className="hidden sm:inline">{step.id}. </span>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
