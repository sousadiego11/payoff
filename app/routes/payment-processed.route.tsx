import React, { useEffect, useState } from "react";
import type { Route } from "../+types/root";
import { useNavigate } from "react-router";
import { Button } from "~/components/button";
import { Spinner } from "~/components/spinner";
import { PaymentProcessingCard } from "~/components/payment-processing-card";

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
            <PaymentProcessingCard
                navigate={() => navigate('/')}
                secondsLeft={secondsLeft}
            />
        </div>
    );
}
