import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username:string;
  password:string;

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {
  }

  login(){
    this.authenticationService.login();
  }

}
