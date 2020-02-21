import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NullDataPipe } from './pipes/null-data.pipe';
import { IndianCurrencyPipe } from './pipes/indian-currency.pipe';
import { Safe } from './pipes/comment-break-pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NullDataPipe, IndianCurrencyPipe,Safe],
    exports: [
    NullDataPipe,IndianCurrencyPipe,Safe
  ]

})
export class SharedModule { }
