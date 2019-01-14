import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovedComponent } from './subordinate-leaves/approved/approved.component';
import { UnapprovedComponent } from './subordinate-leaves/unapproved/unapproved.component';
import { MasterComponent } from '../shared/components/master/master.component';

const routes: Routes = [
  {
    path: 'home', component: MasterComponent,
    children: [
      {path: 'users/approved_leaves', component: ApprovedComponent},
      {path: 'users/unapproved_leaves', component: UnapprovedComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  })
export class ManagerRoutingModule { }
