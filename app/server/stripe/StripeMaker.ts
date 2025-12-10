import type { HonoRequest } from "hono";
import Stripe from "stripe";

export function StripeMaker() {
    return new Stripe(process.env.STRIPE_SECRET_KEY!)
}

export async function StripeEventConstructor(req: HonoRequest) {
    const signature = req.header('stripe-signature');
    const stripe = StripeMaker()
    const reqraw = await req.text()
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !endpointSecret) throw new Error("Missing signature or endpoint secret");

    return stripe.webhooks.constructEvent(
        reqraw,
        signature,
        endpointSecret
    );
}