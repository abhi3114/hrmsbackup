import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MasterComponent } from './master/master.component';
import { AllLeavesComponent } from './all-leaves/all-leaves.component';
import { ApprovedLeavesComponent } from './approved-leaves/approved-leaves.component';
import { UnapprovedLeavesComponent } from './unapproved-leaves/unapproved-leaves.component';
import { AssetsComponent } from './assets/assets.component';

const routes: Routes = [
{
  path: 'home',component: MasterComponent,
  children: [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'assets', component: AssetsComponent},
  {path: 'leaves', component: AllLeavesComponent},
  {path: 'leaves/approved', component: ApprovedLeavesComponent},
  {path: 'leaves/unapproved', component: UnapprovedLeavesComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  })
export class UserRoutingModule { }
