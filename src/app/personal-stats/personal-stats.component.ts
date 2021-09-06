import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SocialAuthService, SocialUser} from "angularx-social-login";
import {FormGroup} from "@angular/forms";
import {Stats} from "../models/stats";
import {Game} from "../models/game";
import {TokenService} from "../services/token.service";
import {GameService} from "../services/game.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {DateService} from "../services/date.service";

@Component({
  selector: 'app-personal-stats',
  templateUrl: './personal-stats.component.html',
  styleUrls: ['./personal-stats.component.css']
})
export class PersonalStatsComponent implements OnInit {

  userLogged: SocialUser = new SocialUser;
  isLogged: boolean = false;
  isCustom: boolean = false;
  title:string = "Personal stats"
  oauthURL = 'http://localhost:8080/oauth/';
  searchForm!:FormGroup;
  range!:FormGroup;
  startMoment:string = "Always";
  endMoment:string = "now";
  timeZone:string = "0";
  stats!:Stats[];
  nextValid!:boolean;
  games!: Game[];
  statNumber:number=0;

  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private gameService: GameService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private userService: UserService,
    private dateService: DateService,
  ) {
    this.userLogged = this.userService.getUser();
    this.isLogged = this.userService.isLogged();
  }

  header : any = {headers: new HttpHeaders({'Authorization' : localStorage.getItem("AuthToken")!})};
  ngOnInit(): void {

    this.dateService.searchStats().subscribe(
      data => {
        this.stats=data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );

  }

  chooseStats(statNumber:number) {
    this.statNumber=statNumber;
  }

  getStats() {
    return this.stats[this.statNumber];
  }
}
