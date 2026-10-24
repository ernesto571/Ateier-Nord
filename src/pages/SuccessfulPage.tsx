import { CheckCircle2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../components/Home/Footer";

export default function Successful() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <main>
        <div className="flex h-[90vh] items-center justify-center bg-white px-4">
            <div className="w-full max-w-md text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-black" />

                <h1 className="mt-5 text-2xl font-semibold text-neutral-950">
                Payment submitted
                </h1>

                <p className="mt-3 text-sm leading-6 text-neutral-500">
                Your payment is being verified. Your order status will update once
                we confirm the payment.
                </p>

                {!sessionId && (
                <p className="mt-3 text-sm text-red-600">
                    No payment session was provided.
                </p>
                )}

                <Link
                to="/all"
                className="mt-6 inline-flex rounded-lg bg-neutral-950 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
                >
                Continue shopping
                </Link>
            </div>
        </div>
        <Footer />

    </main>
    
  );
}