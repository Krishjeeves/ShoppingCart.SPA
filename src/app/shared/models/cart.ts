import { Product } from "./product";

export interface Cart {
    cartItems: Product[];
    shippingCost: number;
    currency: string;
}