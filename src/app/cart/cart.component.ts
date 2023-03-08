import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart: any;
  user: any;
  
  
  constructor(private route: ActivatedRoute,private router: Router,
    private httpService: HttpService) { 
    }

    ngOnInit() {
      this.getUser();
      this.getCart();
    }

    getUser(){
      this.httpService.getUser(localStorage.getItem('email'))
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
        });
    }
}
