import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalaryProcessingComponent } from './salary-processing/salary-processing.component'
import { MasterComponent } from '../shared/components/master/master.component';
import { EditSalaryComponent } from './edit-salary/edit-salary.component';
import { SalaryImportComponent } from './salary-import/salary-import.component';
import { SalaryReportComponent } from './salary-report/salary-report.component';
import { PaymentReportComponent } from './payment-report/payment-report.component';
import { MissingSalaryComponent } from './missing-salary/missing-salary.component';
import { FullAndFinalComponent } from './full-and-final/full-and-final.component';
import { DashboardComponent } from '../shared/components/dashboard/dashboard.component';

const routes: Routes = [
{
  path: 'home', component: MasterComponent,
  children: [
  {path: 'users/salaries', component: SalaryProcessingComponent},
  {path: 'users/:id/payments', component: EditSalaryComponent},
  {path: 'users/salaries/import', component: SalaryImportComponent},
  {path: 'users/:id/payments', component: EditSalaryComponent},
  {path: 'users/salary_report', component: SalaryReportComponent},
  {path: 'users/payment_report', component: PaymentReportComponent},
  {path: 'users/salaries/missing', component: MissingSalaryComponent},
  {path: 'users/salaries/full_and_final', component: FullAndFinalComponent},
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  })
export class AccountsRoutingModule { }
