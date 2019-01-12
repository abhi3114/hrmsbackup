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
import { MasterComponent } from '../shared/components/master/master.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllLeavesComponent } from './all-leaves/all-leaves.component';
import { ApprovedLeavesComponent } from './approved-leaves/approved-leaves.component';
import { UnapprovedLeavesComponent } from './unapproved-leaves/unapproved-leaves.component';
import { AssetsComponent } from './assets/assets.component';
import { AllOutdoorDutiesComponent } from './all-outdoor-duties/all-outdoor-duties.component';
import { ApprovedOutdoorDutiesComponent } from './approved-outdoor-duties/approved-outdoor-duties.component';
import { UnapprovedOutdoorDutiesComponent } from './unapproved-outdoor-duties/unapproved-outdoor-duties.component';
import { AllLateMarksComponent } from './all-late-marks/all-late-marks.component';
import { ApprovedLateMarksComponent } from './approved-late-marks/approved-late-marks.component';
import { UnapprovedLateMarksComponent } from './unapproved-late-marks/unapproved-late-marks.component';
import { AllMissingAttendanceComponent } from './all-missing-attendance/all-missing-attendance.component';
import { ApprovedMissingAttendanceComponent } from './approved-missing-attendance/approved-missing-attendance.component';
import { UnapprovedMissingAttendanceComponent } from './unapproved-missing-attendance/unapproved-missing-attendance.component';


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
  AssetsComponent,
  AllOutdoorDutiesComponent,
  ApprovedOutdoorDutiesComponent,
  UnapprovedOutdoorDutiesComponent,
  AllLateMarksComponent,
  ApprovedLateMarksComponent,
  UnapprovedLateMarksComponent,
  AllMissingAttendanceComponent,
  ApprovedMissingAttendanceComponent,
  UnapprovedMissingAttendanceComponent
  ],
  providers: [{provide: OWL_DATE_TIME_LOCALE, useValue: 'en-IN'}],
  })
export class UsersModule { }
