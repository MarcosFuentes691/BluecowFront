import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenDto } from '../models/token-dto';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";
import {SocialAuthService, SocialUser} from "angularx-social-login";
import {Router} from "@angular/router";
import {TokenService} from "./token.service";
import {LoginForm} from "./oauth.service";
import {FormGroup} from "@angular/forms";

const header = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  oauthURL = 'https://bluecowback.herokuapp.com/oauth/';

  userLogged:SocialUser = new SocialUser();
  logged:boolean =false;
  constructor(private httpClient: HttpClient) { }

  initUserLogged(name:string):SocialUser {
    this.userLogged.name = name;
    this.userLogged.authToken="token";
    this.userLogged.id="id";
    this.userLogged.email=name;
    this.userLogged.provider="provides";
    this.userLogged.authorizationCode="code";
    this.userLogged.firstName=name;
    this.userLogged.idToken="token";
    this.userLogged.lastName=name;
    this.setUser(name);
    this.userLogged.photoUrl="https://www.pngfind.com/pngs/m/123-1234419_free-png-download-cute-cat-png-images-background.png";
    return this.userLogged;
  }

  setUser(data:any){
    localStorage.setItem('User',data);
    this.userLogged.name=data;
  }

  getUser():SocialUser{
    let user = new SocialUser();
    user.name=localStorage.getItem('User')!;
    return user;
  }

  isLogged():boolean{
    if(localStorage.getItem('Logged')! == 'true')
      return true
    else return false
  }

  login() {
    localStorage.setItem('Logged','true');
    this.logged=true;
  }

  logout(){
    localStorage.setItem('Logged','false');
    this.logged=false;
  }

}

