import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

   private readonly cartItemsKey: string = "CART_ITEMS";
   //This should be set a subject with components listening for updates in multiple tabs.
   private cartItemIds = new Set<number>();
   constructor(private httpClient:HttpClient) {
      let storedItems = localStorage.getItem(this.cartItemsKey);
      if(storedItems && storedItems.length)
        this.cartItemIds = new Set(JSON.parse(storedItems));
    }

    updateCartItems()
    {
      localStorage.setItem(this.cartItemsKey, JSON.stringify(Array.from(this.cartItemIds)));
    }

    addToCart(productId: number)
    {
      this.cartItemIds.add(productId);
      this.updateCartItems();
    }

    removeFromCart(productId: number)
    {
      this.cartItemIds.delete(productId);
      this.updateCartItems();
    }

    isProductInCart(productId: number): boolean
    {
      return this.cartItemIds.has(productId);
    }

    isCartEmpty(): boolean
    {
      return this.cartItemIds.size === 0;
    }

    cartItems(currency: string): Observable<Cart>
    {
      let productIds = Array.from(this.cartItemIds);
      return this.httpClient.post<Cart>(`${environment.apiUrl}/cart`,{productIds, currency});
    }
}
