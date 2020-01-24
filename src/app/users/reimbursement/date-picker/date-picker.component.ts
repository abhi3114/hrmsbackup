import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-input',
 template: `
   <label>Date<sup style="color:red;">*</sup></label>
   <input class="form-control" [formControl]="formControl" [formlyAttributes]="field" [owlDateTime]="dt2" placeholder="Date Time">
   <span [owlDateTimeTrigger]="dt2"><i class="fa fa-calendar"></i></span>
   <owl-date-time #dt2></owl-date-time>
 `,
})
export class DatePickerComponent extends FieldType {}
