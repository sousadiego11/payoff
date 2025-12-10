import type Stripe from "stripe";

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

type ClientSessionId = string
type PurchaseId = string
type PurchaseInformation = {
    product: Product,
    payment: Stripe.PaymentIntent,
    process: {
        viewed: boolean
    }
}
type ClientPurchases = Map<PurchaseId, PurchaseInformation>

export const purchases = new Map<ClientSessionId, ClientPurchases>()

export class DB {
    public static async make() {
        return new DB()
    }

    async getProductById(id: number): Promise<Product> {
        const product = products.find(p => p.id === id);
        if (!product) throw new Response("Product not found", { status: 404 });

        return product
    }

    async updatePurchase(userSession: ClientSessionId, purchaseId: PurchaseId, update: PurchaseInformation) {
        const userPurchases: ClientPurchases = purchases.get(userSession) || new Map()
        userPurchases.set(purchaseId, update)
    }

    async getPurchases(userSession: ClientSessionId): Promise<Array<PurchaseInformation>> {
        const p = purchases.get(userSession) || new Map()
        return Array.from(p.values())
    }
}