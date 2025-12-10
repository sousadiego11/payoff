import type Stripe from "stripe";
import type { Purchase } from "../domain/Purchase";

export class StripeMapper {
    static toDomainPurchaseStatus(payment: Stripe.PaymentIntent | Stripe.Charge): Purchase.Status {
        if ("status" in payment && "object" in payment && payment.object === "payment_intent") {
            const status = payment.status;

            switch (status) {
                case "succeeded":
                    return "succeeded";
                case "processing":
                    return "processing";
                case "requires_action":
                    return "requires_action";
                case "requires_payment_method":
                    return "requires_payment_method";
                case "requires_confirmation":
                    return "requires_confirmation";
                case "canceled":
                    return "canceled";
            }

            return "unknown";
        }

        // Se for um Charge
        if ("object" in payment && payment.object === "charge") {
            const charge = payment;

            if (charge.refunded) return "refunded";
            if (charge.disputed) return "disputed";

            // Stripe usa "pending", você não tem → convertemos para "processing"
            if (charge.status === "pending") return "processing";

            switch (charge.status) {
                case "succeeded":
                    return "succeeded";
                case "failed":
                    return "failed";
            }

        }

        return "unknown";
    }
}