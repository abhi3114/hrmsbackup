import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NullDataPipe } from './pipes/null-data.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NullDataPipe],
    exports: [
    NullDataPipe
  ]

})
export class SharedModule { }
