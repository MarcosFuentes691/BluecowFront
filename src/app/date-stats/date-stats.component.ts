import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Game } from '../models/game';
import { GameService } from '../services/game.service';
import { TokenService } from '../services/token.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../services/user.service";
import * as moment from 'moment';
import {waitForAsync} from "@angular/core/testing";
import {DateService} from "../services/date.service";
import {ActivatedRoute} from "@angular/router";
import {Stats} from "../models/stats";

@Component({
  selector: 'app-date-stats',
  templateUrl: './date-stats.component.html',
  styleUrls: ['./date-stats.component.css']
})

export class DateStatsComponent implements OnInit {

  userLogged: SocialUser = new SocialUser;
  isLogged: boolean = false;
  isCustom: boolean = false;
  oauthURL = 'http://localhost:8080/oauth/';
  searchForm!:FormGroup;
  range!:FormGroup;
  startMoment:string = "Always";
  endMoment:string = "now";
  timeZone:string = "0";
  stats!:Stats;
  nextValid!:boolean;
  private sub: any;
  dateString!:string;
  private from!: string;
  private to!: string;


  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private gameService: GameService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private userService: UserService,
    private dateService: DateService,
    ) {

  }


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
        this.dateString = params['date'];
        this.from = moment(this.dateString).format("YYYY-MM-DD HH:mm:ss.SSS");
        this.timeZone = moment(this.dateString).format("ZZ");
        this.to = moment(this.dateString).format("YYYY-MM-DD HH:mm:ss.SSS");
        console.log(this.dateString);
        console.log(this.from);
        console.log(this.to);
        console.log(this.timeZone);
      });
      this.dateService.searchDate(this.from,this.to,this.timeZone).subscribe(
        data => {
          this.stats=data;
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
    }

  }



