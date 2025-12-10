import Stripe from 'stripe'
import { DB, type Product } from '../database/Database'
import { Currency } from '~/utils/Currency';
import { StripeMaker } from './StripeMaker';

export class StripeIntentPort {
    async create(product: Product, currency: string, userSession: string) {
        const stripeClient = StripeMaker()
        const paymentIntent = await stripeClient.paymentIntents.create({
            amount: Currency.toStripeAmount(product.price),
            currency: currency.toLowerCase(),
            metadata: {
                product_id: product.id.toString(),
                user_session: userSession
            }
        });

        return paymentIntent
    }
}