import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../model/cart.model';
import { User } from '../model/user.model';
import { HttpService } from '../services/http.service';

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

  constructor(private route: ActivatedRoute,private router: Router,
    private httpService: HttpService) { 
    }

  ngOnInit() {
    this.getUser();
    this.getCart();
  }

  getUser(){
    this.email= localStorage.getItem('email');
    this.httpService.getUser(this.email)
      .subscribe(data => {
        console.log("Header",data.data.firstName);
        this.user = data.data;
      });
  }

  getCart(){
    this.httpService.getCartData()
      .subscribe(data => {
        console.log(data.data);
        this.cart = data.data;
        this.cartCount = this.cart.length;
      });
  }

  logout(){
    localStorage.clear();
    location.reload();
  }
}
