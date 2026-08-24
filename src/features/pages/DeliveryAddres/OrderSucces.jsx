import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, useSearchParams, useParams } from "react-router-dom";
import {
  CheckCircle2,
  Copy,
  Check,
  ShoppingBag,
  ArrowRight,
  Clock,
  RefreshCw,
  PhoneCall,
} from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io5";
import { fetchOrderById, getStoredRecentOrder } from "./services/orderService";
import { normalizeOrderStatus, calculateEstimatedDeliveryTime } from "./statusConfig";
import OrderStatusTimeline from "./components/OrderStatusTimeline";
import OrderStatusBadge from "./components/OrderStatusBadge";
import OrderItemsSummary from "./components/OrderItemsSummary";
import DeliveryAddressCard from "./components/DeliveryAddressCard";
import OrderSkeleton from "./components/OrderSkeleton";
import OrderErrorState from "./components/OrderErrorState";
import CheckoutProgress from "./components/CheckoutProgress";
import { getLocation } from "./location";
import { buildOrderText } from "./orderText";

export default function OrderSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = useParams();

  const urlOrderId = searchParams.get("orderId") || params.orderId || state?.orderId || state?.savedOrder?._id;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load & Sync order data
  const loadOrder = useCallback(
    async (isSilent = false) => {
      if (!isSilent) setLoading(true);
      else setIsRefreshing(true);

      setError(null);

      try {
        if (urlOrderId) {
          const data = await fetchOrderById(urlOrderId);
          setOrder(data);
        } else if (state?.savedOrder) {
          setOrder(state.savedOrder);
        } else if (state?.payment) {
          // Fallback constructed order object from location state
          const cached = getStoredRecentOrder();
          if (cached) {
            setOrder(cached);
          } else {
            setOrder({
              _id: state.payment.razorpay_order_id || `ORD-${Date.now().toString().slice(-6)}`,
              payment_id: state.payment.razorpay_payment_id,
              items: state.cartData || [],
              order_total: state.total || 0,
              user: state.formData || state.user,
              status: "Placed",
              createdAt: new Date().toISOString(),
            });
          }
        } else {
          // Check most recent order in cache
          const recent = getStoredRecentOrder();
          if (recent) {
            setOrder(recent);
          } else {
            throw new Error("Order parameters missing");
          }
        }
      } catch (err) {
        console.error("Order load error", err);
        setError("We couldn't retrieve the details for this order.");
      } finally {
        setLoading(false);
        setIsRefreshing(false);
      }
    },
    [urlOrderId, state]
  );

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  // Status auto-polling every 10 seconds for real-time status updates
  useEffect(() => {
    if (!order?._id && !urlOrderId) return;
    const targetId = order?._id || urlOrderId;

    const interval = setInterval(() => {
      fetchOrderById(targetId)
        .then((updated) => {
          if (updated && updated.status !== order?.status) {
            setOrder(updated);
          }
        })
        .catch(() => {});
    }, 10000);

    return () => clearInterval(interval);
  }, [order?._id, order?.status, urlOrderId]);

  const copyOrderId = () => {
    const idToCopy = order?._id || order?.id || urlOrderId || "N/A";
    navigator.clipboard.writeText(idToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <OrderSkeleton />;

  if (error || !order) {
    return <OrderErrorState message={error} onRetry={() => loadOrder()} />;
  }

  const items = order.items || state?.cartData || [];
  const totalAmount = order.order_total || state?.total || 0;
  const paymentId = order.payment_id || state?.payment?.razorpay_payment_id || "N/A";
  const displayId = order._id || urlOrderId || "N/A";
  const formattedId = displayId.length > 10 ? `#ORD-${displayId.slice(-8).toUpperCase()}` : `#${displayId}`;
  
  const statusObj = normalizeOrderStatus(order.status || "Placed");
  const deliveryInfo = calculateEstimatedDeliveryTime(order.createdAt);
  const userDetails = order.user || state?.formData || {};

  return (
    <div className="w-full min-h-screen pt-24 sm:pt-28 pb-16 bg-slate-50 flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl space-y-8">
        {/* Progress Step Header */}
        <CheckoutProgress currentStep={3} />

        {/* ── TOP HERO CONFIRMATION CARD ── */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs relative overflow-hidden space-y-6">
          {/* Subtle decorative background gradient */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            {/* Left Hero Text */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-600 shadow-xs">
                <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    Payment Successful
                  </span>
                  <OrderStatusBadge status={order.status} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Order Confirmed!
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  Your order has been placed successfully and transmitted to the kitchen.
                </p>
              </div>
            </div>

            {/* Right Quick Summary Badge */}
            <div className="w-full md:w-auto bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-row md:flex-col justify-between md:items-end gap-3 shrink-0">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                  Order Reference
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono font-black text-sm sm:text-base text-slate-900">
                    {formattedId}
                  </span>
                  <button
                    type="button"
                    onClick={copyOrderId}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                    title="Copy Order ID"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                  Estimated Delivery
                </span>
                <span className="text-xs font-extrabold text-emerald-600 flex items-center justify-end gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {deliveryInfo.etaWindowString}
                </span>
              </div>
            </div>
          </div>

          {/* Quick info bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs">
            <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Placed On</span>
              <span className="font-extrabold text-slate-800">{deliveryInfo.formattedDate || "Today"}</span>
            </div>
            <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Payment Status</span>
              <span className="font-extrabold text-emerald-600">PAID (Razorpay)</span>
            </div>
            <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Items Ordered</span>
              <span className="font-extrabold text-slate-800">{items.length} Items</span>
            </div>
            <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Total Amount</span>
              <span className="font-extrabold text-[#E33B32]">₹{totalAmount}</span>
            </div>
          </div>
        </div>

        {/* ── LIVE ORDER TRACKING SECTION ── */}
        <OrderStatusTimeline currentStatus={order.status || "Placed"} createdAt={order.createdAt} />

        {/* ── DETAILS GRID: ITEMS & ADDRESS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <OrderItemsSummary items={items} totalAmount={totalAmount} paymentId={paymentId} />
          <DeliveryAddressCard formData={userDetails} user={order.user} />
        </div>

        {/* ── ACTION BUTTONS BAR ── */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => loadOrder(true)}
              disabled={isRefreshing}
              className="flex-1 sm:flex-initial px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "Refreshing..." : "Refresh Tracking"}</span>
            </button>

            <button
              onClick={() => navigate("/order")}
              className="flex-1 sm:flex-initial px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View All Orders</span>
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Optional WhatsApp action */}
            <a
              href={`https://wa.me/918529503358?text=${encodeURIComponent(
                `New Order (PAID) - Ref: ${displayId}\n\nPayment ID: ${paymentId}\nName: ${userDetails.name || ""}\nNumber: ${userDetails.number || ""}\nAddress: ${userDetails.address || ""}\n\n${buildOrderText(items)}\nTotal: ₹${totalAmount}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs min-h-[44px]"
            >
              <IoLogoWhatsapp className="text-lg" />
              <span>Share on WhatsApp</span>
            </a>

            <button
              onClick={() => navigate("/")}
              className="flex-1 sm:flex-initial bg-[#E33B32] hover:bg-[#cf312a] text-white font-bold text-xs px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-red-200 cursor-pointer min-h-[44px]"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}