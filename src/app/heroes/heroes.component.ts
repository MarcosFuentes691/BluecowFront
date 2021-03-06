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
import {Sort} from "@angular/material/sort";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoadingService} from "../services/loading.service";


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  userLogged: SocialUser = new SocialUser;
  isLogged: boolean = false;
  oauthURL = 'https://bluecowback.herokuapp.com/oauth/';
  roundPlace!: number;
  searchForm!:FormGroup;
  range!:FormGroup;
  token!:any;



  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private heroService: HeroService,
    private route: ActivatedRoute,
    private userService: UserService,
    private httpClient: HttpClient,
    public loadingService: LoadingService,
  ) {
    this.userLogged = this.userService.getUser();
    this.isLogged = this.userService.isLogged();
    this.token= this.tokenService.getToken();
  }

  heroes: Hero[] = [];
  from!: string;
  to!: string;
  timeZone:string = "0";
  private sub: any;
  Math: any;
  header : any = {headers: new HttpHeaders({'Authorization' : localStorage.getItem("AuthToken")!})};

  ngOnInit(): void {
    console.log("hola");
    console.log(this.userLogged);
    console.log(this.isLogged);
    console.log(this.token);
    console.log("CHAI");
    this.searchForm = new FormGroup({
      time: new FormControl('Always',Validators.required),
    });
    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
    this.sub = this.route.params.subscribe(params => {
      this.getAllHeroes();
    });
  }

  getAllHeroes(): void {
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
    this.heroService.getAllHeroes(this.from,this.to,this.timeZone).subscribe(
      data => {
        this.heroes = data;
        for (let i = 0; i < this.heroes.length; i++) {
          this.heroes[i].lastUseDate=new Date((moment(this.heroes[i].lastUse)).format());
          this.heroes[i].lastUse = (moment(this.heroes[i].lastUse)).format('DD-MM-YYYY HH:mm');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit() {

    this.getAllHeroes();
  }

  round(avgPlace: number) {
    return Math.round(avgPlace);
  }

  sortData(sort: Sort) {
    const data = this.heroes;
    if (!sort.active || sort.direction === '') {
      this.heroes = data;

      return;
    }
    this.heroes = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'gamesPlayed':
          return compareInt(a.gamesPlayed, b.gamesPlayed, isAsc);
        case 'mmr':
          return compare(a.mmr, b.mmr, isAsc);
        case 'avgPlace':
          return compare(a.avgPlace, b.avgPlace, isAsc);
        case 'lastUse':
          return compareDate(a.lastUseDate, b.lastUseDate, isAsc);
        default:
          return 0;
      }
    });
  }

  takeHourOut(timestamp:any){
    let year=timestamp.substring(6, 10);
    let month=timestamp.substring(3, 5);
    let day=timestamp.substring(0, 2);
    return year+'-'+month+'-'+day;
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


function compareInt(a: number, b: number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function compareDate(a: Date, b: Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
