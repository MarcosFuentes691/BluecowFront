import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { TokenService } from '../services/token.service';
import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Game} from "../models/game";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GameService} from "../services/game.service";
import {UserService} from "../services/user.service";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-gameEntry',
  templateUrl: './gameEntry.component.html',
  styleUrls: ['./gameEntry.component.css']
})


export class GameEntryComponent implements OnInit {

  userLogged: SocialUser = new SocialUser;
  isLogged: boolean = false;
  oauthURL = 'http://localhost:8080/oauth/';
  gameForm!:FormGroup;
  customDate:boolean=false;


  closeResult = '';

  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private heroService: HeroService,
    private gameService: GameService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private userService: UserService,
    private modalService: NgbModal,
  ) { }

  hero!: Hero;
  heroString!: string;
  from!:string;
  to!:string;
  private sub: any;

  ngOnInit(): void {
    this.gameForm = new FormGroup({
      hero: new FormControl('',Validators.required),
      place: new FormControl('',[Validators.max(8),Validators.min(1)]),
      mmr: new FormControl('',Validators.required),
      timestamp:new FormControl('',Validators.required),
      date: new FormControl('', [Validators.required]),
      hour: new FormControl('', [Validators.required]),
    });
    this.httpClient.get(this.oauthURL + 'check').subscribe(
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
    )

  }

  onSubmit() {
    console.log(this.gameForm);
    let game = new Game;
    game.mmr = this.gameForm.value.mmr;
    game.hero = this.gameForm.value.hero;
    game.place = this.gameForm.value.place;
    if (!this.customDate)
      game.timestamp = new Date(Date.now());
    else {
    game.timestamp = new Date(this.gameForm.value.date);
    game.timestamp.setHours(this.gameForm.value.hour.substring(0, 2), this.gameForm.value.hour.substring(3));
  }
    console.log(game);
    this.gameService.addGame(game).subscribe(
      data=>{
        console.log(data);
      }
    );
  }

  onItemChange() {
    this.customDate=!this.customDate;
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

