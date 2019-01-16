import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalaryProcessingComponent } from './salary-processing/salary-processing.component'
import { MasterComponent } from '../shared/components/master/master.component';
import { EditSalaryComponent } from './edit-salary/edit-salary.component';
import { SalaryImportComponent } from './salary-import/salary-import.component';

const routes: Routes = [
{
  path: 'home', component: MasterComponent,
  children: [
  {path: 'users/salaries', component: SalaryProcessingComponent},
  {path: 'users/:id', component: EditSalaryComponent},
  {path: 'users/salaries/import', component: SalaryImportComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  })
export class AccountsRoutingModule { }
