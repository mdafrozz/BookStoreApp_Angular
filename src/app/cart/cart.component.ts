import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { Cart } from '../model/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart: any;
  user: any;
  quantity: any;
  orderData: any[] =[];
  public cartModel: Cart = new Cart(); 
  
  constructor(private route: ActivatedRoute,private router: Router,
    private httpService: HttpService) { 
    }

    ngOnInit() {
      this.getUser();
      this.getCart();
      localStorage.removeItem('orderData')
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

    increment(cartId: any, bookId: any, userId: any, qty: any){
            this.quantity = qty;
            this.quantity++
            this.updateQty(cartId, bookId, userId, this.quantity)
    }

    decrement(cartId: any, bookId: any, userId: any, qty: any) {
      if (qty > 1) {
          console.log("decrement")
          this.quantity = qty;
          this.quantity--
          this.updateQty(cartId, bookId, userId, this.quantity)
      }
    }

    updateQty(cartId: any, bookId: any, userId: any, qty: any) {
      this.cartModel.cartId = cartId;
      this.cartModel.book_id = bookId;
      this.cartModel.user_id = userId;
      this.cartModel.quantity = qty;
      this.httpService.updateCartData(cartId,this.cartModel)
        .subscribe(data => {
          console.log(data.data);
          this.cart = data.data;
          window.location.reload()
        });
    }

    remove(cartId: any){
      this.httpService.removeItem(cartId)
        .subscribe(data => {
          var answer = window.confirm("Do you want to remove the Item from your cart ?");
        if (answer === true) {
            alert("Item removed successfully!!");
            window.location.reload();
            this.getCart();
        } else {
            window.location.reload();
        }
        });
    }

    placeOrder(){
      console.log(this.user)
      if(this.user == undefined){
        this.router.navigate(['login']);
      }
      else{
      this.httpService.addOrder(this.user.userId)
      .subscribe(data => {
        console.log(data.data);
        this.orderData = data.data
        localStorage.setItem('orderData', JSON.stringify(this.orderData));
        console.log(localStorage.getItem('orderData'))
        this.router.navigate(['order']);
      });
    }
    }
}
