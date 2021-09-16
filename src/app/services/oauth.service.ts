import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenDto } from '../models/token-dto';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";
import {FormGroup} from "@angular/forms";
import {Game} from "../models/game";
import * as moment from "moment";
import {TokenService} from "./token.service";

const header = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

export interface LoginForm {
  username: string;
  password: string;
};

export interface RegisterForm {
  username: string;
  password: string;
  name:string;
};
const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})

export class OauthService {

  oauthURL = 'https://bluecowback.herokuapp.com/oauth/';

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService) { }

  public google(tokenDto: TokenDto): Observable<TokenDto> {
    return this.httpClient.post<TokenDto>(this.oauthURL + 'google', tokenDto, header);
  }

  public user(loginForm: LoginForm) :Observable<TokenDto>{
    return this.httpClient.post<any>(this.oauthURL+"user", loginForm,header).pipe(
      map((token) => {
        console.log(token.value);
        localStorage.setItem(TOKEN_KEY, token.value);
        return token;
      })
    );
  }

  public check() {
    this.httpClient.get<boolean>(this.oauthURL+'check').subscribe(
      data => {
        if(!data){
          this.tokenService.logOut();
          console.log(data);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  public register(loginForm: RegisterForm) :Observable<any>{
    console.log(loginForm);
    return this.httpClient.post<any>(this.oauthURL+"register", loginForm,header).pipe(
      map((token) => {
        console.log(token);
        return token;
      })
    );
  }

}

