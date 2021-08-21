import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero';

const header = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

import { ActivatedRoute } from '@angular/router';
import {HttpParams} from "@angular/common/http";
    

    

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  gameURL = 'http://localhost:8080/hero';
  gameURL2 = 'http://localhost:8080/hero';
  public heroString!: string;

  constructor(
      private http: HttpClient,
      private route: ActivatedRoute
      ) { }

  

  public getHero(hero:string): Observable<Hero> {
    this.gameURL=this.gameURL2+'/view';
    this.gameURL=this.gameURL+'/'+hero;
    return this.http.get<Hero>(this.gameURL,header);
  }

}

