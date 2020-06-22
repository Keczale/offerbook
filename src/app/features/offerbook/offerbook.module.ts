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
import { OfferbookDataService } from './services/offerbook-data.service';
import { OfferbookService } from './services/offerbook.service';
import { HttpClientModule} from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';





@NgModule({
  declarations: [OfferbookComponent, RequestComponent, OfferComponent, RequestPopupComponent, RequestItemComponent, OfferPopupComponent],
  imports: [
    OfbRoutingModule,
    CommonModule,
    EffectsModule.forFeature([RequestEffects]),
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MaterialFileInputModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [OfferbookDataService, OfferbookService],
  entryComponents:[RequestPopupComponent, OfferPopupComponent]
})
export class OfferbookModule { }
