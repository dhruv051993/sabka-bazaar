import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from './modal/modal.service';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  categories = [];
  products = [];
  filteredProducts = [];
  signedInUser = '';
  totalCartItems = 0;

  constructor(private productsService: ProductsService, private modalService: ModalService, private router: Router) {
    this.productsService.cartData.subscribe((cartItems) => {
      let total = 0;
      for (const item in cartItems) {
        total += cartItems[item].count;
      }
      this.totalCartItems = total;
    });
  }

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

  ngAfterViewInit() {
    const mainMenu: any = document.querySelector('.header__menu');
    const closeMenu: any = document.querySelector('.header__closeMenu');
    const openMenu: any = document.querySelector('.header__hamburger-menu');

    openMenu.addEventListener('click', () => {
      mainMenu.style.display = 'flex';
      mainMenu.style.top = '0';
    });

    closeMenu.addEventListener('click', () => {
      mainMenu.style.display = 'none';
      mainMenu.style.top = '-100%';
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

  redirect() {
    const mainMenu: any = document.querySelector('.header__menu');
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '-100%';
  }
}
