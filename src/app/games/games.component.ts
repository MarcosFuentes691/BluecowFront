import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Game } from '../models/game';
import { GameService } from '../services/game.service';
import { TokenService } from '../services/token.service';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../services/user.service";
import * as moment from 'moment';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Game[] = [];


  userLogged: SocialUser = new SocialUser;
  isLogged: boolean = false;
  oauthURL = 'http://localhost:8080/oauth/';
  searchForm!:FormGroup;
  range!:FormGroup;

  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private gameService: GameService,
    private httpClient: HttpClient,
    private userService: UserService,



  ) {

  }



  ngOnInit():  void {
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
    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
    this.searchForm = new FormGroup({
      hero: new FormControl('',Validators.required),
      page: new FormControl('',Validators.required),
      amount: new FormControl('',Validators.required)
    });
    this.gameService.gameList().subscribe(
      data => {
        this.games = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    let startMoment : string = moment("2000-01-01").format("YYYY-MM-DD HH:mm:ss.SSS");
    let endMoment : string = moment("2050-01-01").format("YYYY-MM-DD HH:mm:ss.SSS");
    let zz : string = "0000a";
    if(this.range.value.start!=undefined) {
      startMoment = moment(this.range.value.start["_d"]).format("YYYY-MM-DD HH:mm:ss.SSS");
      zz = moment(this.range.value.start["_d"]).format("ZZ");
    }
    if(this.range.value.end!=undefined){
      endMoment = moment(this.range.value.end["_d"]).format("YYYY-MM-DD HH:mm:ss.SSS");
      zz = moment(this.range.value.end["_d"]).format("ZZ");
    }
    console.log(startMoment);
    console.log(endMoment);
    console.log(zz);
    this.gameService.searchGameList(this.searchForm.value.hero,
                                    this.searchForm.value.page,
                                    this.searchForm.value.amount,
                                    startMoment,
                                    endMoment,
                                    zz).subscribe(

      data => {
        this.games = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}


