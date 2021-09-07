import {Injectable, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import {Stats} from "../models/stats";


@Injectable({
  providedIn: 'root'
})
export class DateService {

  gameURL = 'https://bluecowback.herokuapp.com/player/';

  constructor(private httpClient: HttpClient) { }

  public searchDate(from:any,to:any,timeZone:string): Observable<Stats> {
    let params = new HttpParams().set('from',from).set('to',to).set('timeZone',timeZone);
    return this.httpClient.get<Stats>(this.gameURL + 'date', { headers: new HttpHeaders({'Content-Type' : 'application/json','Authorization' : localStorage.getItem("AuthToken")!}),params});
  }

  public searchStats(): Observable<Stats[]> {
    return this.httpClient.get<Stats[]>(this.gameURL + 'stats', { headers: new HttpHeaders({'Content-Type' : 'application/json','Authorization' : localStorage.getItem("AuthToken")!})});
  }

}
