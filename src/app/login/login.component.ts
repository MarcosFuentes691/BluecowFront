import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import {LoginForm, OauthService} from '../services/oauth.service';
import { TokenService } from '../services/token.service';
import { TokenDto } from '../models/token-dto';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../services/user.service";
import {LoadingService} from "../services/loading.service";
const header = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  socialUser: SocialUser = new SocialUser;
  userLogged: SocialUser = new SocialUser;
  isLogged: boolean = false;
  title:string="Log in"
  loginForm!: FormGroup ;
  oauthURL = 'http://localhost:8080/oauth/';

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private oauthService: OauthService,
    private tokenService: TokenService,
    private httpClient: HttpClient,
    private userService:UserService,
    public loadingService: LoadingService,
  ) { }

  header : any = {headers: new HttpHeaders({'Authorization' : localStorage.getItem("AuthToken")!})};

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(  null, [Validators.required, Validators.email, Validators.minLength(6)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    })
  }

  onSubmit() {
      this.socialUser.name=this.loginForm.value.username;
      this.oauthService.user(this.loginForm.value).subscribe(
          res => {
            localStorage.removeItem('AuthToken');
            localStorage.setItem('AuthToken',res.value);
            this.tokenService.setToken(res.value);
            this.userLogged=this.userService.initUserLogged(this.loginForm.value.username);
            this.isLogged = true;
            this.userService.login();
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
            localStorage.removeItem('AuthToken');
            localStorage.setItem('AuthToken',res.value);
            this.tokenService.setToken(res.value);
            this.userLogged = data;
            this.userService.login();
            this.userService.setUser(this.userLogged);
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
