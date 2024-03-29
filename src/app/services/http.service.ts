import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient) { }

  bookUrl = "http://localhost:8080/book"
  userUrl = "http://localhost:8080/user"
  cartUrl = "http://localhost:8080/cart"
  orderUrl = "http://localhost:8080/orders"


  getBooksData(): Observable<any> {
    return this.http.get(this.bookUrl + "/getall");
  }

  addItem(obj: any): Observable<any>{
    return this.http.post(this.cartUrl + "/insert",obj);
  }

  getCartData(): Observable<any> {
    return this.http.get(this.cartUrl + "/getall");
  }

  updateCartData(cartId: any, obj: any): Observable<any> {
    return this.http.put(this.cartUrl + `/updateby/${cartId}`,obj);
  }

  removeItem(cartId: any): Observable<any> {
    return this.http.delete(this.cartUrl + `/delete/${cartId}`);
  }

  addOrder(Id: number): Observable<any> {
    return this.http.post(this.orderUrl + `/add/${Id}`,{});
  }

  search(key: any): Observable<any>{
    return this.http.get(this.bookUrl + `/searchby/${key}`);
  }

  sortAsc(): Observable<any>{
    return this.http.get(this.bookUrl + "/sortbyasc");
  }

  sortDsc(): Observable<any>{
    return this.http.get(this.bookUrl + "/sortbydsc");
  }

  registerUser(user: any): Observable<any>{
    return this.http.post(this.userUrl + "/register", user);
  }

  LoginUser(login: any): Observable<any>{
    return this.http.post(this.userUrl + "/login", login);
  }

  getUser(email: any): Observable<any>{
    return this.http.get(this.userUrl + `/getbyemail/${email}`);
  }
}
