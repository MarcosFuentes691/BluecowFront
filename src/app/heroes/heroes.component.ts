import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { TokenService } from '../services/token.service';
import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Game} from "../models/game";
import {UserService} from "../services/user.service";


@Component({
  selector: 'app-hero',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  userLogged: SocialUser = new SocialUser;
  isLogged: boolean = false;
  oauthURL = 'http://localhost:8080/oauth/';

  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private heroService: HeroService,
    private route: ActivatedRoute,
    private userService: UserService,
  private httpClient: HttpClient
  ) { }

  heroes: Hero[] = [];
  from!:string;
  to!:string;
  private sub: any;

  ngOnInit(): void {
    this.httpClient.get(this.oauthURL + 'check').subscribe(
      data => {
        if(Object.values(data)[0] == true){
          this.userLogged=this.userService.initUserLogged(data);
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
      this.getAllHeroes();
    });
  }

  getAllHeroes():void{

    this.heroService.getAllHeroes(this.from,this.to).subscribe(
      data => {
        this.heroes = data;
      },
      err => {
        console.log(err);
      }
    );
  }


}
