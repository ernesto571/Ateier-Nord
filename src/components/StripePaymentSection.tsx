import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CheckoutElementsProvider,
  PaymentElement,
  useCheckoutElements,
} from "@stripe/react-stripe-js/checkout";
import { Loader2 } from "lucide-react";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

type StripePaymentProps = {
  clientSecret: string;
  orderNumber: string;
  total: number;
};

function StripePaymentForm({
  orderNumber,
  total,
}: Omit<StripePaymentProps, "clientSecret">) {
  const result = useCheckoutElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (result.type !== "success" || !result.checkout.canConfirm) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const confirmation = await result.checkout.confirm();

      if (confirmation.type === "error") {
        setError(confirmation.error.message);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Payment could not be completed."
      );
    } finally {
      setLoading(false);
    }
  };

  if (result.type !== "success") {

    return (
    <div className="flex items-center justify-center h-[40vh] gap-2 text-sm text-neutral-500">
        <Loader2 className="h-5 w-5 animate-spin text-black" />
        <p>Loading payment form...</p>
    </div>
    );
  }

  return (
    <form onSubmit={handlePayment} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-neutral-950">
          Payment details
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Complete your payment securely.
        </p>
      </div>

      <div className="rounded-xl border border-neutral-200 p-4">
        <PaymentElement />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
        <span className="text-sm text-neutral-600">Total</span>
        <span className="text-xl font-semibold text-neutral-950">
          ${total.toFixed(2)}
        </span>
      </div>

      <button
        type="submit"
        disabled={!result.checkout.canConfirm || loading}
        className="w-full rounded-lg bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
      </button>

      <p className="text-center text-xs text-neutral-500">
        Order {orderNumber}
      </p>
    </form>
  );
}

export default function StripePaymentSection({ clientSecret, orderNumber,total,}: StripePaymentProps) {
  return (
    <CheckoutElementsProvider
      key={clientSecret}
      stripe={stripePromise}
      options={{
        clientSecret,
        elementsOptions: {
          appearance: {
            theme: "stripe",
            variables: {
              colorPrimary: "#171717",
              colorText: "#171717",
              colorDanger: "#dc2626",
              borderRadius: "8px",
              fontFamily: "Inter, sans-serif",
            },
          },
        },
      }}
    >
      <StripePaymentForm
        orderNumber={orderNumber}
        total={total}
      />
    </CheckoutElementsProvider>
  );
}