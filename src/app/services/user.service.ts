import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenDto } from '../models/token-dto';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";
import {SocialAuthService, SocialUser} from "angularx-social-login";
import {Router} from "@angular/router";
import {TokenService} from "./token.service";

const header = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  oauthURL = 'http://localhost:8080/oauth/';

  userLogged:SocialUser = new SocialUser();
  logged:boolean =false;


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
    this.userLogged.photoUrl="https://www.pngfind.com/pngs/m/123-1234419_free-png-download-cute-cat-png-images-background.png";
    return this.userLogged;
  }

  getUser():SocialUser{
    return this.userLogged;
  }

  isLogged():boolean{
    return this.logged;
  }

  login() {
    this.logged=true;
  }

  logout(){
    this.logged=false;
  }

}

