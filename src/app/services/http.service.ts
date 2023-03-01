import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient) { }

  baseUrl = "http://localhost:8080/book"

  getBooksData(): Observable<any> {
    return this.http.get(this.baseUrl + "/getall");
  }

  addItem(): Observable<any>{
    return this.http.get(this.baseUrl + "/getall");
  }
}
