import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    // path: 'home', component: MasterComponent
  { path: 'leaves', loadChildren: "./subords-leaves/subords-leaves.module#SubordsLeavesModule" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class ManagerRoutingModule { }
