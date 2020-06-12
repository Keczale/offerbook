import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AngularFireModule } from '@angular/fire';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDataEffects } from './store/userData/user-data.effects';
import { LoginModule } from './features/login/login.module';
import { OfferbookModule } from './features/offerbook/offerbook.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
	AppComponent,
  ],
  imports: [
	BrowserModule,
  AppRoutingModule,
  StoreModule.forRoot({ }),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  EffectsModule.forRoot([]),
  StoreRouterConnectingModule.forRoot(),
  EffectsModule.forFeature([UserDataEffects]),
  AngularFireModule.initializeApp(environment.firebase),
  LoginModule,
  OfferbookModule,
  BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
