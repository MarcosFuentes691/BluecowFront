import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { TokenService } from '../services/token.service';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userLogged: SocialUser = new SocialUser;
  isLogged: boolean = false;
  oauthURL = 'http://localhost:8080/oauth/';


  constructor(
    private authService: SocialAuthService,
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

}
