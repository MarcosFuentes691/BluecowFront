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


  initUserLogged(data:Object):SocialUser {
    this.userLogged.name = Object.values(data)[1];
    this.userLogged.authToken="token";
    this.userLogged.id="id";
    this.userLogged.email=Object.values(data)[1];
    this.userLogged.provider="provides";
    this.userLogged.authorizationCode="code";
    this.userLogged.firstName=Object.values(data)[1];
    this.userLogged.idToken="token";
    this.userLogged.lastName=Object.values(data)[1];
    this.userLogged.photoUrl="https://www.pngfind.com/pngs/m/123-1234419_free-png-download-cute-cat-png-images-background.png";
    return this.userLogged;
  }
}

