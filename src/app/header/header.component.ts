import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../model/cart.model';
import { User } from '../model/user.model';
import { HttpService } from '../services/http.service';
import { GlobalSearchServiceService } from '../services/global-search-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: User = new User();
  email: any;
  cart: any;
  cartCount: number = 0;
  searchedBooks: any;
  key: any;

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }
  
  constructor(private route: ActivatedRoute,private router: Router,
    private httpService: HttpService, private globalSearchService: GlobalSearchServiceService) { 
    }

  ngOnInit() {
    this.getUser();
    this.getCart();
  }

  getUser(){
    this.email= localStorage.getItem('email');
    this.httpService.getUser(this.email)
      .subscribe(data => {
        this.user = data.data;
      });
  }

  getCart(){
    this.httpService.getCartData()
      .subscribe(data => {
        this.cart = data.data;
        this.cartCount = this.cart.length;
      });
  }

public onInput(event: any){
  // this pushes the input value into the service's Observable.
  this.globalSearchService.searchTerm.next(event.target.value);
}

  logout(){
    localStorage.clear();
    location.reload();
  }
}
