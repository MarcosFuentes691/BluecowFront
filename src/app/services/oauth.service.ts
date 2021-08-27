import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenDto } from '../models/token-dto';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";

const header = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

export interface LoginForm {
  username: string;
  password: string;
};
const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})

export class OauthService {

  oauthURL = 'http://localhost:8080/oauth/';

  constructor(private httpClient: HttpClient) { }

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

}

