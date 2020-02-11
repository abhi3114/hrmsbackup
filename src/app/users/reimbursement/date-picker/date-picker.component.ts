import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-input',
 template: `
   <label>Date<sup style="color:red;">*</sup></label>
   <input name="endDate" type='text' class= 'form-control' placeholder="dd.mm.yyyy" [formControl]="formControl" [formlyAttributes]="field" [owlDateTime]="ledt" [owlDateTimeTrigger]="ledt" />
   <input name="endDate" type='text' placeholder="dd.mm.yyyy" [formControl]="formControl" [formlyAttributes]="field" [owlDateTime]="ledt" [owlDateTimeTrigger]="ledt" />
   <owl-date-time  [pickerType]="'calendar'" #ledt></owl-date-time>
 `,
})
export class DatePickerComponent extends FieldType {}
