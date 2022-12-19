import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

   private cartItemIds = new Set<number>();
  constructor(private httpClient:HttpClient) { }

    addToCart(productId: number)
    {
      this.cartItemIds.add(productId);
    }

    removeFromCart(productId: number)
    {
      this.cartItemIds.delete(productId);
    }

    isProductInCart(productId: number): boolean
    {
      return this.cartItemIds.has(productId);
    }

    isCartEmpty(): boolean
    {
      return this.cartItemIds.size === 0;
    }
}
