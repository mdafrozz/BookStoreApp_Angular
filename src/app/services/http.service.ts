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

  getBooksData(): Observable<any> {
    return this.http.get(this.bookUrl + "/getall");
  }

  addItem(): Observable<any>{
    return this.http.get(this.bookUrl + "/getall");
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
