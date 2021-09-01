import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { TokenService } from '../services/token.service';
import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero';
import { ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Game} from "../models/game";
import {UserService} from "../services/user.service";
import * as moment from "moment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GameService} from "../services/game.service";


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  userLogged: SocialUser = new SocialUser;
  isLogged: boolean = false;
  oauthURL = 'http://localhost:8080/oauth/';
  private timeZone!: string;
  games: Game[] = [];

  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private heroService: HeroService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private gameService:GameService,
    private userService: UserService,
  ) { }

  hero: Hero = new Hero();
  heroString!: string;
  from:string = 'Always';
  to:string  = 'now';
  private sub: any;
  searchForm!:FormGroup;
  range!:FormGroup;
  positionsValues! : any;

  header : any = {headers: new HttpHeaders({'Authorization' : localStorage.getItem("AuthToken")!})};

  ngOnInit(): void {
    this.httpClient.get(this.oauthURL + 'check',this.header).subscribe(
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
    );
    this.searchForm = new FormGroup({
      time: new FormControl('Always',Validators.required),
    });
    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });

    this.sub = this.route.params.subscribe(params => {
      this.heroString = params['hero'];
      console.log(this.heroString);
    });
    if (this.heroString != null) {
      this.getHero();
    }
  }


  getHero(): void{
    let time: string = this.searchForm.value.time;
    if(time=='Today' || time=='Last week' || time=='Last month' || time=='Always'){
      this.to="now";
      this.from=time;
      this.timeZone=new Date().getTimezoneOffset().toString();
    }
    else {
      if (this.range.value.start != undefined) {
        this.from = moment(this.range.value.start["_d"]).format("YYYY-MM-DD HH:mm:ss.SSS");
        this.timeZone = moment(this.range.value.start["_d"]).format("ZZ");
      }
      if (this.range.value.end != undefined) {
        this.to = moment(this.range.value.end["_d"]).format("YYYY-MM-DD HH:mm:ss.SSS");
        this.timeZone = moment(this.range.value.end["_d"]).format("ZZ");
      }
    }
    this.heroService.getHero(this.heroString,this.from,this.to,this.timeZone=new Date().getTimezoneOffset().toString()).subscribe(
      data => {
        this.hero = data;
        this.positionsValues = [
          { name: "N° 8", value: this.hero.positions[7] },
          { name: "N° 7", value: this.hero.positions[6] },
          { name: "N° 6", value: this.hero.positions[5] },
          { name: "N° 5", value: this.hero.positions[4] },
          { name: "N° 4", value: this.hero.positions[3] },
          { name: "N° 3", value: this.hero.positions[2] },
          { name: "N° 2", value: this.hero.positions[1] },
          { name: "N° 1", value: this.hero.positions[0] },
        ];
        this.hero.lastUseDate=new Date((moment(this.hero.lastUse)).format());
        this.hero.lastUse = (moment(this.hero.lastUse)).format('DD-MM-YYYY HH:mm');
      },
      err => {
        console.log(err);
      }
    );
    this.gameService.searchGameList(this.heroString,
      0,
      25,
      this.from,
      this.to,
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

  takeHourOut(timestamp:any){
    let year=timestamp.substring(6, 10);
    let month=timestamp.substring(3, 5);
    let day=timestamp.substring(0, 2);
    return year+'-'+month+'-'+day;
  }

  onSubmit() {
    this.getHero();
  }

  round(avgPlace: number) {
    return Math.round(avgPlace);
  }
}
