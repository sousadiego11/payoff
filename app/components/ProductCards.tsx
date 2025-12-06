type Product = {
    id: number;
    name: string;
    price: number;
    oldPrice: number;
    progress: number;
    saleLabel: string;
    image: string;
};

const products: Array<Product> = [
    { id: 1, name: "Aenean fringilla", price: 129, oldPrice: 199, progress: 75, saleLabel: "9/10", image: "https://picsum.photos/600" },
    { id: 2, name: "Fusce accumsan", price: 79, oldPrice: 129, progress: 45, saleLabel: "5/10", image: "https://picsum.photos/700" },
    { id: 3, name: "Mauris pulvinar", price: 39, oldPrice: 59, progress: 90, saleLabel: "9/10", image: "https://picsum.photos/800" }
];

export function ProductCards({ onCheckout, onPayIntent }: { onCheckout: (p: Product) => void; onPayIntent: (p: Product) => void; }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map(p => (
                <div key={p.id} className="relative bg-white rounded-xl shadow-md overflow-hidden p-4 flex flex-col transform hover:scale-102 hover:shadow-xl transition-transform duration-200">
                    <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded-lg" />

                    <div className="mt-4 flex-1">
                        <h3 className="font-bold text-lg">{p.name}</h3>

                        <div className="flex items-baseline gap-3 mt-2">
                            <span className="text-green-500 font-bold text-lg">${p.price}</span>
                            <span className="line-through text-gray-400 text-sm">${p.oldPrice}</span>
                        </div>

                        <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-gray-600 h-3 rounded-full" style={{ width: p.progress + "%" }} />
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700">{p.saleLabel} Sale</span>
                                <span className="text-xs text-gray-500">{p.progress}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                        <button
                            onClick={() => onCheckout(p)}
                            type="button"
                            className="cursor-pointer flex-1 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition"
                        >
                            Checkout Integration
                        </button>
                        <button
                            onClick={() => onPayIntent(p)}
                            type="button"
                            className="cursor-pointer flex-1 ml-3 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 transition"
                        >
                            Pay Intent Integration
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
