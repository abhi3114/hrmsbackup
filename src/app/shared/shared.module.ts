import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './components/master/master.component';
import { NullDataPipe } from './pipes/null-data.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MasterComponent, NullDataPipe],
    exports: [
    NullDataPipe
  ]

})
export class SharedModule { }
