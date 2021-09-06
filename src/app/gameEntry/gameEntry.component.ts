import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { TokenService } from '../services/token.service';
import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero';
import { ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Game} from "../models/game";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GameService} from "../services/game.service";
import {UserService} from "../services/user.service";


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
  customDate:boolean=false;
  title:string="New game"

  header : any = {headers: new HttpHeaders({'Authorization' : localStorage.getItem("AuthToken")!})};

  closeResult = '';

  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private heroService: HeroService,
    private gameService: GameService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private userService: UserService,
  ) {
    this.userLogged = this.userService.getUser();
    this.isLogged = this.userService.isLogged();
  }

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
      timestamp:new FormControl('',Validators.required),
      date: new FormControl('', [Validators.required]),
      hour: new FormControl('', [Validators.required]),
    });


  }

  onSubmit() {
    console.log(this.gameForm);
    let game = new Game;
    game.mmr = this.gameForm.value.mmr;
    game.hero = this.gameForm.value.hero;
    game.place = this.gameForm.value.place;
    if (!this.customDate)
      game.timestamp = new Date(Date.now());
    else {
    game.timestamp = new Date(this.gameForm.value.date);
    game.timestamp.setHours(this.gameForm.value.hour.substring(0, 2), this.gameForm.value.hour.substring(3));
  }
    console.log(game);
    this.gameService.addGame(game).subscribe(
      data=>{
        console.log(data);
        window.alert("Game added correctly");
      }
    );
  }

  onItemChange() {
    this.customDate=!this.customDate;
  }


}

