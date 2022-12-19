import { Product } from "./product";

export interface CartResponse {
    cartItems: Product[];
    shippingCost: number;
    currency: string;
}