import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import type Stripe from "stripe";
import PaymentScreen from "~/components/payment-screen";
import { DB, type Product } from "~/server/database/Products";
import { StripeIntentPort } from "~/server/stripe/StripeIntentPort";
import { PaymentIntentForm } from "../components/payment-intent-form";
import type { Route } from "../+types/root";
import { Currency } from "~/utils/Currency";

const stripePromise = loadStripe("pk_test_51SaHXqBN7ROgVArwJbgHVc6HGNkgdwKOPCb8KgjbJMKBX4DrCXZEahC9yP8HGxgDQostnR3ooIBmkbrILUZ9CrjL00P7CPcIGy");

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "PaymentIntent" }
    ];
}

export async function loader({ params }: Route.LoaderArgs) {
    const { productId } = params as { productId: string };

    const product = new DB().getProductById(Number(productId));
    const intent = await new StripeIntentPort().create(product, Currency.getCurrencyCode())
    return { intent, product }
}

export default function PaymentIntent(props: Route.ComponentProps) {
    const data = props.loaderData as unknown as { intent: Stripe.Response<Stripe.PaymentIntent>, product: Product };

    return (
        <PaymentScreen product={data.product}>
            <Elements stripe={stripePromise} options={{ clientSecret: data.intent.client_secret! }}>
                <PaymentIntentForm intent={data.intent} />
            </Elements>
        </PaymentScreen>
    )
}
