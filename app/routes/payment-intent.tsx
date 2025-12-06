import { useParams } from "react-router";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "PaymentIntent" }
    ];
}

export default function PaymentIntent() {
    const a = useParams()
    console.log("🚀 ~ Checkout ~ a:", a)

    return <div>CHECKOUT WITH PAYMENT INTENT PAGE</div>;
}
