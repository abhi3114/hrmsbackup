import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-input',
 template: `
   <div [class.error]="showError">
	   <label>Date<sup style="color:red;">*</sup></label>
	   <input name="endDate" type='text' class= 'form-control' placeholder="dd.mm.yyyy" [formControl]="formControl" [formlyAttributes]="field" [owlDateTime]="ledt" [owlDateTimeTrigger]="ledt" [class.error]="showError"/>
	   <owl-date-time  [pickerType]="'calendar'" #ledt></owl-date-time>
	   <formly-validation-message *ngIf="showError"
	    [field]="field"></formly-validation-message>
	</div>
 `,
})
export class DatePickerComponent extends FieldType {}
