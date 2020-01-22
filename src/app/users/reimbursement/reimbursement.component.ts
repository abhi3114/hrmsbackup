import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import {Reimbursementservice} from './reimbursement.service';
import {FormlyFieldConfig} from '@ngx-formly/core';


@Component({
  selector: 'app-reimbursement',
  templateUrl: './reimbursement.component.html',
  styleUrls: ['./reimbursement.component.css']
})

export class ReimbursementComponent implements OnInit {
  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[]
  api_data:any;
  canShowFormAttribute:boolean=false;
  form_fields:any=[];
  reimbursementform:FormGroup;
  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(private modalService: BsModalService,private remService:Reimbursementservice)
  {}

  ngOnInit(){
  }

  recordResponse(template: TemplateRef<any>,canReopen :any)
  {

    this.modalRef = this.modalService.show(template, this.config);
  }

  refreshOpenTicketData()
  {

  }

  submit(model) {
    console.log(model);
  }

  configureFields(){
    this.remService.getAllFormAttribute().subscribe(res => {
      this.api_data=res;
      this.api_data.forEach(data => {
        var type = (data.data_type == 'date' || data.data_type == 'select') ? 'input' : data.data_type
        this.form_fields.push(
          {
            key: data.title,
            type: 'input',
            templateOptions: {
              label: data.label,
              placeholder: data.label,
              required: data.required
            }
          }
        )
      });
    },(err) => {
    });
    return this.form_fields;
  }

  closeModal()
  {
    this.modalRef.hide();
  }

  enableFormAccordingToCategory(){
    this.fields = this.configureFields();
  }


}
