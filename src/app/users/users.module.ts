import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule,OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { MasterComponent } from './master/master.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllLeavesComponent } from './all-leaves/all-leaves.component';
import { ApprovedLeavesComponent } from './approved-leaves/approved-leaves.component';
import { UnapprovedLeavesComponent } from './unapproved-leaves/unapproved-leaves.component';
import { AssetsComponent } from './assets/assets.component';


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
  BrowserAnimationsModule,
  OwlDateTimeModule,
  OwlNativeDateTimeModule
  ],
  declarations: [
  ApprovedLeavesComponent,
  UnapprovedLeavesComponent,
  DashboardComponent,
  MasterComponent,
  AllLeavesComponent,
  AssetsComponent
  ],
  providers: [{provide: OWL_DATE_TIME_LOCALE, useValue: 'en-IN'}],
  })
export class UsersModule { }
