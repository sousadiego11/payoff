import Stripe from 'stripe'
import { type Product } from '../database/Products'
import { Currency } from '~/utils/Currency';
import { StripeMaker } from './StripeMaker';

export class StripeIntentPort {
    async create(product: Product, currency: string) {
        const stripeClient = StripeMaker()
        const paymentIntent = await stripeClient.paymentIntents.create({
            amount: Currency.toStripeAmount(product.price),
            currency: currency.toLowerCase(),
            metadata: {
                productId: product.id.toString()
            }
        });

        return paymentIntent
    }
}