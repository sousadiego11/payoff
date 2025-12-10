import type { PurchaseInformation } from "~/server/database/Database";

type Props = {
    purchases: PurchaseInformation[];
    className?: string;
};

function PaymentStatusBadge({ status }: { status: string }) {
    const colors: Record<string, string> = {
        succeeded: "bg-green-100 text-green-800",
        processing: "bg-blue-100 text-blue-700",
        requires_action: "bg-yellow-100 text-yellow-700",
        requires_payment_method: "bg-amber-100 text-gray-700",
        canceled: "bg-red-100 text-red-700",
        requires_confirmation: "bg-purple-100 text-purple-700",
    };

    const label: Record<string, string> = {
        succeeded: "Succeeded",
        processing: "Processing",
        requires_action: "Action Required",
        requires_payment_method: "Payment Method Needed",
        canceled: "Canceled",
        requires_confirmation: "Awaiting Confirmation",
    };

    const color = colors[status] ?? "bg-gray-100 text-gray-700";
    const text = label[status] ?? status;

    return (
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${color}`}>
            {text}
        </span>
    );
}

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
                    const amount = ((payment.amount ?? 0) / 100).toFixed(2);
                    const currency = payment.currency?.toUpperCase() ?? "";
                    const method = payment.payment_method_types?.[0] ?? "unknown";

                    return (
                        <div key={i} className="p-4 flex flex-col gap-2 bg-white rounded-xl">
                            {/* Header */}
                            <div className="flex gap-2 items-center justify-between">
                                <div className="font-semibold text-gray-900">
                                    {p.product.name}
                                </div>
                                <PaymentStatusBadge status={payment.status} />
                                <ViewedBadge viewed={p.process.viewed} />
                            </div>

                            <div className="text-sm text-gray-700">
                                <strong>Amount:</strong> {currency} {amount}
                            </div>

                            <div className="text-sm text-gray-700">
                                <strong>Method:</strong> {method}
                            </div>

                            <div className="text-sm text-gray-700">
                                <strong>Payment ID:</strong> {payment.id}
                            </div>

                            {payment.created && (
                                <div className="text-xs text-gray-500">
                                    {new Date(payment.created * 1000).toLocaleString("en-US")}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
