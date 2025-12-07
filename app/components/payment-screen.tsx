import React from "react";
import type { Product } from "~/server/database/Products";
import { Currency } from "~/utils/Currency";

type Props = {
    product: Product;
    children?: React.ReactNode; // payment form (Elements + PaymentElement)
};

export function PaymentScreen({ product, children }: Props) {

    const price = Currency.format(product.price);
    const oldPrice = Currency.format(product.oldPrice);

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex flex-col lg:flex-row gap-6">
                <main className="w-full lg:w-[65%]">
                    <div className="bg-white rounded-xl shadow-md p-6 h-full">
                        {children ?? (
                            <div className="py-12 text-center text-gray-400">
                                Payment form goes here (pass Elements + PaymentElement as children)
                            </div>
                        )}
                    </div>
                </main>

                <aside className="w-full lg:w-[35%]">
                    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4">
                        <div className="relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-lg"
                            />

                            {product.saleLabel && (
                                <span className="absolute left-4 top-4 bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                                    {product.saleLabel} Sale
                                </span>
                            )}
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>

                            <div className="flex items-baseline gap-3 mt-2">
                                <span className="text-green-500 font-bold text-xl">{price}</span>
                                {oldPrice !== undefined && (
                                    <span className="line-through text-gray-400 text-sm">{oldPrice}</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600">
                                Selected product: <span className="font-medium text-gray-800">{product.name}</span>
                            </p>
                        </div>

                        <div className="mt-auto">
                            <div className="text-sm text-gray-500">Total</div>
                            <div className="text-2xl font-bold text-gray-900">{price}</div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default PaymentScreen;
