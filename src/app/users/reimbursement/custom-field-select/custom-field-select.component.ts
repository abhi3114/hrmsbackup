import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-custom-field-select',
  template: `
    <div [class.error]="showError">
      <label>Expense For<sup style="color:red;">*</sup></label>
      <select (change)="toggleDeppendentField($event)"
       class="select2 form-control" style="width: 100%; height: 35px;" [formControl]="formControl" [formlyAttributes]="field">
       <option value="" disabled="disabled">Select</option>
       <option *ngFor="let e of expanseFor" value="{{e.id}}">{{e.value}}</option>
      </select>
      <formly-validation-message *ngIf="showError" [field]="field"></formly-validation-message>
    </div>
      <label *ngIf="canShowField">Client Name<sup style="color:red;">*</sup></label>
     <input *ngIf="canShowField" type="text" class="client_name form-control" formControlName="client_name">
   `,
})
export class CustomFieldSelectComponent extends FieldType {
  canShowField:boolean = false;
  expanseFor:any = [{"id": "client", "value": "Client"}, {"id": "self", "value": "Self"}]
 toggleDeppendentField($event){
    if ($event.target.value == 'client'){
      this.canShowField = true;
    }
    else{
     this.canShowField = false;
    }
  }
}
