import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories = [];
  products = [];
  filteredProducts = [];

  constructor(private productsService: ProductsService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const categoryReq = this.productsService.getCategories();
    const productReq = this.productsService.getProductList();
    const requestArray = [];
    requestArray.push(categoryReq);
    requestArray.push(productReq);

    forkJoin(requestArray).subscribe(results => {
      this.setCategories(results[0]);
      this.setProducts(results[1]);
      const id = this._activatedRoute.snapshot.queryParamMap.get('id') || '';
      if (id) {
        this.setActivatedProduct(id);
      }});
  }

  setCategories(items) {
    this.categories = items.filter((item) => item.enabled)
      .sort((a, b) => a.order - b.order);

    this.categories = this.categories.map((category) => {
      category.isActive = false;
      return category;
    })
  }

  setProducts(products) {
    this.products = products;
    this.filteredProducts = products;
  }

  setActivatedProduct(productId) {
    const id = this.categories.findIndex((obj) => obj.id === productId);
    if (!this.categories[id].isActive) {
      this.filteredProducts = this.products.filter((product) => product.category === productId);
    } else {
      this.filteredProducts = this.products;
    }

    this.categories.forEach((category, index) => {
      if (index === id) {
        category.isActive = !category.isActive;
      } else {
        category.isActive = false;
      }
    })
  }

  setCartItems(product) {
    if (!this.productsService.cartItems[product.id]) {
      this.productsService.cartItems[product.id] = {};
      this.productsService.cartItems[product.id].count = 1;
      this.productsService.cartItems[product.id].imageUrl = product.imageURL;
      this.productsService.cartItems[product.id].name = product.name;
      this.productsService.cartItems[product.id].price = product.price;
    } else {
      this.productsService.cartItems[product.id].count += 1;
    }
    let x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 800);
  }

}
