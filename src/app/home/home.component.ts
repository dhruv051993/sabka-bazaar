import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories = [];

  constructor(private productsService: ProductsService, private _route: Router) { }

  ngOnInit(): void {
    this.productsService.getCategories().subscribe((categories) => {
      this.categories = categories.filter((item) => item.enabled)
      .sort((a,b) => a.order - b.order);
    })
  }

  redirect(id) {
    this._route.navigate(['/product'], {
      queryParams: { id: id }
    })
  }

}
