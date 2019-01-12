import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap';
import { LeavesComponent } from './leaves/leaves.component';
import { ApprovedLeavesComponent } from './approved-leaves/approved-leaves.component';
import { UnapprovedLeavesComponent } from './unapproved-leaves/unapproved-leaves.component';
import { MasterComponent } from './master/master.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  imports: [
  CommonModule,
  DataTablesModule,
  ModalModule.forRoot(),
  BsDatepickerModule.forRoot(),
  CollapseModule.forRoot()
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
