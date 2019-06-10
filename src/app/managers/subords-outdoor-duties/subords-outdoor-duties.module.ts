import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule,OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { SubordsOutdoorDutiesRoutingModule } from './subords-outdoor-duties-routing.module';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { ApprovedOutdoorDutiesComponent } from './approved/approved-outdoor-duties.component';
import { UnapprovedOutdoorDutiesComponent } from './unapproved/unapproved-outdoor-duties.component';
import { RejectedOutdoorDutiesComponent } from './rejected/rejected-outdoor-duties.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    DataTablesModule,
    SubordsOutdoorDutiesRoutingModule,
  ],
  declarations: [ApprovedOutdoorDutiesComponent, UnapprovedOutdoorDutiesComponent, RejectedOutdoorDutiesComponent]
})
export class SubordsOutdoorDutiesModule { }
