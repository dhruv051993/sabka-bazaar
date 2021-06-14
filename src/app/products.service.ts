import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private serverUrl = 'http://localhost:5000';
  private userData = new BehaviorSubject<string>('');
  cartItems = {};
  userDetails = this.userData.asObservable();

  constructor(private http: HttpClient) { }

  public getBanners(): Observable<any> {
    return this.http.get('assets/server/banners/index.get.json').pipe(
      catchError(this.handleError)
    );
  }

  public getCategories(): Observable<any> {
    return this.http.get('assets/server/categories/index.get.json').pipe(
      catchError(this.handleError)
    );
  }

  public getProductList(): Observable<any> {
    return this.http.get('assets/server/products/index.get.json').pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }


  setDataInLocalStorage(data: any) {
    let registeredUsersData = JSON.parse(localStorage.getItem('userData')) || [];
    registeredUsersData.push(data);
    localStorage.setItem("userData", JSON.stringify(registeredUsersData));
    this.userData.next(data.name);
  }

  clearLocalStorage() {
    var retrievedObject = JSON.parse(localStorage.getItem('userData')) || [];
    retrievedObject.forEach((item) => {
      if (item.isActive) {
        item.isActive = false;
      }
    });
    localStorage.setItem("userData", JSON.stringify(retrievedObject));
    this.userData.next('');
  }

  getSignedInUser() {
    let registeredUsersData = JSON.parse(localStorage.getItem('userData')) || [];
    if (registeredUsersData.length > 0) {
      const activeUser = registeredUsersData.filter((item) => item.isActive);
      if (activeUser.length > 0) {
        this.userData.next(activeUser[0].name);
      }
    }
  }

  setLoggedInUser(name) {
    this.userData.next(name);
  }
}