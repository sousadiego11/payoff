export type Product = {
    id: number;
    name: string;
    price: number;
    oldPrice: number;
    progress: number;
    saleLabel: string;
    image: string;
};

export const products: Array<Product> = [
    { id: 1, name: "Aenean fringilla", price: 129.00, oldPrice: 199.00, progress: 75, saleLabel: "9/10", image: "https://picsum.photos/600" },
    { id: 2, name: "Fusce accumsan", price: 79.00, oldPrice: 129.00, progress: 45, saleLabel: "5/10", image: "https://picsum.photos/700" },
    { id: 3, name: "Mauris pulvinar", price: 39.00, oldPrice: 59.00, progress: 90, saleLabel: "9/10", image: "https://picsum.photos/800" }
];

export class DB {
    getProductById(id: number): Product {
        const product = products.find(p => p.id === id);
        if (!product) throw new Response("Product not found", { status: 404 });

        return product
    }
}