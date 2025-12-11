import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import type Stripe from "stripe";
import PaymentIntentProduct from "~/components/payment-intent-product";
import { StripePurchaseAdapter } from "~/server/stripe/StripePurchaseAdapter";
import type { Route } from "../+types/root";
import { PaymentIntentForm } from "../components/payment-intent-form";
import { DB } from "~/server/database/Database";
import type { Product } from "~/server/domain/Product";
import { Header } from "~/components/header";
import { Glass } from "~/components/glass";

const stripePromise = loadStripe("pk_test_51SaHXqBN7ROgVArwJbgHVc6HGNkgdwKOPCb8KgjbJMKBX4DrCXZEahC9yP8HGxgDQostnR3ooIBmkbrILUZ9CrjL00P7CPcIGy");

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "PaymentIntent" }
    ];
}

export async function loader({ params }: Route.LoaderArgs) {
    const { productId, userSession } = params as { productId: string, userSession: string };

    const db = await DB.make();
    const adapter = await StripePurchaseAdapter.make()

    const product = await db.getProductById(Number(productId));
    const intent = await adapter.createPayment(Number(productId), userSession)

    return { intent, product }
}

export default function PaymentIntent(props: Route.ComponentProps) {
    const data = props.loaderData as unknown as { intent: Stripe.Response<Stripe.PaymentIntent>, product: Product };

    return (
        <main className="min-h-screen bg-linear-to-br from-indigo-50 via-blue-100 to-purple-200">
            <section className="px-48 pt-18">
                <Header />
            </section>

            <section className="px-48 pt-18">
                <Glass className="flex flex-row gap-12 p-6">
                    <div className="flex-2">
                        <Elements
                            stripe={stripePromise}
                            options={{ clientSecret: data.intent.client_secret! }}
                        >
                            <PaymentIntentForm intent={data.intent} />
                        </Elements>
                    </div>
                    <div className="flex-1">
                        <PaymentIntentProduct product={data.product} />
                    </div>
                </Glass>
            </section>
        </main>
    )
}
