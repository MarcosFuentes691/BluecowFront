import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { TokenService } from '../services/token.service';
import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Game} from "../models/game";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GameService} from "../services/game.service";


@Component({
  selector: 'app-gameEntry',
  templateUrl: './gameEntry.component.html',
  styleUrls: ['./gameEntry.component.css']
})
export class GameEntryComponent implements OnInit {

  userLogged: SocialUser = new SocialUser;
  isLogged: boolean = false;
  oauthURL = 'http://localhost:8080/oauth/';
  gameForm!:FormGroup;

  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private heroService: HeroService,
    private gameService: GameService,
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) { }

  hero!: Hero;
  heroString!: string;
  from!:string;
  to!:string;
  private sub: any;

  ngOnInit(): void {
    this.gameForm = new FormGroup({
      hero: new FormControl('',Validators.required),
      place: new FormControl('',[Validators.max(8),Validators.min(1)]),
      mmr: new FormControl('',Validators.required),
      timestamp:new FormControl('',Validators.required)
    });
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

  onSubmit() {
    console.log(this.gameForm);
    console.log(this.gameForm.value.timestamp);
    let game=new Game;
    game.mmr=this.gameForm.value.mmr;
    game.hero=this.gameForm.value.hero;
    game.place=this.gameForm.value.place;
    game.timestamp=this.gameForm.value.timestamp;
    console.log("onsubtmirwoirkinf");
    this.gameService.addGame(game).subscribe(
      data=>{
        console.log(data);
      }
    );
  }

}
