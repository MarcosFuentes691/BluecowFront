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

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'games', component: GamesComponent},
  {path: 'hero/:hero', component: HeroComponent },
  {path: 'heroes', component: HeroesComponent },
  {path: 'hero', component: HeroComponent },
  {path: 'newGame', component: GameEntryComponent },
  {path: 'date/:date', component: DateStatsComponent },
  {path: 'stats', component: PersonalStatsComponent },

  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
