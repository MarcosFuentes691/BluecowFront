import { Component, OnInit } from '@angular/core';
import { SocialUser, SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
const header = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userLogged: SocialUser = new SocialUser;
  isLogged: boolean = false;
  oauthURL = 'http://localhost:8080/oauth/';

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private tokenService: TokenService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.httpClient.get(this.oauthURL + 'check').subscribe(
      data => {
        if(Object.values(data)[0] == true){
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
          this.isLogged = true;
        }
        else{
          this.authService.authState.subscribe(
            data => {
              this.userLogged = data;
              this.isLogged = (this.userLogged != null && this.tokenService.getToken() != null);
            }
          );
        }
      }
    )
  }

  logOut(): void {
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
