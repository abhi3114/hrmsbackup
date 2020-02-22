import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-custom-field-select',
  template: `
  <div [formGroup]="clientNameField">
       <label>Expense For<sup style="color:red;">*</sup></label>
         <select (change)="toggleDeppendentField($event)"
          class="select2 form-control" style="width: 100%; height: 35px;margin-bottom:22px;" [formControl]="formControl" [formlyAttributes]="field" [(ngModel)]='selectedValue' formControlName='client_type'>
          <option  value='' disabled="disabled">Select Item</option>
          <option *ngFor="let e of expanseFor" value="{{e.id}}">{{e.value}}</option>
         </select>
         <div class="error" *ngIf="clientNameField.get('client_type').hasError('required') && clientNameField.get('client_type').touched">
         This field is mandatory
        </div>
        <label *ngIf="canShowField">Client Name<sup style="color:red;">*</sup></label>
      <input *ngIf="canShowField" style="margin-bottom:22px;" type="text" class="form-control client_name" [(ngModel)]="clientNameField.client_name" formControlName="client_name" placeholder="Client Name" required >
      <div class="error" *ngIf="clientNameField.get('client_name').hasError('required') && canShowField && clientNameField.get('client_name').touched">
         This field is mandatory
      </div>
      <div class="error" *ngIf="clientNameField.get('client_name').hasError('pattern') && canShowField && clientNameField.get('client_name').touched">
     Invalid Name
   </div>
   `,
})
export class CustomFieldSelectComponent extends FieldType {
  canShowField:boolean = false;
  expanseFor:any = [{"id": "client", "value": "Client"}, {"id": "self", "value": "Self"}]
  nameRegex:any ='^[a-zA-Z ]*$'
  selectedValue = '';
  clientNameField = new FormGroup({
     client_name: new FormControl('', [Validators.required,Validators.pattern(this.nameRegex)]),
     client_type: new FormControl('',[Validators.required])
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
