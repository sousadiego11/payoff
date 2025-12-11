import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import type Stripe from "stripe";
import { Button } from "~/components/button";
import { Currency } from "~/server/domain/Currency";

export function PaymentIntentForm({ intent }: { intent: Stripe.Response<Stripe.PaymentIntent> }) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        setIsLoading(true)
        e.preventDefault();

        if (!stripe || !elements) return;
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: (typeof window !== 'undefined' ? window.location.origin : '') + '/payment-processed',
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message!);
        } else {
            setMessage("An unexpected error occurred.");
        }
        setIsLoading(false)
    };

    return (
        <form id="payment-form" className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <AddressElement id="address-element" options={{ mode: 'shipping' }} />
            <PaymentElement id="payment-element" options={{ layout: 'accordion' }} />
            <Button
                id="submit"
                type="submit"
                disabled={isLoading || !stripe || !elements}
                className="w-full py-3 text-base font-semibold rounded-xl"
                loading={isLoading}
            >
                Pay {Currency.format(Currency.fromStripeAmount(intent.amount))} now
            </Button>
        </form>
    )
}