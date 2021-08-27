import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import {LoginForm, OauthService} from '../services/oauth.service';
import { TokenService } from '../services/token.service';
import { TokenDto } from '../models/token-dto';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";
const header = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  socialUser: SocialUser = new SocialUser;
  userLogged: SocialUser = new SocialUser;
  isLogged: boolean = false;
  loginForm!: FormGroup ;
  oauthURL = 'http://localhost:8080/oauth/';

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private oauthService: OauthService,
    private tokenService: TokenService,
    private httpClient: HttpClient,
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
    this.loginForm = new FormGroup({
      username: new FormControl(  null, [Validators.required, Validators.email, Validators.minLength(6)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    })
  }

  onSubmit() {
      this.socialUser.name=this.loginForm.value.username;
      this.oauthService.user(this.loginForm.value).subscribe(
          res => {
            this.tokenService.setToken(res.value);
            this.isLogged = true;
            this.router.navigate(['/']);
          },
          err => {
            console.log(err);
            this.logOut();
          }
      );
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        console.log(data);
        this.socialUser = data;
        const tokenGoogle = new TokenDto(this.socialUser.idToken);
        this.oauthService.google(tokenGoogle).subscribe(
          res => {
            this.tokenService.setToken(res.value);
            this.isLogged = true;
            this.router.navigate(['/']);
          },
          err => {
            console.log(err);
            this.logOut();
          }
        );
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
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
