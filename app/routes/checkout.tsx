import { useParams } from "react-router";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Checkout" }
    ];
}

export default function Checkout() {
    const a = useParams()
    console.log("🚀 ~ Checkout ~ a:", a)

    return <div>CHECKOUT PAGE</div>;
}
