import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HeroComponent } from './hero/hero.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { gameInterceptor } from './interceptors/game.interceptor';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

// social login
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
} from 'angularx-social-login';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeroesComponent} from "./heroes/heroes.component";
import {GameEntryComponent} from "./gameEntry/gameEntry.component";
import { GameTableComponent } from './game-table/game-table.component';
import {MatSortModule} from "@angular/material/sort";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule, MomentDateModule} from "@angular/material-moment-adapter";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { DateStatsComponent } from './date-stats/date-stats.component';
import { StatsGroupComponent } from './stats-group/stats-group.component';
import { FooterComponent } from './footer/footer.component';
import { PersonalStatsComponent } from './personal-stats/personal-stats.component';
import { RegisterComponent } from './register/register.component';
import {loadingInterceptor, LoadingInterceptor} from "./interceptors/loading.interceptor";
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent,
    GamesComponent,
    HeroComponent,
    HeroesComponent,
    GameEntryComponent,
    GameTableComponent,
    DateStatsComponent,
    StatsGroupComponent,
    FooterComponent,
    PersonalStatsComponent,
    RegisterComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatMomentDateModule,
    MomentDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMaterialTimepickerModule,
    FormsModule,
    NgbModule,
    NgxChartsModule,


  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '794971821178-9ppc4sscn6vo6krn4fo2l77p27qk9m28.apps.googleusercontent.com'
            ),
          }
        ],
      } as SocialAuthServiceConfig,
    },
    gameInterceptor,
    loadingInterceptor,
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'L',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
