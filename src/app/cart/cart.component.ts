import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems = {};
  total = 0;
  Object = Object;

  constructor(private productsService: ProductsService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.cartItems = this.productsService.cartItems;
    this.calculateTotal();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  add(key) {
    this.productsService.cartItems[key].count += 1;
    this.cartItems = this.productsService.cartItems;
    this.calculateTotal();
  }

  subtract(key) {
    this.productsService.cartItems[key].count -= 1;
    if (this.productsService.cartItems[key].count === 0) {
      delete this.productsService.cartItems[key];
    }
    this.cartItems = this.productsService.cartItems;
    this.calculateTotal();
  }

  calculateTotal() {
    let total = 0;
    for (const key in this.cartItems) {
      total += this.cartItems[key].count * this.cartItems[key].price;
    }
    this.total = total;
  }


}
