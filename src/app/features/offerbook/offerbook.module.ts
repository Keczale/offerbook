import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferbookComponent } from './offerbook.component';
import { EffectsModule } from '@ngrx/effects';
import { RequestEffects } from '../../store/request/request.effects';
import { RequestComponent } from './request/request.component';
import { OfferComponent } from './offer/offer.component';
import { OfbRoutingModule } from './ofb-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RequestPopupComponent } from './request/request-popup/request-popup.component';
import { RequestItemComponent } from './request/request-item/request-item.component';
import { MatCardModule } from '@angular/material/card';
import { OfferPopupComponent } from './offer/offer-popup/offer-popup.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatIconModule } from '@angular/material/icon';
// import { RequestDataService } from './services/request-data.service';
// import { RequestService } from './services/request.service';
import { HttpClientModule} from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RequestChangePopupComponent } from './request/request-change-popup/request-change-popup.component';
import { OfferEffects } from '../../store/offer/offer.effects';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ActualRequestComponent } from './offer/actual-request/actual-request.component';





@NgModule({
  declarations: [OfferbookComponent, RequestComponent, OfferComponent, RequestPopupComponent, RequestItemComponent, OfferPopupComponent, RequestChangePopupComponent, ActualRequestComponent],
  imports: [
    OfbRoutingModule,
    CommonModule,
    EffectsModule.forFeature([RequestEffects, OfferEffects]),
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MaterialFileInputModule,
    MatIconModule,
    HttpClientModule,
    MatCheckboxModule
  ],
  providers: [],
  entryComponents:[]
})
export class OfferbookModule { }
