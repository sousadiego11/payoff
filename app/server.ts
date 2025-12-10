import { Hono } from "hono";
import { createHonoServer } from "react-router-hono-server/node";
import { StripeEventConstructor, StripeMaker } from "./server/stripe/StripeMaker";
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
    try {
        const event = await StripeEventConstructor(c.req)

        const payment = event.data.object as Stripe.PaymentIntent | Stripe.Charge;
        const isCharge = payment.object === "charge";
        const isPaymentIntent = payment.object === "payment_intent";

        if (!isCharge && !isPaymentIntent) return c.text("Unhandled object type", 400)

        const db = await DB.make()
        const product = await db.getProductById(Number(payment.metadata.product_id))

        await db.updatePurchase(
            payment.metadata.user_session!,
            isCharge ? payment.payment_intent as string : payment.id,
            {
                product,
                payment: payment,
                process: { viewed: false }
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