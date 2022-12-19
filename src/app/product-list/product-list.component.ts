import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { CartService } from '../shared/services/cart.service';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(c=> this.products = c);
  }

  addToCart(id: number)
  {
     this.cartService.addToCart(id);
  }

  removeFromCart(id: number)
  {
     this.cartService.removeFromCart(id);
  }

  isProductInCart(id: number): boolean
  {
    return this.cartService.isProductInCart(id);
  }
  
  isCartEmpty(): boolean
  {
    return this.cartService.isCartEmpty();
  }

}
