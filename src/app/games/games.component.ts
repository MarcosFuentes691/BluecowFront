import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Game } from '../models/game';
import { GameService } from '../services/game.service';
import { TokenService } from '../services/token.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../services/user.service";
import * as moment from 'moment';
import {waitForAsync} from "@angular/core/testing";
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesComponent implements OnInit {

  games: Game[] = [];


  userLogged: SocialUser = new SocialUser;
  isLogged: boolean = false;
  isCustom: boolean = false;
  title:string="Games"
  oauthURL = 'https://bluecowback.herokuapp.com/oauth/';
  searchForm!:FormGroup;
  range!:FormGroup;
  startMoment:string = "Always";
  endMoment:string = "now";
  timeZone:string = "0";
  nextValid!:boolean;

  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private gameService: GameService,
    private httpClient: HttpClient,
    private userService: UserService,
    public loadingService: LoadingService,
  ) {
    this.userLogged = this.userService.getUser();
    this.isLogged = this.userService.isLogged();
  }


  header : any = {headers: new HttpHeaders({'Authorization' : localStorage.getItem("AuthToken")!})};





  ngOnInit(): void {

    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
    this.searchForm = new FormGroup({
      hero: new FormControl('All',Validators.required),
      page: new FormControl('0',Validators.required),
      amount: new FormControl('25',Validators.required),
      time: new FormControl('Always',Validators.required),
    });
    this.searchForm.value.page=0;
    this.searchForm.value.amount=25;
    this.searchForm.value.hero="all";
    this.searchForm.value.time="Always";
    this.gameService.gameList().subscribe(
      data => {
        this.games = data;
        for (let i = 0; i < this.games.length; i++) {
          this.games[i].timeDate = new Date((moment(this.games[i].timestamp)).format());
          this.games[i].timestamp = (moment(this.games[i].timestamp)).format('DD-MM-YYYY HH:mm');

        }
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    let time: string = this.searchForm.value.time;
    this.startMoment  = moment("2000-01-01").format("YYYY-MM-DD HH:mm:ss.SSS");
    this.endMoment = moment("2050-01-01").format("YYYY-MM-DD HH:mm:ss.SSS");
    this.timeZone  = "0000a";
    if(time=='Today' || time=='Last week' || time=='Last month' || time=='Always'){
      this.endMoment="now";
      this.startMoment=time;
      this.timeZone=new Date().getTimezoneOffset().toString();
    }
    else {
      if (this.range.value.start != undefined) {
        this.startMoment = moment(this.range.value.start["_d"]).format("YYYY-MM-DD HH:mm:ss.SSS");
        this.timeZone = moment(this.range.value.start["_d"]).format("ZZ");
      }
      if (this.range.value.end != undefined) {
        this.endMoment = moment(this.range.value.end["_d"]).format("YYYY-MM-DD HH:mm:ss.SSS");
        this.timeZone = moment(this.range.value.end["_d"]).format("ZZ");
      }
    }
    this.gameService.searchGameList(this.searchForm.value.hero,
                                    this.searchForm.value.page,
                                    this.searchForm.value.amount,
                                    this.startMoment,
                                    this.endMoment,
                                    this.timeZone).subscribe(

      data => {
        this.games = data;
        for (let i = 0; i < this.games.length; i++) {
          this.games[i].timeDate = new Date((moment(this.games[i].timestamp)).format());
          this.games[i].timestamp = (moment(this.games[i].timestamp)).format('DD-MM-YYYY HH:mm');

        }
      },
      err => {
        console.log(err);
      }
    );
  }


  prevPage() {
    if(this.searchForm.value.page>0) {
      this.searchForm.value.page = (+this.searchForm.value.page - 1);
      this.onSubmit();
    }
  }

  nextPage() {
    this.searchForm.value.page = (+this.searchForm.value.page + 1);
    this.onSubmit();
  }

}


