import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { TokenService } from '../services/token.service';
import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Game} from "../models/game";


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  userLogged: SocialUser = new SocialUser;
  isLogged: boolean = false;
  oauthURL = 'http://localhost:8080/oauth/';

  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private heroService: HeroService,
    private route: ActivatedRoute,
  private httpClient: HttpClient
  ) { }

  hero!: Hero;
  heroString!: string;
  from!:string;
  to!:string;
  private sub: any;

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
    this.sub = this.route.params.subscribe(params => {
      this.from = params['from'];
      console.log(this.from);
      this.to = params['to'];
      console.log(this.to);
      this.heroString = params['hero'];
      console.log(this.heroString);
    });
    if (this.heroString != null) {
      this.getHero();
    }
  }

  getHero(): void{
    this.heroService.getHero(this.heroString,this.from,this.to).subscribe(
      data => {
        this.hero = data;
      },
      err => {
        console.log(err);
      }
    );
  }


}
