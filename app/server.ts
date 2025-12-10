import { Hono } from "hono";
import { createHonoServer } from "react-router-hono-server/node";
import { StripeMaker } from "./server/stripe/StripeMaker";
import type Stripe from "stripe";
import { DB } from "./server/database/Database";

const app = new Hono()

app.post("/api/webhook", async (c) => {
    const stripe = StripeMaker()
    const buf = Buffer.from(await c.req.arrayBuffer());

    const signature = c.req.header('stripe-signature');
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!signature || !endpointSecret) return c.text("Missing signature or endpoint secret", 400);

    try {
        const event = stripe.webhooks.constructEvent(
            buf,
            signature,
            endpointSecret
        );

        const pi: any = event.data.object;
        const db = await DB.make()

        await db.updatePurchase(
            pi.object.metadata.user_session!,
            pi.id,
            {
                product: await db.getProductById(Number(pi.object.metadata.product_id)),
                payment: pi,
                process: {
                    viewed: false
                }
            }
        )
        return c.text("Webhook received");
    } catch (err) {
        return c.text("Webhook signature verification failed.", 400);
    }
})

export default createHonoServer({
    app
})