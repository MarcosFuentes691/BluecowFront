import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { TokenService } from '../services/token.service';
import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Game} from "../models/game";
import {UserService} from "../services/user.service";
import * as moment from "moment";
import {Sort} from "@angular/material/sort";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-hero',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  userLogged: SocialUser = new SocialUser;
  isLogged: boolean = false;
  oauthURL = 'http://localhost:8080/oauth/';
  roundPlace!: number;
  searchForm!:FormGroup;
  range!:FormGroup;



  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private heroService: HeroService,
    private route: ActivatedRoute,
    private userService: UserService,
    private httpClient: HttpClient
  ) {
  }

  heroes: Hero[] = [];
  from!: string;
  to!: string;
  timeZone:string = "0";
  private sub: any;
  Math: any;

  ngOnInit(): void {
    this.httpClient.get(this.oauthURL + 'check').subscribe(
      data => {
        if (Object.values(data)[0] == true) {
          this.userLogged = this.userService.initUserLogged(data);
          this.isLogged = true;
        } else {
          this.authService.authState.subscribe(
            data => {
              this.userLogged = data;
              this.isLogged = (this.userLogged != null && this.tokenService.getToken() != null);
            }
          );
        }
      }
    )
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
