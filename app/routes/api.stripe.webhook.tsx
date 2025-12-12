import { DB } from "~/server/database/Database";
import { StripePurchaseAdapter } from "~/server/stripe/StripePurchaseAdapter";

export async function action({ request }: { request: Request }) {
    const db = await DB.make();
    const stripeAdapter = await StripePurchaseAdapter.make();

    const purchase = await stripeAdapter.processPayment(request);
    await db.updatePurchase(purchase);

    return new Response("Webhook received", { status: 200 });
}

