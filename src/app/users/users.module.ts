import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeavesComponent } from './leaves/leaves.component';
import { ApprovedLeavesComponent } from './approved-leaves/approved-leaves.component';
import { UnapprovedLeavesComponent } from './unapproved-leaves/unapproved-leaves.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LeavesComponent, ApprovedLeavesComponent, UnapprovedLeavesComponent]
})
export class UsersModule { }
