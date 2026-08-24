import React, { useState } from "react";
import useAuth from "../../auth/hooks/useAuth";
import useCart from "../../Cart/hooks/useCart";
import { usePayment } from "../hooks/usePayment";
import Alert from "../../../shared/components/Alert";
import { Lock, Loader2 } from "lucide-react";

const Checkout = ({ onPaymentSuccess, formData, validateForm: externalValidate }) => {
  const { total, cartData } = useCart();
  const { user } = useAuth();
  const { loading, initiatePayment } = usePayment();
  const [errorMessage, setErrorMessage] = useState("");

  const handlePayment = async () => {
    setErrorMessage("");

    if (cartData.length === 0) {
      setErrorMessage("Your cart is empty. Please add items before checking out.");
      return;
    }

    if (externalValidate && !externalValidate()) {
      setErrorMessage("Please complete all required delivery details before proceeding.");
      return;
    }

    await initiatePayment({
      amount: total,
      user,
      formData,
      cartData,
      onSuccess: (response) => {
        onPaymentSuccess(response);
      },
    });
  };

  return (
    <div className="w-full space-y-4">
      {errorMessage && (
        <Alert
          type="error"
          title="Validation Error"
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}

      <button
        type="button"
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-[#E33B32] hover:bg-[#cf312a] active:scale-[0.99] text-white font-extrabold px-6 py-4 rounded-2xl transition-all shadow-md shadow-red-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-red-100 min-h-[52px] cursor-pointer text-base flex items-center justify-center gap-2.5"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <Lock className="w-5 h-5 shrink-0" />
            <span>Pay ₹{total} & Place Order</span>
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-slate-400 font-medium">
        By clicking pay, your order will be verified and sent to the kitchen.
      </p>
    </div>
  );
};

export default Checkout;