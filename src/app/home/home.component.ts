import { Component,OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  bookCount: number = 0;
  booksList: any ;
  bookAdded: any;

  
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.httpService.getBooksData().subscribe(response => {
      console.log(response.data)
      this.booksList = response.data
      this.bookCount = this.booksList.length
      this.bookAdded = new Array(this.booksList.length)

    })
  } 


  addToCart(bookId: any, index: any){
    this.bookAdded[index] = true
    this.httpService.addItem().subscribe(response => {
      console.log(response.data)
      this.booksList = response.data
      this.bookCount = this.booksList.length
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
