import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form;
  errorMsg = ''
  constructor(private router: Router, private productsService: ProductsService) { }

  get firstname() {
    return this.form.get('firstName')
  }
  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.minLength(6)])
    });
  }

  onSubmit() {
    let registeredUsersData = JSON.parse(localStorage.getItem('userData')) || [];
    const index = registeredUsersData.findIndex((item) => (item.email === this.form.value.email && item.password === this.form.value.password));
    if (index >= 0) {
      registeredUsersData[index].isActive = true;
      this.productsService.setLoggedInUser(registeredUsersData[index].name)
      localStorage.setItem("userData", JSON.stringify(registeredUsersData));
      this.router.navigateByUrl('/product');
      this.errorMsg = '';
    } else {
      this.errorMsg = 'Please enter valid username and password'
    }
  }
}
