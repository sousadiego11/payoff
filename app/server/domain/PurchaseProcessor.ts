import type { HonoRequest } from "hono";
import type { Purchase } from "./Purchase";

export interface IPurchaseProcessor {
    processPayment(req: HonoRequest): Promise<Purchase.Purchase>
}