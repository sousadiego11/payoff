import { useParams } from "react-router";
import type { Route } from "../+types/root";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Checkout" }
    ];
}

export default function Checkout() {
    const a = useParams()
    console.log("🚀 ~ Checkout ~ a:", a)

    return (
        <main className="min-h-screen bg-linear-to-br from-indigo-50 via-blue-100 to-purple-200 p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center sm:text-left text-xl sm:text-2xl font-bold p-4 sm:p-6">
                    CHECKOUT PAGE
                </div>
            </div>
        </main>
    );
}
