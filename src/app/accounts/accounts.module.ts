import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { AccountsRoutingModule } from './accounts-routing.module';
import { SalaryProcessingComponent } from './salary-processing/salary-processing.component'
import { EditSalaryComponent } from './edit-salary/edit-salary.component';
import { SalaryImportComponent } from './salary-import/salary-import.component';
import { PapaParseModule } from 'ngx-papaparse';
import { SalaryReportComponent } from './salary-report/salary-report.component';
import { PaymentReportComponent } from './payment-report/payment-report.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MissingSalaryComponent } from './missing-salary/missing-salary.component';
import { FullAndFinalComponent } from './full-and-final/full-and-final.component';
import { SharedModule } from '../shared/shared.module';
import { SettledComponent } from './reimbursement/settled/settled.component';
import { UnsettledComponent } from './reimbursement/unsettled/unsettled.component';
import { ErrorUnsettledComponent } from './reimbursement/error-unsettled/error-unsettled.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';


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
    PapaParseModule,
    NgMultiSelectDropDownModule.forRoot(),
    LaddaModule,SharedModule,
    NgxLoadingModule.forRoot({
        animationType: ngxLoadingAnimationTypes.circle,
        primaryColour:'#f2910a',
        secondaryColour:'#ffff',
        backdropBorderRadius:'3px',
    }),
    ],
    declarations: [SalaryImportComponent, SalaryProcessingComponent, EditSalaryComponent, SalaryReportComponent, PaymentReportComponent, MissingSalaryComponent, FullAndFinalComponent, SettledComponent, UnsettledComponent, ErrorUnsettledComponent],
    })
export class AccountsModule { }
