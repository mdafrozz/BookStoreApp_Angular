import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  orders: any;

  ngOnInit(): void {
    if (localStorage.getItem("orderData") != null) {
      this.orders = JSON.parse(localStorage.getItem('orderData') || '[]');
      
  }
  else {
     
  }
  }

}
