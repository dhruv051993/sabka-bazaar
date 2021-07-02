import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems = {};
  totalCartPrice = 0;
  totalCartItems = 0;
  Object = Object;

  constructor(private productsService: ProductsService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.productsService.cartData.subscribe((data) => {
      this.cartItems = data;
      this.calculateTotal();
    });
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  add(key) {
    this.cartItems[key].count += 1;
    this.productsService.setCartItem(this.cartItems);
    this.calculateTotal();
  }

  subtract(key) {
    this.cartItems[key].count -= 1;
    if (this.cartItems[key].count === 0) {
      delete this.cartItems[key];
    }
    this.productsService.setCartItem(this.cartItems);
    this.calculateTotal();
  }

  calculateTotal() {
    let totalCartPrice = 0;
    let totalCartItems = 0;
    for (const key in this.cartItems) {
      totalCartItems += this.cartItems[key].count;
      totalCartPrice += this.cartItems[key].count * this.cartItems[key].price;
    }
    this.totalCartPrice = totalCartPrice;
    this.totalCartItems = totalCartItems;
  }


}
