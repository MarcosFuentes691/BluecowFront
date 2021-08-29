import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  gameURL = 'http://localhost:8080/game/';

  constructor(private httpClient: HttpClient) { }

  public gameList(): Observable<Game[]> {
    let params = new HttpParams().set('page', 0).set('amount',50000);
    return this.httpClient.get<Game[]>(this.gameURL + 'view', { headers: new HttpHeaders({'Content-Type' : 'application/json'}),params});
  }

  public searchGameList(hero:string,page:number,amount:number,from:any,to:any,timeZone:string): Observable<Game[]> {
    let params = new HttpParams().set('hero', hero).set('page',page).set('amount',amount).set('from',from).set('to',to).set('timeZone',timeZone);
    return this.httpClient.get<Game[]>(this.gameURL + 'search', { headers: new HttpHeaders({'Content-Type' : 'application/json'}),params});
  }

  public addGame(game: Game):Observable<Game>{
    return this.httpClient.post<Game>(this.gameURL+'add', game);
  }
}
