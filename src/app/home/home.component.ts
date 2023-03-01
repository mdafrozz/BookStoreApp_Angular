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
  
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.httpService.getBooksData().subscribe(response => {
      console.log(response.data)
      this.booksList = response.data
      this.bookCount = this.booksList.length
    })
  } 

  addToCart(bookId: any){
    this.httpService.addItem().subscribe(response => {
      console.log(response.data)
      this.booksList = response.data
      this.bookCount = this.booksList.length
    })
  }
}
