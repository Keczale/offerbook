import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatMenuModule} from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatButtonToggleModule} from '@angular/material/button-toggle';

import { UserDataEffects } from './store/userData/user-data.effects';
import { UserModule } from './features/user/user.module';
import { OfferbookModule } from './features/offerbook/offerbook.module';
import { userDataReducer, requestReducer } from './store';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PopupComponent } from './testpopup/popup/popup.component';
import { RequestComponent } from './features/offerbook/request/request.component';
import { MatDialogModule } from '@angular/material/dialog';
// import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
  AppComponent,
  ],
  imports: [
	BrowserModule,
  AppRoutingModule,
  StoreModule.forRoot({ }),
  StoreModule.forFeature ('userData', userDataReducer),
  StoreModule.forFeature ('request', requestReducer),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  EffectsModule.forRoot([]),
  StoreRouterConnectingModule.forRoot(),
  EffectsModule.forFeature([UserDataEffects]),
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireDatabaseModule,
  UserModule,
  OfferbookModule,
  BrowserAnimationsModule,
  MatButtonModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatSnackBarModule,
  MatDialogModule,
  // MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
