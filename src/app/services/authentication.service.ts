import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);
  currentUser: any;
  constructor(private plft:Platform,
    private httpClient: HttpClient) { 
    this.plft.ready().then( ()=>{
      this.checkToken();
    });
  }

  checkToken() {
    let token = localStorage.getItem(TOKEN_KEY);
    if(!!token){
      this.authenticationState.next(true);
    }
  }

  getToken(){
    let token = localStorage.getItem(TOKEN_KEY);
    return token;
  }
  
  setToken(token){
    return localStorage.setItem(TOKEN_KEY, `${token}`);
  }

  login(userName, password){
    return this.httpClient.post('/users/authenticate',{userName, password});
  }

  logout(){
    localStorage.removeItem(TOKEN_KEY);
    this.currentUser = null;
    this.authenticationState.next(false)
  }

  isAuthenticated(){
    return this.authenticationState.value;
  }

  setCurrentUser(user){
    this.currentUser = user;
  }
}


