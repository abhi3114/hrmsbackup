import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap';
import { LeavesComponent } from './leaves/leaves.component';
import { ApprovedLeavesComponent } from './approved-leaves/approved-leaves.component';
import { UnapprovedLeavesComponent } from './unapproved-leaves/unapproved-leaves.component';
import { MasterComponent } from './master/master.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule,OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';


@NgModule({
  imports: [
  CommonModule,
  DataTablesModule,
  UserRoutingModule,
  ModalModule.forRoot(),
  BsDatepickerModule.forRoot(),
  CollapseModule.forRoot(),
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule
  ],
  declarations: [
    LeavesComponent,
    ApprovedLeavesComponent,
    UnapprovedLeavesComponent,
    DashboardComponent,
    MasterComponent,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [{provide: OWL_DATE_TIME_LOCALE, useValue: 'en-IN'}],
})
export class UsersModule { }
