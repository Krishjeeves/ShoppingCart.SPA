import { Component, OnInit } from '@angular/core';
import { Cart } from '../shared/models/cart';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Cart | undefined;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems("AUD").subscribe(c=>this.cart = c);
  }

  total(): number {
    if(this.cart)
      return this.cart.cartItems.map(c=>c.price).reduce((x,y) =>x+y) + this.cart.shippingCost;
    return 0;
  }

}
