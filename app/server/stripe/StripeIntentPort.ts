import Stripe from 'stripe'
import { DB, type Product } from '../database/Products'
import { Currency } from '~/utils/Currency';

export class StripeIntentPort {
    async create(product: Product, currency: string) {
        const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!)
        const paymentIntent = await stripeClient.paymentIntents.create({
            amount: Currency.toStripeAmount(product.price),
            currency: currency.toLowerCase(),
        });

        return paymentIntent
    }
}