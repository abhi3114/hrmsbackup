import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { AccountsRoutingModule } from './accounts-routing.module';
import { SalaryProcessingComponent } from './salary-processing/salary-processing.component'
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { EditSalaryComponent } from './edit-salary/edit-salary.component';
import { SalaryImportComponent } from './salary-import/salary-import.component';
import { PapaParseModule } from 'ngx-papaparse';

@NgModule({
    imports: [
    CommonModule,
    BrowserAnimationsModule,
    DataTablesModule,
    AccountsRoutingModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatSlideToggleModule,
    PapaParseModule
    ],
    declarations: [SalaryProcessingComponent, EditSalaryComponent, SalaryImportComponent]
    })
export class AccountsModule { }
