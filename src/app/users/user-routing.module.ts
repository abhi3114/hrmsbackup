import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from '../shared/components/master/master.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssetsComponent } from './assets/assets.component';
import { AllLeavesComponent } from './all-leaves/all-leaves.component';
import { ApprovedLeavesComponent } from './approved-leaves/approved-leaves.component';
import { UnapprovedLeavesComponent } from './unapproved-leaves/unapproved-leaves.component';
import { AllOutdoorDutiesComponent } from './all-outdoor-duties/all-outdoor-duties.component';
import { ApprovedOutdoorDutiesComponent } from './approved-outdoor-duties/approved-outdoor-duties.component';
import { UnapprovedOutdoorDutiesComponent } from './unapproved-outdoor-duties/unapproved-outdoor-duties.component';
import { AllLateMarksComponent } from './all-late-marks/all-late-marks.component';
import { ApprovedLateMarksComponent } from './approved-late-marks/approved-late-marks.component';
import { UnapprovedLateMarksComponent } from './unapproved-late-marks/unapproved-late-marks.component';
import { AllMissingAttendanceComponent } from './all-missing-attendance/all-missing-attendance.component';
import { ApprovedMissingAttendanceComponent } from './approved-missing-attendance/approved-missing-attendance.component';
import { UnapprovedMissingAttendanceComponent } from './unapproved-missing-attendance/unapproved-missing-attendance.component';

const routes: Routes = [
{
  path: 'home',component: MasterComponent,
  children: [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'assets', component: AssetsComponent},
  {path: 'leaves', component: AllLeavesComponent},
  {path: 'leaves/approved', component: ApprovedLeavesComponent},
  {path: 'leaves/unapproved', component: UnapprovedLeavesComponent},
  {path: 'outdoor_duties', component: AllOutdoorDutiesComponent},
  {path: 'outdoor_duties/approved', component: ApprovedOutdoorDutiesComponent},
  {path: 'outdoor_duties/unapproved', component: UnapprovedOutdoorDutiesComponent},
  {path: 'late_marks', component: AllLateMarksComponent},
  {path: 'late_marks/approved', component: ApprovedLateMarksComponent},
  {path: 'late_marks/unapproved', component: UnapprovedLateMarksComponent},
  {path: 'missing_attendance', component: AllMissingAttendanceComponent},
  {path: 'missing_attendance/approved', component: ApprovedMissingAttendanceComponent},
  {path: 'missing_attendance/unapproved', component: UnapprovedMissingAttendanceComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  })
export class UserRoutingModule { }
