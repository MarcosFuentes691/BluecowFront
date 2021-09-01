import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { TokenService } from '../services/token.service';
import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero';
import { ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Game} from "../models/game";
import {UserService} from "../services/user.service";


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  userLogged: SocialUser = new SocialUser;
  isLogged: boolean = false;
  oauthURL = 'http://localhost:8080/oauth/';
  private timeZone!: string;

  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private heroService: HeroService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private userService: UserService,
  ) { }

  hero!: Hero;
  heroString!: string;
  from:string = 'Always';
  to:string  = 'now';
  private sub: any;

  header : any = {headers: new HttpHeaders({'Authorization' : localStorage.getItem("AuthToken")!})};

  ngOnInit(): void {
    this.httpClient.get(this.oauthURL + 'check',this.header).subscribe(
      data => {
        console.log(data);
        if(Object.values(data)[0] == true){
          this.userLogged=this.userService.initUserLogged(data);
          this.isLogged = true;
        }
        else{
          this.authService.authState.subscribe(
            data => {
              console.log(data);
              this.userLogged = data;
              this.isLogged = (this.userLogged != null && this.tokenService.getToken() != null);
            }
          );
        }
      }
    );

    this.sub = this.route.params.subscribe(params => {
      this.heroString = params['hero'];
      console.log(this.heroString);
    });
    if (this.heroString != null) {
      this.getHero();
    }
  }

  getHero(): void{
    this.heroService.getHero(this.heroString,this.from,this.to,this.timeZone=new Date().getTimezoneOffset().toString()).subscribe(
      data => {
        this.hero = data;
      },
      err => {
        console.log(err);
      }
    );
  }


}
