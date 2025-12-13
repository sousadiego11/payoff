import { Button } from "./button";
import { Spinner } from "./spinner";

export function PaymentProcessingCard({ navigate, secondsLeft }: { secondsLeft: number; navigate: () => void }) {
    return (
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">

            {/* Processing spinner */}
            <div className="flex items-center justify-center mb-4 sm:mb-6">
                <Spinner />
            </div>

            <h1 className="text-xl sm:text-2xl font-bold mb-2">Your payment is being processed</h1>

            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                We received your payment request and it may take a few moments to confirm it.
                You will be notified once the status is updated.
            </p>

            <div className="text-xs sm:text-sm text-gray-700 mb-4 sm:mb-6">
                Redirecting to the home page in{" "}
                <span className="font-medium">{secondsLeft}</span> seconds...
            </div>

            <div className="flex justify-center">
                <Button
                    onClick={() => navigate()}
                    className="w-full sm:w-auto"
                >
                    Go now
                </Button>
            </div>
        </div>
    )
}