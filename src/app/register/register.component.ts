import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form;
  errorMsg = '';
  constructor(private router: Router, private productsService: ProductsService) { }

  get firstname() {
    return this.form.get('firstName')
  }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [ Validators.minLength(6)])
    });
  }

  onSubmit() {
    const usrData = {
      name: this.form.value.firstName, email: this.form.value.email,
      password: this.form.value.password, isActive: true
    };
    const registeredUsersData = JSON.parse(localStorage.getItem('userData')) || [];
    const index = registeredUsersData.findIndex((item) => item.email === usrData.email);
    if (index === -1) {
      this.errorMsg = '';
      this.productsService.setDataInLocalStorage(usrData);
      this.router.navigateByUrl('/product');
    } else {
      this.errorMsg = 'User with this emailId already exist';
    }
  }
}
