import React, { useEffect, useState } from "react";
import type { Route } from "../+types/root";
import { useNavigate } from "react-router";
import { Button } from "~/components/button";
import { Spinner } from "~/components/spinner";
import { Glass } from "~/components/glass";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Payment Processing" }
    ];
}

export default function PaymentProcessed(props: Route.ComponentProps) {
    const navigate = useNavigate();
    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        const t = setInterval(() => setSecondsLeft(s => s - 1), 1000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        if (secondsLeft <= 0) navigate("/");
    }, [secondsLeft, navigate]);

    return (
        <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-blue-100 to-purple-200 p-4 sm:p-6">
            <Glass className="max-w-2xl w-full p-6 sm:p-8 text-center flex flex-col items-center gap-4 sm:gap-6">
                {/* Processing spinner */}
                <Spinner className="text-indigo-600 h-10 w-10 sm:h-12 sm:w-12" />

                <h1 className="text-xl sm:text-2xl font-bold">Your payment is being processed</h1>

                <p className="text-sm sm:text-base text-gray-700">
                    We received your payment request and it may take a few moments to confirm it.
                    You will be notified once the status is updated.
                </p>

                <div className="text-xs sm:text-sm text-gray-700">
                    Redirecting to the home page in{" "}
                    <span className="font-medium">{secondsLeft}</span> seconds...
                </div>

                <Button
                    onClick={() => navigate('/')}
                    className="w-full sm:w-36 py-2"
                >
                    Go now
                </Button>
            </Glass>
        </main>
    );
}
