import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovedComponent } from './subordinate-leaves/approved/approved.component';
import { UnapprovedComponent } from './subordinate-leaves/unapproved/unapproved.component';
import { ApprovedOutdoorDutiesComponent } from './subordinate-outdoor-duties/approved-outdoor-duties/approved-outdoor-duties.component';
import { DashboardComponent } from '../shared/components/dashboard/dashboard.component';
import { UnapprovedOutdoorDutiesComponent } from './subordinate-outdoor-duties/unapproved-outdoor-duties/unapproved-outdoor-duties.component';
import { RejectedOutdoorDutiesComponent } from './subordinate-outdoor-duties/rejected-outdoor-duties/rejected-outdoor-duties.component';
import { ApprovedLateMarksComponent } from './subordinate-late-marks/approved-late-marks/approved-late-marks.component';
import { UnapprovedLateMarksComponent } from './subordinate-late-marks/unapproved-late-marks/unapproved-late-marks.component';
import { RejectedLateMarksComponent } from './subordinate-late-marks/rejected-late-marks/rejected-late-marks.component';
import { ApprovedMissingAttendanceComponent } from './subordinate-missing-attendance/approved-missing-attendance/approved-missing-attendance.component';
import { UnapprovedMissingAttendanceComponent } from './subordinate-missing-attendance/unapproved-missing-attendance/unapproved-missing-attendance.component';
import { RejectedMissingAttendanceComponent } from './subordinate-missing-attendance/rejected-missing-attendance/rejected-missing-attendance.component';
import { MasterComponent } from '../shared/components/master/master.component';

const routes: Routes = [
  {
    path: 'home', component: MasterComponent,
    children: [
      {path: 'users/leaves/approved', component: ApprovedComponent},
      {path: 'users/leaves/unapproved', component: UnapprovedComponent},
      {path: 'users/outdoor_duties/approved', component: ApprovedOutdoorDutiesComponent },
      {path: 'users/outdoor_duties/unapproved', component: UnapprovedOutdoorDutiesComponent },
      {path: 'users/outdoor_duties/rejected', component: RejectedOutdoorDutiesComponent },
      {path: 'users/late_marks/approved', component: ApprovedLateMarksComponent },
      {path: 'users/late_marks/unapproved', component: UnapprovedLateMarksComponent },
      {path: 'users/late_marks/rejected', component: RejectedLateMarksComponent },
      {path: 'users/missing_attendances/approved', component: ApprovedMissingAttendanceComponent },
      {path: 'users/missing_attendances/unapproved', component: UnapprovedMissingAttendanceComponent },
      {path: 'users/missing_attendances/rejected', component: RejectedMissingAttendanceComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  })
export class ManagerRoutingModule { }
