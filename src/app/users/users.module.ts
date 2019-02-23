import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule,CollapseModule } from 'ngx-bootstrap';
import { RatingModule } from 'ngx-bootstrap/rating';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule,OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { MasterComponent } from '../shared/components/master/master.component';
import { LaddaModule } from 'angular2-ladda';
import { DashboardComponent } from '../shared/components/dashboard/dashboard.component';
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
import { BoosterSessionComponent } from './booster-session/booster-session.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { StationeryComponent } from './stationery/stationery.component';
import { RequestedStationeryComponent } from './requested-stationery/requested-stationery.component';
import { SharedModule } from '../shared/shared.module';
import { PoliciesComponent } from './policies/policies.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  imports: [
  CommonModule,
  DataTablesModule,
  UserRoutingModule,
  ModalModule.forRoot(),
  BsDatepickerModule.forRoot(),
  CollapseModule.forRoot(),
  RatingModule.forRoot(),
  LaddaModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
  SharedModule,
  PdfViewerModule
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
  UnapprovedMissingAttendanceComponent,
  BoosterSessionComponent,
  ResetPasswordComponent,
  StationeryComponent,
  RequestedStationeryComponent,
  PoliciesComponent,
  ],
  providers: [{provide: OWL_DATE_TIME_LOCALE, useValue: 'en-IN'}],
  })
export class UsersModule { }
