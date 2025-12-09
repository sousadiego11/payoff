import Stripe from "stripe";

export function StripeMaker() {
    return new Stripe(process.env.STRIPE_SECRET_KEY!)
}