import Stripe from 'stripe'
import { DB, type Product } from '../database/Products'

export class StripeIntentPort {
    async create(pId: Product['id']) {
        const product = new DB().getProductById(pId);
        const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!)
        const paymentIntent = await stripeClient.paymentIntents.create({
            amount: product.price * 100,
            currency: "brl",
        });

        return paymentIntent
    }
}