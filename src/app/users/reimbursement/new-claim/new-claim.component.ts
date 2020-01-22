import { Component, OnInit,Input,ViewChild,ElementRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Reimbursementservice } from '../reimbursement.service';
import {FormlyFieldConfig} from '@ngx-formly/core';

@Component({
  selector: 'app-new-claim',
  templateUrl: './new-claim.component.html',
  styleUrls: ['./new-claim.component.css']
})
export class NewClaimComponent implements OnInit {
  @ViewChild('selectref') selectedref: ElementRef;
  @ViewChild('selectfor1') selectfor2: ElementRef;
  @Input() template: any;
  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[] = [{
    key: 'email',
    type: 'input',
    templateOptions: {
      label: 'Email address',
      placeholder: 'Enter email',
      required: true,
    }
  }];

  constructor(private rmService:Reimbursementservice) { }

  ngOnInit()
  {

  }


}
