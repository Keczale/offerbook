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
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatButtonToggleModule} from '@angular/material/button-toggle';

import { UserDataEffects } from './store/userData/user-data.effects';
import { UserModule } from './features/user/user.module';
import { OfferbookModule } from './features/offerbook/offerbook.module';
import { userDataReducer, requestReducer, offerReducer } from './store';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupLocationComponent } from './app-components/popup-location/popup-location.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { NotFoundComponent } from './app-components/not-found/not-found.component';

@NgModule({
  declarations: [
  AppComponent,
  PopupLocationComponent,
  NotFoundComponent,
  ],
  imports: [
	BrowserModule,
  AppRoutingModule,
  StoreModule.forRoot({ }),
  StoreModule.forFeature ('userData', userDataReducer),
  StoreModule.forFeature ('request', requestReducer),
  StoreModule.forFeature ('offer', offerReducer),
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
  ReactiveFormsModule,
  MatSelectModule,
  MatProgressBarModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatSnackBarModule,
  MatDialogModule,
  MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
