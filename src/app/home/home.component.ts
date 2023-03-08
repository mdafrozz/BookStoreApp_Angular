import { Component,OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user.model';
import { Cart } from '../model/cart.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  bookCount: number = 0;
  booksList: any ;
  bookAdded: any;
  public user: User = new User();
  public cart: Cart = new Cart();

  
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.getBooks();
    this.getUser();
  } 


  addToCart(bId: number, index: any){
    if(this.user.userId == undefined)
    {
      this.router.navigate(['/login']);
    }
    else{
    this.bookAdded[index] = true
    this.cart.book_id = bId;
    this.cart.user_id = this.user.userId;
    this.cart.quantity = 1;
    this.httpService.addItem(this.cart).subscribe(response => {
      console.log(response.data)
    })
  }
  }

  getUser(){
    this.httpService.getUser(localStorage.getItem('email'))
      .subscribe(data => {
        console.log("Home",data.data.firstName);
        this.user = data.data;
      });
  }

  getBooks(){
    this.httpService.getBooksData().subscribe(response => {
      console.log(response.data)
      this.booksList = response.data
      this.bookCount = this.booksList.length
      this.bookAdded = new Array(this.booksList.length)
    })
  }

  sortby: string = "default";
  sort(){
  if(this.sortby == "priceLow"){
    this.httpService.sortAsc().subscribe(response => {
      console.log(response.data)
      this.booksList = response.data
      this.bookCount = this.booksList.length
    })
  }
  
  if(this.sortby == "priceHigh"){
    this.httpService.sortDsc().subscribe(response => {
      console.log(response.data)
      this.booksList = response.data
      this.bookCount = this.booksList.length
    })
  }

  if(this.sortby == "default"){
    this.ngOnInit()
  }
  }

}
