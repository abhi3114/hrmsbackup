import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule,OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { SubordsLeavesRoutingModule } from './subords-leaves-routing.module';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { ApprovedComponent } from './approved/approved.component';
import { UnapprovedComponent } from './unapproved/unapproved.component';
import { RejectedComponent } from './rejected/rejected.component';
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
    SubordsLeavesRoutingModule,
  ],
  declarations: [ApprovedComponent, UnapprovedComponent, RejectedComponent]
})
export class SubordsLeavesModule { }
