import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';

const header = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class GameService {

  gameURL = 'http://localhost:8080/game/';

  constructor(private httpClient: HttpClient) { }

  public gameList(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.gameURL + 'view', header);
  }
}
