import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GamesComponent } from './games/games.component';
import { GameGuard } from './guards/game.guard';
import { HeroComponent } from './hero/hero.component';
import {HeroesComponent} from "./heroes/heroes.component";
import {GameEntryComponent} from "./gameEntry/gameEntry.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'games', component: GamesComponent ,canActivate: [GameGuard] },
  {path: 'hero/:hero/:from/:to', component: HeroComponent },
  {path: 'hero/:hero/:from', component: HeroComponent },
  {path: 'hero/:hero/:to', component: HeroComponent },
  {path: 'hero/:hero', component: HeroComponent },
  {path: 'hero/:from', component: HeroComponent },
  {path: 'hero/:to', component: HeroComponent },
  {path: 'heroes', component: HeroesComponent },
  {path: 'heroes/:from', component: HeroesComponent },
  {path: 'heroes/:to', component: HeroesComponent },
  {path: 'heroes/:from:to', component: HeroesComponent },
  {path: 'newGame', component: GameEntryComponent },

  //{path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
