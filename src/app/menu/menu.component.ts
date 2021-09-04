import {Component, Input, OnInit} from '@angular/core';
import { SocialUser, SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../services/user.service";
import {Stats} from "../models/stats";



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userLogged: SocialUser = new SocialUser;
  isLogged: boolean = false;
  oauthURL = 'http://localhost:8080/oauth/';
  @Input() title!: string;

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private tokenService: TokenService,
    private httpClient: HttpClient,
    private userService: UserService,
  ) {
    this.userLogged = this.userService.getUser();
    this.isLogged = this.userService.isLogged();
  }

  header : any = {headers: new HttpHeaders({'Authorization' : localStorage.getItem("AuthToken")!})};

  ngOnInit(): void {
    console.log(this.isLogged);
    console.log(this.userLogged);
  }

  logOut(): void {
    localStorage.clear();
    this.authService.signOut().then(
      data => {
        this.tokenService.logOut();
        this.router.navigate(['/login']);
      }
    );
    this.tokenService.logOut();
    this.router.navigate(['/login']);

  }

}
