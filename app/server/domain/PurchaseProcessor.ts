import type { Purchase } from "./Purchase";

export interface IPurchaseProcessor {
    processPayment(req: Request): Promise<Purchase.Purchase>
}