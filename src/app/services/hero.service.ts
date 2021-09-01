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



  public getHero(hero:string,from:string,to:string,timeZone:string): Observable<Hero> {
    this.gameURL=this.gameURL2+'/search';
    if(from==null)
      from='2000-01-01 11:11:11.111';
    if(to==null)
      to='2030-01-01 11:11:11.111';
    let params = new HttpParams().set('hero', hero).set('from',from).set('to',to).set('timeZone',timeZone);
    return this.http.get<Hero>(this.gameURL,
      { headers: new HttpHeaders({'Content-Type' : 'application/json'}),params});
  }

  public getAllHeroes(from:string,to:string,timeZone:string):Observable<Hero[]>{
    this.gameURL=this.gameURL2+'/all';
    if(from==null)
      from='2000-01-01 11:11:11.111';
    if(to==null)
      to='2030-01-01 11:11:11.111';
    let params = new HttpParams().set('from',from).set('to',to).set('timeZone',timeZone);
    return this.http.get<Hero[]>(this.gameURL,
      { headers: new HttpHeaders({'Content-Type' : 'application/json'}),params});
  }

}

