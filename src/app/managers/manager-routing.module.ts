import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'leaves', loadChildren: "./subords-leaves/subords-leaves.module#SubordsLeavesModule" },
  { path: 'outdoor-duties', loadChildren: "./subords-outdoor-duties/subords-outdoor-duties.module#SubordsOutdoorDutiesModule" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class ManagerRoutingModule { }
