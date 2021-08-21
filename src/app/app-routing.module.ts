import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoGuard } from './guards/producto.guard';
import { GamesComponent } from './games/games.component';
import { GameGuard } from './guards/game.guard';
import { HeroComponent } from './hero/hero.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'lista', component: ProductosComponent, canActivate: [ProductoGuard] },
  {path: 'game', component: GamesComponent ,canActivate: [GameGuard] },
  {path: 'hero/:hero/:hola', component: HeroComponent }
  //{path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
