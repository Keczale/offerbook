import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { userDataReducer, requestReducer, offerReducer } from './store';
import { UserDataEffects } from './store/userData/user-data.effects';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { ReactiveFormsModule } from '@angular/forms';

import { UserModule } from './features/user/user.module';
import { OfferbookModule } from './features/offerbook/offerbook.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './app-components/not-found/not-found.component';
import { PopupLocationComponent } from './app-components/popup-location/popup-location.component';
import { appReducer } from './store/app';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeRu, 'ru-RU');

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
  StoreModule.forFeature ('app', appReducer),
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
