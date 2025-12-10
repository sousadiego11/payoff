import type { Product } from "../domain/Product";
import type { Purchase } from "../domain/Purchase";
import type { Session } from "../domain/Session";

export const products: Array<Product> = [
    { id: 1, name: "Aenean fringilla", price: 129.00, oldPrice: 199.00, progress: 75, saleLabel: "9/10", image: "https://picsum.photos/600" },
    { id: 2, name: "Fusce accumsan", price: 79.00, oldPrice: 129.00, progress: 45, saleLabel: "5/10", image: "https://picsum.photos/700" },
    { id: 3, name: "Mauris pulvinar", price: 39.00, oldPrice: 59.00, progress: 90, saleLabel: "9/10", image: "https://picsum.photos/800" },
    { id: 3, name: "Emte Os", price: 39.00, oldPrice: 59.00, progress: 90, saleLabel: "9/10", image: "https://picsum.photos/900" }
];

export const purchases = new Map<Session.Id, Map<Purchase.Id, Purchase.Purchase>>()

export class DB {
    public static async make() {
        return new DB()
    }

    async getProductById(id: number): Promise<Product> {
        const product = products.find(p => p.id === id);
        if (!product) throw new Response("Product not found", { status: 404 });

        return product
    }

    async updatePurchase(purchase: Purchase.Purchase) {
        const userPurchases: Map<Purchase.Id, Purchase.Purchase> = purchases.get(purchase.session) || new Map()
        userPurchases.set(purchase.id, purchase)
        purchases.set(purchase.session, userPurchases)
    }

    async getPurchases(session: Session.Id): Promise<Array<Purchase.Purchase>> {
        const p = purchases.get(session) || new Map()
        return Array.from(p.values())
    }
}