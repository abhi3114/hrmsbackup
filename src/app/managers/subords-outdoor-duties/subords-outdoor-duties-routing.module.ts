import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovedOutdoorDutiesComponent } from './approved/approved-outdoor-duties.component';
import { UnapprovedOutdoorDutiesComponent } from './unapproved/unapproved-outdoor-duties.component';
import { RejectedOutdoorDutiesComponent } from './rejected/rejected-outdoor-duties.component';

const routes: Routes = [
  { path: 'approved', component: ApprovedOutdoorDutiesComponent },
  { path: 'unapproved', component: UnapprovedOutdoorDutiesComponent },
  { path: 'rejected', component: RejectedOutdoorDutiesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class SubordsOutdoorDutiesRoutingModule { }
