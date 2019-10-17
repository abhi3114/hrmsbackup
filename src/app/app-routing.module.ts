import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { HelpdeskComponent } from './users/helpdesk/helpdesk.component';

const routes: Routes = [
  {
    path: "**",
    redirectTo: "/home/dashboard"
  },
  {path: 'help_desk', component: HelpdeskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  })
export class AppRoutingModule { }
