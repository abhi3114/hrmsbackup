import { NgModule } from '@angular/core';
import { ManagerRoutingModule } from './manager-routing.module'
import { SharedModule } from '../shared/shared.module';
import { SubordsLeavesModule } from './subords-leaves/subords-leaves.module';
import { SubordsOutdoorDutiesModule } from './subords-outdoor-duties/subords-outdoor-duties.module';

@NgModule({
    imports: [
      ManagerRoutingModule,
      SubordsLeavesModule,
      SubordsOutdoorDutiesModule,
      SharedModule
    ],
    declarations: [

    ]
    })
export class ManagersModule { }
