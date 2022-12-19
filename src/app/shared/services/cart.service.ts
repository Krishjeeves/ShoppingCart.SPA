import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

   private readonly cartItemsKey: string = "CART_ITEMS";
   cartItemIds$ = new BehaviorSubject<Set<number>>(new Set<number>());
   storage$:Observable<Event>= fromEvent(window, 'storage');

   constructor(private httpClient:HttpClient) {
     this.restoreCartItems();      
     this.storage$.subscribe(()=> this.restoreCartItems()); 
    }
    
    restoreCartItems()
    {
      let storedItems = localStorage.getItem(this.cartItemsKey);
      if(storedItems && storedItems.length)
        this.cartItemIds$.next(new Set(JSON.parse(storedItems)));
    }

    updateCartItems()
    {
      localStorage.setItem(this.cartItemsKey, JSON.stringify(Array.from(this.cartItemIds$.value)));
    }

    addToCart(productId: number)
    {
      this.cartItemIds$.value.add(productId);
      this.updateCartItems();
    }

    removeFromCart(productId: number)
    {
      this.cartItemIds$.value.delete(productId);
      this.updateCartItems();
    }

    isProductInCart(productId: number): boolean
    {
      return this.cartItemIds$.value.has(productId);
    }

    isCartEmpty(): boolean
    {
      return this.cartItemIds$.value.size === 0;
    }

    cartItems(currency: string): Observable<Cart>
    {
      let productIds = Array.from(this.cartItemIds$.value);
      return this.httpClient.post<Cart>(`${environment.apiUrl}/cart`,{productIds, currency});
    }
}
