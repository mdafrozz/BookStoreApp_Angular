import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../model/login.model';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent{

  public user: User = new User();
  public login: Login = new Login();


  constructor(private route: ActivatedRoute,private router: Router, private formBuilder: FormBuilder,
    private httpService: HttpService) { 
    
    }

  ngOnInit() {
  }

  loginUser(){
    console.log(this.login)
    this.httpService.LoginUser(this.login)
      .subscribe(data => {
        console.log(data.data);
        localStorage.setItem('email', data.data)
        console.log(localStorage.getItem('email'))
        this.router.navigate(['']);
      });
  }

  register(){
    console.log(this.user)
    this.httpService.registerUser(this.user)
      .subscribe(data => {
        console.log(data);
      });
  }
}
