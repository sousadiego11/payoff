import React from "react";
import { Currency } from "~/server/domain/Currency";
import type { Product } from "~/server/domain/Product";

type Props = {
    product: Product;
};

export function PaymentIntentProduct({ product }: Props) {
    const price = Currency.format(product.price);
    const oldPrice = Currency.format(product.oldPrice);

    return (
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
    );
}

export default PaymentIntentProduct;
