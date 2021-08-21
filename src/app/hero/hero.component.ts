import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { TokenService } from '../services/token.service';
import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  userLogged: SocialUser = new SocialUser;
  isLogged: boolean = false;

  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private heroService: HeroService,
    private route: ActivatedRoute
  ) { }

  hero!: Hero;
  hero2!: Hero;
  heroString!: string;
  hola!: string;
  private sub: any;

  ngOnInit(): void {
    this.authService.authState.subscribe(
      data => {
        this.userLogged = data;
        this.isLogged = (this.userLogged != null && this.tokenService.getToken() != null);
      }
    );
    this.sub = this.route.params.subscribe(params => {
      this.heroString = params['hero'];
      this.hola=params['hola'];
      console.log(this.heroString);
      console.log(this.hola);
    });
    if (this.heroString != null) {
      this.getHero();
    }
  }

  getHero(): void{
    this.heroService.getHero(this.heroString).subscribe(
      data => {
        this.hero = data;
      },
      err => {
        console.log(err);
      }
    );
  }


}
