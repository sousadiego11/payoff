
export function Header() {
    return (
        <header className="flex items-center justify-between rounded-xl p-6 bg-white/40 backdrop-blur-md border border-white/30 shadow-lg">
            <div className="max-w-xl">
                <h1 className="text-gray-800 text-6xl font-extrabold leading-tight">
                    Welcome to <span className="text-indigo-600">Payoff!</span>
                </h1>

                <p className="text-gray-700 mt-3 text-lg">
                    A clean and modern environment to test Stripe integrations.
                </p>

                <p className="text-gray-600 mt-2 text-base">
                    Explore and experiment with Checkout, Payment Intents, and Webhooks —
                    fully implemented and ready for testing.
                </p>
            </div>
        </header>
    )
}