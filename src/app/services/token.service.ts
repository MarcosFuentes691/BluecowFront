import { Injectable } from '@angular/core';
import {UserService} from "./user.service";

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private userService: UserService) { }


  public setToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string|null {
    return sessionStorage.getItem(TOKEN_KEY);
  }


  logOut(): void {
    sessionStorage.clear();
    this.userService.logout();
  }
}
