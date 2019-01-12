import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovedComponent } from './approved/approved.component';
import { UnapprovedComponent } from './unapproved/unapproved.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ApprovedComponent, UnapprovedComponent]
})
export class SubordinateLeavesModule { }
