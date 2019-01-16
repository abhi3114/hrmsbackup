import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalaryProcessingComponent } from './salary-processing/salary-processing.component'
import { MasterComponent } from '../shared/components/master/master.component';
import { EditSalaryComponent } from './edit-salary/edit-salary.component';
import { SalaryReportComponent } from './salary-report/salary-report.component';
const routes: Routes = [
{
  path: 'home', component: MasterComponent,
  children: [
  {path: 'users/salaries', component: SalaryProcessingComponent},
  {path: 'users/:id', component: EditSalaryComponent},
  {path: 'users/report/salary_report', component: SalaryReportComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  })
export class AccountsRoutingModule { }
