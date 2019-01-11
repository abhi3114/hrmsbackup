import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeavesComponent } from './leaves/leaves.component';
import { ApprovedLeavesComponent } from './approved-leaves/approved-leaves.component';
import { UnapprovedLeavesComponent } from './unapproved-leaves/unapproved-leaves.component';
import { MasterComponent } from './master/master.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LeavesComponent,
    ApprovedLeavesComponent,
    UnapprovedLeavesComponent,
    DashboardComponent,
    MasterComponent
  ]
})
export class UsersModule { }
