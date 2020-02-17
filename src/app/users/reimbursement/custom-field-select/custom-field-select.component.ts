import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-custom-field-select',
  template: `
    <div [formGroup]="clientNameField">
      <label>Expense For<sup style="color:red;">*</sup></label>
        <select (change)="toggleDeppendentField($event)"
         class="select2 form-control" style="width: 100%; height: 35px;" [formControl]="formControl" [formlyAttributes]="field">
         <option value="" disabled="disabled">Select item</option>
         <option *ngFor="let e of expanseFor" value="{{e.id}}">{{e.value}}</option>
        </select>
      <label *ngIf="canShowField">Client Name<sup style="color:red;">*</sup></label>
     <input *ngIf="canShowField"  type="text" class="form-control" [(ngModel)]="clientNameField.client_name" formControlName="client_name" required >
     <div class="error" *ngIf="clientNameField.get('client_name').hasError('required') && canShowField && clientNameField.get('client_name').touched">
       This field is mandatory
     </div>
 `,
})
export class CustomFieldSelectComponent extends FieldType {
  canShowField:boolean = false;
  expanseFor:any = [{"id": "client", "value": "Client"}, {"id": "self", "value": "Self"}]

  clientNameField = new FormGroup({
    client_name: new FormControl('', [Validators.required]),
  });

  toggleDeppendentField($event){
    if ($event.target.value == 'client'){
      this.canShowField = true;
    }
    else{
     this.canShowField = false;
    }
  }
}
