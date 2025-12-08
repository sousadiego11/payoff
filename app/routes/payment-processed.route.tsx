import React, { useEffect, useState } from "react";
import type { Route } from "../+types/root";
import { useNavigate } from "react-router";
import { Button } from "~/components/button";
import { Spinner } from "~/components/spinner";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Payment Processing" }
    ];
}

export default function PaymentProcessed(props: Route.ComponentProps) {
    const navigate = useNavigate();
    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        const t = setInterval(() => {
            setSecondsLeft(s => s - 1);
        }, 1000);

        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        if (secondsLeft <= 0) {
            navigate("/");
        }
    }, [secondsLeft, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">

                {/* Processing spinner */}
                <div className="flex items-center justify-center mb-6">
                    <Spinner />
                </div>

                <h1 className="text-2xl font-bold mb-2">Your payment is being processed</h1>

                <p className="text-gray-600 mb-4">
                    We received your payment request and it may take a few moments to confirm it.
                    You will be notified once the status is updated.
                </p>

                <div className="text-sm text-gray-700 mb-6">
                    Redirecting to the home page in{" "}
                    <span className="font-medium">{secondsLeft}</span> seconds...
                </div>

                <div className="flex justify-center">
                    <Button
                        onClick={() => navigate('/')}
                    >
                        Go now
                    </Button>
                </div>
            </div>
        </div>
    );
}
