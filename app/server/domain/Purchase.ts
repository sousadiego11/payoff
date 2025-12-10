import type { Product } from "./Product";
import type { Session } from "./Session";

export namespace Purchase {
    export type Id = string

    export type Status =
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

    export type Purchase = {
        id: Purchase.Id,
        session: Session.Id,
        product: Product,
        viewed: boolean,
        payment: {
            status: Purchase.Status
            created: number
            amount: number
        }
    }
}