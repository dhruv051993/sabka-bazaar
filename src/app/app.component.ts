import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from './modal/modal.service';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  categories = [];
  products = [];
  filteredProducts = [];
  signedInUser = '';

  constructor(private productsService: ProductsService, private modalService: ModalService, private router: Router) { }

  ngOnInit() {
    this.productsService.getSignedInUser();
    this.productsService.userDetails.subscribe((username) => {
      this.signedInUser = username;
    });
    this.productsService.getCategories().subscribe((items) => {
      this.categories = items.filter((item) => item.enabled)
        .sort((a, b) => a.order - b.order);
    });

    this.productsService.getProductList().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  setProduct(productId) {
    this.filteredProducts = this.products.filter((product) => product.category === productId);
  }

  onSignOut() {
    this.productsService.clearLocalStorage();
    this.router.navigateByUrl('/login');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
}
