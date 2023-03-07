import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute,private router: Router,
    private httpService: HttpService) { 
    
    }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.httpService.getUser(this.email)
      .subscribe(data => {
        console.log(data.data);
        this.user = data.data;
      });
  }

  logout(){
    localStorage.clear();
    location.reload();
  }
}
