import type { PurchaseInformation } from "~/server/database/Database";
import { Currency } from "~/utils/Currency";
import { PaymentStatusBadge } from "./payment-status-badge";

type Props = {
    purchases: PurchaseInformation[];
    className?: string;
};

function ViewedBadge({ viewed }: { viewed: boolean }) {
    return (
        <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${viewed
                ? "bg-gray-100 text-gray-600"
                : "bg-blue-100 text-blue-700"
                }`}
        >
            {viewed ? "Viewed" : "New"}
        </span>
    );
}

export default function PurchasesCard({ purchases }: Props) {
    return (
        <div
            className={`rounded-xl p-4 bg-white/40 backdrop-blur-md border border-white/30 shadow-lg`}
        >
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg">Purchases</h3>
                <span className="text-sm text-gray-500">
                    {purchases.length} items
                </span>
            </div>

            <div className="flex flex-col gap-4 divide-y divide-gray-100 max-h-96 overflow-auto pr-2">
                {purchases.length === 0 && (
                    <div className="p-4 text-sm text-gray-600">
                        No purchases found.
                    </div>
                )}

                {purchases.map((p, i) => {
                    const payment = p.payment;
                    const amount = Currency.format(Currency.fromStripeAmount(payment.amount))

                    return (
                        <div key={i} className="p-4 flex flex-col gap-2 bg-white rounded-xl">
                            <div className="flex gap-2 items-center justify-between">
                                <div className="font-semibold text-gray-900">
                                    {p.product.name}
                                </div>
                                <PaymentStatusBadge purchase={p} />
                                <ViewedBadge viewed={p.process.viewed} />
                            </div>

                            <div className="text-sm text-gray-700">
                                <strong>Price:</strong> {amount}
                            </div>

                            <div className="text-sm text-gray-700">
                                <strong>Identifier:</strong> {payment.id}
                            </div>

                            <div className="text-xs text-gray-500">
                                {new Date(payment.created * 1000).toLocaleString("en-US")}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
