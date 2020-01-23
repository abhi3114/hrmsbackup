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
import {FormlyModule} from '@ngx-formly/core';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
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
import { RejectedLateMarksComponent } from './rejected-late-marks/rejected-late-marks.component';
import { RejectedLeavesComponent } from './rejected-leaves/rejected-leaves.component';
import { RejectedMissingAttendancesComponent } from './rejected-missing-attendances/rejected-missing-attendances.component';
import { RejectedOutdoorDutiesComponent } from './rejected-outdoor-duties/rejected-outdoor-duties.component';
import {HelpdeskComponent} from './helpdesk/helpdesk.component'
import {AddTicketComponent} from './helpdesk/add-ticket/add-ticket.component'
import { TooltipModule } from 'ng2-tooltip-directive';
import {AgentHelpdeskComponent} from './agent-helpdesk/agent-helpdesk.component';
import { EditTicketComponent } from './agent-helpdesk/edit-ticket/edit-ticket.component';
import { ViewTicketComponent } from './agent-helpdesk/view-ticket/view-ticket.component';
import { ViewTicketsComponent } from './helpdesk/view-ticket/view-ticket.component';
import { ClipboardModule } from 'ngx-clipboard';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { ReimbursementComponent } from './reimbursement/reimbursement.component';
import { NewClaimComponent } from './reimbursement/new-claim/new-claim.component';
import { FormlyFieldFile } from './reimbursement/file-type.component';


@NgModule({
  imports: [
  CommonModule,
  DataTablesModule,
  FormlyBootstrapModule,
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
  PdfViewerModule,
  TooltipModule,
  ClipboardModule,
  DeviceDetectorModule.forRoot(),
  FormlyModule.forRoot({
    types: [
      { name: 'file', component: FormlyFieldFile, wrappers: ['form-field'] },
    ],
  }),
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
  RejectedLateMarksComponent,
  RejectedLeavesComponent,
  RejectedMissingAttendancesComponent,
  RejectedOutdoorDutiesComponent,
  HelpdeskComponent,
  AddTicketComponent,
  AgentHelpdeskComponent,
  EditTicketComponent,
  ViewTicketComponent,
  ViewTicketsComponent,
  ReimbursementComponent,
  NewClaimComponent,
  FormlyFieldFile
  ],
  providers: [{provide: OWL_DATE_TIME_LOCALE, useValue: 'en-IN'}],
  })
export class UsersModule { }
