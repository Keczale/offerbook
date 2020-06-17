import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferbookComponent } from './offerbook.component';
import { EffectsModule } from '@ngrx/effects';
import { RequestEffects } from '../../store/request/request.effects';



@NgModule({
  declarations: [OfferbookComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([RequestEffects])
  ]
})
export class OfferbookModule { }
