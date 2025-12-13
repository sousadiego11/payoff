import { products } from "~/server/database/Database";
import { Button } from "./button";
import type { Product } from "~/server/domain/Product";
import { useNavigation } from "react-router";
import { Glass } from "./glass";

export function ProductsList({ onCheckout, onPayIntent }: { onCheckout: (p: Product) => void; onPayIntent: (p: Product) => void; }) {

    const navigation = useNavigation();
    const isLoading = navigation.state !== "idle";

    return (
        <Glass className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12 p-4 sm:p-5 md:p-6">
            {products.map(p => (
                <div key={p.id} className="relative bg-white rounded-xl shadow-md overflow-hidden p-3 sm:p-4 flex flex-col transform hover:scale-102 hover:shadow-xl transition-transform duration-200">
                    <img src={p.image} alt={p.name} className="w-full h-32 sm:h-40 object-cover rounded-lg" />

                    <div className="mt-3 sm:mt-4 flex-1">
                        <h3 className="font-bold text-base sm:text-lg">{p.name}</h3>

                        <div className="flex items-baseline gap-2 sm:gap-3 mt-2">
                            <span className="text-green-500 font-bold text-base sm:text-lg">${p.price}</span>
                            <span className="line-through text-gray-400 text-xs sm:text-sm">${p.oldPrice}</span>
                        </div>

                        <div className="mt-3 sm:mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                                <div className="bg-gray-600 h-2 sm:h-3 rounded-full" style={{ width: p.progress + "%" }} />
                            </div>

                            <div className="mt-2 sm:mt-3 flex items-center justify-between">
                                <span className="text-xs sm:text-sm bg-gray-100 px-2 sm:px-3 py-1 rounded-full text-gray-700">{p.saleLabel} Sale</span>
                                <span className="text-xs text-gray-500">{p.progress}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 sm:mt-4 flex">
                        <Button loading={isLoading} onClick={() => onPayIntent(p)} className="w-full sm:w-auto">
                            Buy Now!
                        </Button>
                    </div>
                </div>
            ))}
        </Glass>
    );
}
