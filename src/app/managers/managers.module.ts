import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule,OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { ManagerRoutingModule } from './manager-routing.module'
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { ApprovedComponent } from './subordinate-leaves/approved/approved.component';
import { UnapprovedComponent } from './subordinate-leaves/unapproved/unapproved.component';


@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    ManagerRoutingModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  declarations: [
    ApprovedComponent,
    UnapprovedComponent
  ]
})
export class ManagersModule { }
