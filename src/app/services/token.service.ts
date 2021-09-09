import { Injectable } from '@angular/core';
import {UserService} from "./user.service";

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private userService: UserService) { }


  public setToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string|null {
    return localStorage.getItem(TOKEN_KEY);
    //return sessionStorage.getItem(TOKEN_KEY);
  }


  logOut(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.userService.logout();
  }
}
