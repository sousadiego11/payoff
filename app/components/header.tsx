import { Link, useNavigate } from "react-router";
import { Glass } from "./glass";

export function Header() {
    const nav = useNavigate()

    return (
        <Glass onClick={() => nav('/')} className="flex items-center justify-between p-6">
            <div className="max-w-xl">
                <h1 className="text-gray-800 text-6xl font-extrabold leading-tight">
                    Welcome to{" "}
                    <Link
                        to="/"
                        className="
                            text-indigo-600
                            cursor-pointer
                            inline-block
                            transition-transform duration-300
                            hover:scale-108
                        "
                    >
                        Payoff!
                    </Link>
                </h1>

                <p className="text-gray-700 mt-3 text-lg">
                    A clean and modern environment to test Stripe integrations.
                </p>

                <p className="text-gray-600 mt-2 text-base">
                    Explore and experiment with Checkout, Payment Intents, and Webhooks —
                    fully implemented and ready for testing.
                </p>
            </div>
        </Glass>
    )
}