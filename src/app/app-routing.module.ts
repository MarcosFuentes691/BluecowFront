import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GamesComponent } from './games/games.component';
import { GameGuard } from './guards/game.guard';
import { HeroComponent } from './hero/hero.component';
import {HeroesComponent} from "./heroes/heroes.component";
import {GameEntryComponent} from "./gameEntry/gameEntry.component";
import {DateStatsComponent} from "./date-stats/date-stats.component";
import {PersonalStatsComponent} from "./personal-stats/personal-stats.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'games', component: GamesComponent,canActivate: [AuthGuard]},
  {path: 'hero/:hero', component: HeroComponent,canActivate: [AuthGuard]},
  {path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard]},
  {path: 'hero', component: HeroComponent,canActivate: [AuthGuard]},
  {path: 'newGame', component: GameEntryComponent ,canActivate: [AuthGuard]},
  {path: 'date/:date', component: DateStatsComponent ,canActivate: [AuthGuard]},
  {path: 'stats', component: PersonalStatsComponent ,canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent },

  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
