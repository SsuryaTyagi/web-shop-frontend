import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ShoppingBag, ArrowLeft, RefreshCw, HelpCircle } from "lucide-react";

export default function OrderErrorState({
  title = "Order Not Found",
  message = "We couldn't retrieve the details for this order.",
  type = "not_found",
  onRetry,
}) {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen pt-28 pb-16 bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-lg w-full rounded-3xl border border-slate-200 p-8 shadow-sm text-center space-y-6">
        <div className="w-16 h-16 bg-amber-50 border border-amber-100 rounded-3xl flex items-center justify-center mx-auto text-amber-600">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">{title}</h2>
          <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-md mx-auto">
            {message}
          </p>
        </div>

        {type === "payment_creation_failed" && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-xs text-red-800 text-left space-y-1">
            <span className="font-bold block">What should you do?</span>
            <p>
              Your payment may have succeeded on Razorpay. Please save your payment ID and contact customer support via WhatsApp or phone so our staff can verify and manual-confirm your order immediately.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full sm:w-auto px-6 py-3 bg-[#E33B32] hover:bg-[#cf312a] text-white font-bold text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}

          <button
            onClick={() => navigate("/order")}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            View My Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
