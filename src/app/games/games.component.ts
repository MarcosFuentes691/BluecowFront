import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Game } from '../models/game';
import { GameService } from '../services/game.service';
import { TokenService } from '../services/token.service';

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

  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private gameService: GameService,
    

  ) { 
  }

  gameForm = new FormGroup({
    hero: new FormControl('',Validators.required),
    place: new FormControl('',[Validators.max(8),Validators.min(1)]),
    mmr: new FormControl('',Validators.required),
    picker:new FormControl('',Validators.required)
  });

  ngOnInit():  void {
    this.authService.authState.subscribe(
      data => {
        this.userLogged = data;
        this.isLogged = (this.userLogged != null && this.tokenService.getToken() != null);
      }
    );
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


