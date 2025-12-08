import React, { useEffect, useState } from "react";
import type { Route } from "../+types/root";
import { useNavigate } from "react-router";
import { Button } from "~/components/button";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Payment Successful" }
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

                <div className="flex items-center justify-center mb-6">
                    <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold mb-2 text-green-700">Payment Successful!</h1>
                <p className="text-gray-600 mb-4">
                    Your payment has been completed. Thank you for your purchase!
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
