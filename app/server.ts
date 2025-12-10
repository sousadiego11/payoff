import { Hono } from "hono";
import { createHonoServer } from "react-router-hono-server/node";
import { StripeMaker } from "./server/stripe/StripeMaker";
import type Stripe from "stripe";
import { DB } from "./server/database/Database";

const app = new Hono()

app.get("/api/purchases", async (c) => {
    const session = c.req.query("user_session");

    if (!session) {
        return c.json({ error: "Missing session" }, 400);
    }

    const db = await DB.make();
    const purchases = await db.getPurchases(session);

    return c.json(purchases);
});

app.post("/api/webhook", async (c) => {
    const stripe = StripeMaker()
    const reqraw = await c.req.text()

    const signature = c.req.header('stripe-signature');
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!signature || !endpointSecret) return c.text("Missing signature or endpoint secret", 400);

    try {
        const event = stripe.webhooks.constructEvent(
            reqraw,
            signature,
            endpointSecret
        );

        const pi = event.data.object as Stripe.PaymentIntent;
        const db = await DB.make()

        await db.updatePurchase(
            pi.metadata.user_session!,
            pi.id,
            {
                product: await db.getProductById(Number(pi.metadata.product_id)),
                payment: pi,
                process: {
                    viewed: false
                }
            }
        )
        return c.text("Webhook received");
    } catch (err) {
        return c.text("Internal Server Error.", 500);
    }
})

export default createHonoServer({
    app
})