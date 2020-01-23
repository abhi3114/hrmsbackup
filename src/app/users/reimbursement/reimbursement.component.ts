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
  model = { expense_for: '', title: '' };
  fields: FormlyFieldConfig[]
  api_data:any;
  canShowFormAttribute:boolean=false;
  form_fields:any=[];
  categoriesArray:any=[];
  reimbursementform:FormGroup;
  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(private modalService: BsModalService,private remService:Reimbursementservice)
  {
    this.form = new FormGroup({
      category: new FormControl('', [Validators.required])
    });

    this.categoriesArray = [{"id": 1, "value": 'Ola/Uber'}, {"id": 2, "value": 'Local Travel'}, {"id":3, "value": 'Mobile Bill'}, {"id" :4, "value": 'Hotel Stay'}, {"id": 5, "value": 'Food'}, {"id": 6, "value": 'Electricity'}, {"id": 7, "value": 'Petrol/CNG'}, {"id" : 8, "value": 'Flight Tickets'} , {"id": 9, "value": 'Miscellaneous'}]

  }

  ngOnInit(){
    this.fields = []
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

  configureFields(selectedCategory){
  this.form_fields = [];
  this.remService.getAllFormAttribute(selectedCategory).subscribe(res => {
    this.api_data=res;
    this.api_data.forEach(data => {
      var type = (data.data_type == 'date' || data.data_type == 'select') ? 'input' : data.data_type
      this.form_fields.push({
        key: data.title,
        type: 'input',
        templateOptions: {
          label: data.label,
          placeholder: data.label,
          required: data.required,
        }}
      )
    });
  },(err) => {
  });
  }

  closeModal()
  {
    this.modalRef.hide();
  }

  enableFormAccordingToCategory($event){
    let selectedCategory = $event.target.value;
    let common_fields = [
      {
        key: 'amount',
        type: 'input',
        templateOptions: {
          label: 'Amount',
          placeholder: 'Enter Amount',
          required: true,
        }
      },
      {
        key: 'purpose',
        type: 'textarea',
        templateOptions: {
          label: 'Purpose',
          placeholder: '',
          required: true,
        }
      },
      {
        key: 'file',
        type: 'file',
        templateOptions: {
          label: 'Attach Bill'
        }
      }
    ]
    this.configureFields(selectedCategory);
     setTimeout(()=>{
      this.fields = [...this.form_fields, ...common_fields];
    }, 1000);
  }


}
