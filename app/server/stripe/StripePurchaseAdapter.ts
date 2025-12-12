import Stripe from "stripe";
import { DB } from "../database/Database";
import { Currency } from "../domain/Currency";
import type { Product } from "../domain/Product";
import type { Purchase } from "../domain/Purchase";
import type { IPurchaseProcessor } from "../domain/PurchaseProcessor";
import type { Session } from "../domain/Session";
import { StripeMapper } from "./StripeMapper";

export class StripePurchaseAdapter implements IPurchaseProcessor {

    private constructor(
        private readonly db: DB,
        private readonly stripe: Stripe
    ) { }

    static async make() {
        const db = await DB.make();
        return new StripePurchaseAdapter(db, new Stripe(process.env.STRIPE_SECRET_KEY!))
    }

    async processPayment(req: Request): Promise<Purchase.Purchase> {
        const signature = req.headers.get('stripe-signature');
        const reqraw = await req.text()
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

        if (!signature || !endpointSecret) throw new Error("Missing signature or endpoint secret");

        const event = this.stripe.webhooks.constructEvent(
            reqraw,
            signature,
            endpointSecret
        );

        const payment = event.data.object as Stripe.PaymentIntent | Stripe.Charge;
        const product = await this.db.getProductById(Number(payment.metadata.product_id))

        return {
            id: payment.object === "charge" ? payment.payment_intent as string : payment.id,
            session: payment.metadata.user_session,
            product,
            viewed: false,
            payment: {
                status: StripeMapper.toDomainPurchaseStatus(payment),
                amount: payment.amount,
                created: payment.created
            }
        }

    }
    async createPayment(productId: Product["id"], userSession: Session.Id) {
        const product = await this.db.getProductById(Number(productId));
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: Currency.toStripeAmount(product.price),
            currency: Currency.getCurrencyCode().toLowerCase(),
            metadata: {
                product_id: product.id.toString(),
                user_session: userSession
            }
        });

        return paymentIntent
    }

}