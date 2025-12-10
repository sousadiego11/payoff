import type Stripe from "stripe";
import type { PurchaseInformation } from "~/server/database/Database";

type UnifiedStatus =
    | "succeeded"
    | "processing"
    | "requires_action"
    | "requires_payment_method"
    | "requires_confirmation"
    | "canceled"
    | "failed"
    | "refunded"
    | "partially_refunded"
    | "disputed"
    | "unknown";

function getUnifiedStatus(
    payment: Stripe.PaymentIntent | Stripe.Charge
): UnifiedStatus {

    // ---- PAYMENT INTENT ----
    if (payment.object === "payment_intent") {
        return (
            payment.status ??
            "unknown"
        ) as UnifiedStatus;
    }

    // ---- CHARGE ----
    if (payment.object === "charge") {
        if (payment.disputed) return "disputed";

        if (payment.refunded) {
            if (payment.amount_refunded === payment.amount) {
                return "refunded";
            }
            return "partially_refunded";
        }

        return (payment.status ?? "unknown") as UnifiedStatus;
    }

    return "unknown";
}


export function PaymentStatusBadge({ purchase }: { purchase: PurchaseInformation }) {
    const status = getUnifiedStatus(purchase.payment);

    const colors: Record<UnifiedStatus, string> = {
        succeeded: "bg-green-100 text-green-800",
        processing: "bg-blue-100 text-blue-700",
        requires_action: "bg-yellow-100 text-yellow-700",
        requires_payment_method: "bg-amber-100 text-gray-700",
        requires_confirmation: "bg-purple-100 text-purple-700",
        canceled: "bg-red-100 text-red-700",
        failed: "bg-red-100 text-red-700",

        refunded: "bg-teal-100 text-teal-800",
        partially_refunded: "bg-cyan-100 text-cyan-800",
        disputed: "bg-orange-100 text-orange-800",

        unknown: "bg-gray-100 text-gray-700",
    };

    const labels: Record<UnifiedStatus, string> = {
        succeeded: "Payment Succeeded",
        processing: "Processing",
        requires_action: "Action Required",
        requires_payment_method: "Payment Method Needed",
        requires_confirmation: "Awaiting Confirmation",
        canceled: "Canceled",
        failed: "Payment Failed",

        refunded: "Refunded",
        partially_refunded: "Partially Refunded",
        disputed: "Disputed / Under Review",

        unknown: "Unknown Status",
    };

    return (
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${colors[status]}`}>
            {labels[status]}
        </span>
    );
}
