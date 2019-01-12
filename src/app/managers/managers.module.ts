import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubordinateLeavesModule } from './subordinate-leaves/subordinate-leaves.module';
import { ManagerRoutingModule } from './manager-routing.module'


@NgModule({
  imports: [
    CommonModule,
    SubordinateLeavesModule,
    ManagerRoutingModule
  ],
  declarations: []
})
export class ManagersModule { }
