import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Game } from '../models/game';
import { GameService } from '../services/game.service';
import { TokenService } from '../services/token.service';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Game[] = [];

  currentTimeInSeconds=Math.floor(Date.now()/1000);

  userLogged: SocialUser = new SocialUser;
  isLogged: boolean = false;
  oauthURL = 'http://localhost:8080/oauth/';

  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private gameService: GameService,
    private httpClient: HttpClient


  ) {
  }

  gameForm = new FormGroup({
    hero: new FormControl('',Validators.required),
    place: new FormControl('',[Validators.max(8),Validators.min(1)]),
    mmr: new FormControl('',Validators.required),
    picker:new FormControl('',Validators.required)
  });

  ngOnInit():  void {
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
    this.gameService.gameList().subscribe(
      data => {
        this.games = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}


