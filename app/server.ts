import { Hono } from "hono";
import { createHonoServer } from "react-router-hono-server/node";
import { DB } from "./server/database/Database";
import { StripePurchaseAdapter } from "./server/stripe/StripePurchaseAdapter";

const app = new Hono()

app.get("/api/purchases", async (c) => {
    const session = c.req.query("user_session");
    if (!session) return c.json({ error: "Missing session" }, 400);

    const db = await DB.make();
    const purchases = await db.getPurchases(session);

    return c.json(purchases);
});

app.post("/stripe/webhook", async (c) => {
    const db = await DB.make()
    const stripeAdapter = await StripePurchaseAdapter.make()
    const purchase = await stripeAdapter.processPayment(c.req)

    await db.updatePurchase(purchase)

    return c.text("Webhook received");
})

export default createHonoServer({
    app
})