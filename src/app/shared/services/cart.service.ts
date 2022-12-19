import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart';

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

    cartItems(currency: string): Observable<Cart>
    {
      let productIds = Array.from(this.cartItemIds);
      return this.httpClient.post<Cart>(`${environment.apiUrl}/cart`,{productIds, currency});
    }
}
