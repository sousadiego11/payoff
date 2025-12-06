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
    { id: 1, name: "Aenean fringilla", price: 129, oldPrice: 199, progress: 75, saleLabel: "9/10", image: "https://picsum.photos/600" },
    { id: 2, name: "Fusce accumsan", price: 79, oldPrice: 129, progress: 45, saleLabel: "5/10", image: "https://picsum.photos/700" },
    { id: 3, name: "Mauris pulvinar", price: 39, oldPrice: 59, progress: 90, saleLabel: "9/10", image: "https://picsum.photos/800" }
];