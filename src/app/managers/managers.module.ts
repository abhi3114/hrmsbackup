import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule,OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { ManagerRoutingModule } from './manager-routing.module'
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { ApprovedComponent } from './subordinate-leaves/approved/approved.component';
import { UnapprovedComponent } from './subordinate-leaves/unapproved/unapproved.component';
import { ApprovedOutdoorDutiesComponent } from './subordinate-outdoor-duties/approved-outdoor-duties/approved-outdoor-duties.component';
import { UnapprovedOutdoorDutiesComponent } from './subordinate-outdoor-duties/unapproved-outdoor-duties/unapproved-outdoor-duties.component';
import { ApprovedLateMarksComponent } from './subordinate-late-marks/approved-late-marks/approved-late-marks.component';
import { UnapprovedLateMarksComponent } from './subordinate-late-marks/unapproved-late-marks/unapproved-late-marks.component';
import { ApprovedMissingAttendanceComponent } from './subordinate-missing-attendance/approved-missing-attendance/approved-missing-attendance.component';
import { UnapprovedMissingAttendanceComponent } from './subordinate-missing-attendance/unapproved-missing-attendance/unapproved-missing-attendance.component';
import { SharedModule } from '../shared/shared.module';
import { RejectedLateMarksComponent } from './subordinate-late-marks/rejected-late-marks/rejected-late-marks.component';
import { RejectedOutdoorDutiesComponent } from './subordinate-outdoor-duties/rejected-outdoor-duties/rejected-outdoor-duties.component';


@NgModule({
    imports: [
    CommonModule,
    DataTablesModule,
    ManagerRoutingModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedModule
    ],
    declarations: [
    ApprovedComponent,
    UnapprovedComponent,
    ApprovedLateMarksComponent,
    UnapprovedLateMarksComponent,
    UnapprovedOutdoorDutiesComponent,
    ApprovedOutdoorDutiesComponent,
    ApprovedMissingAttendanceComponent,
    UnapprovedMissingAttendanceComponent,
    RejectedLateMarksComponent,
    RejectedOutdoorDutiesComponent,

    ]
    })
export class ManagersModule { }
