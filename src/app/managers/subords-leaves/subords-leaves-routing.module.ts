import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovedComponent } from './approved/approved.component';
import { UnapprovedComponent } from './unapproved/unapproved.component';
import { RejectedComponent } from './rejected/rejected.component';

const routes: Routes = [
  { path: 'approved', component: ApprovedComponent },
  { path: 'unapproved', component: UnapprovedComponent },
  { path: 'rejected', component: RejectedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class SubordsLeavesRoutingModule { }
