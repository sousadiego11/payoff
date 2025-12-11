import { Hono } from "hono";
import { DB } from "./database/Database";
import { StripePurchaseAdapter } from "./stripe/StripePurchaseAdapter";

export const api = new Hono()

api.get("/purchases", async (c) => {
    const session = c.req.query("user_session");
    if (!session) return c.json({ error: "Missing session" }, 400);

    const db = await DB.make();
    const purchases = await db.getPurchases(session);

    return c.json(purchases);
});

api.post("/stripe/webhook", async (c) => {
    const db = await DB.make()
    const stripeAdapter = await StripePurchaseAdapter.make()
    const purchase = await stripeAdapter.processPayment(c.req)

    await db.updatePurchase(purchase)

    return c.text("Webhook received");
})