import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router";
import type { Route } from "./+types/home";
import { StripeIntentPort } from "~/server/stripe/StripeIntentPort";
import { DB } from "~/server/database/Products";
import type Stripe from "stripe";

const stripePromise = loadStripe("pk_test_51SaHXqBN7ROgVArwJbgHVc6HGNkgdwKOPCb8KgjbJMKBX4DrCXZEahC9yP8HGxgDQostnR3ooIBmkbrILUZ9CrjL00P7CPcIGy");

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "PaymentIntent" }
    ];
}

export async function loader({ params }: Route.LoaderArgs) {
    const { productId } = params as { productId: string };

    const intent = await new StripeIntentPort().create(Number(productId))
    return intent
}

export default function PaymentIntent(props: Route.ComponentProps) {
    const loaderData = props.loaderData as unknown as Stripe.Response<Stripe.PaymentIntent>
    return (
        <Elements stripe={stripePromise} options={{ clientSecret: loaderData.client_secret! }}>
            <form id="payment-form" >
                <PaymentElement id="payment-element" options={{ layout: 'accordion' }} />
                <button id="submit">
                    <span id="button-text">
                        Pay now
                    </span>
                </button>
            </form>
        </Elements>
    )
}
