import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NullDataPipe } from './pipes/null-data.pipe';
import { IndianCurrencyPipe } from './pipes/indian-currency.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NullDataPipe, IndianCurrencyPipe],
    exports: [
    NullDataPipe,IndianCurrencyPipe
  ]

})
export class SharedModule { }
