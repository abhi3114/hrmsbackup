import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import {Reimbursementservice} from './reimbursement.service';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {Observable,Subject} from 'rxjs';
import { NotificationService } from '../../shared/service/notification.service';
import * as moment from 'moment';

@Component({
  selector: 'app-reimbursement',
  templateUrl: './reimbursement.component.html',
  styleUrls: ['./reimbursement.component.css']
})

export class ReimbursementComponent implements OnInit {
  form = new FormGroup({});
  today = new Date();
  model = { expense_for: '', title: '' };
  fields: FormlyFieldConfig[]
  api_data:any;
  canShowFormAttribute:boolean=false;
  form_fields:any=[];
  categoriesArray:any=[];
  reimbursementform:FormGroup;
  reimbursementformdata={month:'',year:''};
  rembursement_api_data:any;
  modalRef: BsModalRef;
  openapproved: boolean = false;
  openunapproved: boolean = false;
  openrejected: boolean = false;
  reimbursementTableTableTrigger: Subject<any> = new Subject();
  //for binding currentmonth and year in html
  currentmonth=moment().format('MMMM');
  cmonth=moment().month(this.currentmonth).format("M");
  currentyear=moment().format('YYYY');
  // to change
  months=[{"month_id":1,"month_name":'January'},
          {"month_id":2,"month_name":'February'},
          {"month_id":3,"month_name":'March'},
          {"month_id":4,"month_name":'April'},
          {"month_id":5,"month_name":'May'},
          {"month_id":6,"month_name":'June'},
          {"month_id":7,"month_name":'July'},
          {"month_id":8,"month_name":'August'},
          {"month_id":9,"month_name":'September'},
          {"month_id":10,"month_name":'October'},
          {"month_id":11,"month_name":'November'},
          {"month_id":12,"month_name":'December'}
          ];
  years=[2020,2019,2018,2017];
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true
  };
    componentmonth:any;
    componentyear:any;

  constructor(private modalService: BsModalService,private remService:Reimbursementservice,public toastr: NotificationService)
  {
    this.form = new FormGroup({
      category: new FormControl('', [Validators.required])
    });
     this.reimbursementform = new FormGroup({
      month: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
    });

    this.categoriesArray = [{"id": 1, "value": 'Ola/Uber'}, {"id": 2, "value": 'Local Travel'}, {"id":3, "value": 'Mobile Bill'}, {"id" :4, "value": 'Hotel Stay'}, {"id": 5, "value": 'Food'}, {"id": 6, "value": 'Electricity'}, {"id": 7, "value": 'Petrol/CNG'}, {"id" : 8, "value": 'Flight Tickets'} , {"id": 9, "value": 'Miscellaneous'}];
    //this.getApprovedData();

    this.reimbursementform.controls.year.value == "" || this.reimbursementform.controls.month.value == ""  ? this.getUnapprovedData(this.currentyear,this.cmonth) : this.getUnapprovedData(this.reimbursementform.controls.year.value,this.reimbursementform.controls.month.value)
    if(this.reimbursementform.controls.year.value == "" || this.reimbursementform.controls.month.value == "")
    {
         this.componentyear=this.currentyear;
         this.componentmonth=this.cmonth;
    }
    else
    {
      this.componentyear=this.reimbursementform.controls.year.value;
      this.componentmonth=this.reimbursementform.controls.month.value;
    }
      console.log(this.componentyear,this.componentmonth)
  }

  ngOnInit(){
    this.fields = []
    //console.log(this.reimbursementform.controls.month.value);
    //console.log(this.cmonth);
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
    this.remService.createReimbursement(model).subscribe(res => {
      this.modalRef.hide();
      this.toastr.showSuccess('Response Recorded');
      }, (err) => {
      this.toastr.showError(err.error);
      this.modalRef.hide();
      this.form.reset();
    });

  }

  configureFields(selectedCategory){
  this.form_fields = [];
  var optionArr = [];
  var hashObject = {}
  this.remService.getAllFormAttribute(selectedCategory).subscribe(res => {
    this.api_data=res;
    this.api_data.forEach(data => {
      var type = (data.data_type == 'date') ? 'date' : data.data_type
      if (data.options != undefined){
        data.options.forEach(option => {
          optionArr.push(
            {label: option, value: option}
          )
        })
      }
      var commonHash = {
        key: data.title,
        type: type,
        templateOptions: {
          label: data.label,
          placeholder: data.label,
          required: data.required,
          options: optionArr,
          expressionProperties: {
            'templateOptions.min': 'formState.limitDate ? ${this.today} : null'
          }
        }
      }
      this.form_fields.push(commonHash)
      this.form_fields;
    });
  },(err) => {
  });
  }

  closeModal()
  {
    this.modalRef.hide();
  }

  enableFormAccordingToCategory($event){
    var selectedCategory = $event.target.value;
    let common_fields = [
      {
        key: 'category_id',
        defaultValue: selectedCategory
      },
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

  getApprovedData()
   {
    this.openapproved = true;
    this.openunapproved = false;
    this.openrejected = false;
  }
  getUnapprovedData(year,month)
   {
    this.openunapproved = true;
    this.openapproved = false;
    this.openrejected = false;
    // var year=this.reimbursementform.controls.year.value;
    // var month=this.reimbursementform.controls.month.value;
    this.remService.getUnapproved(month,year).subscribe((res:any) =>{
      this.rembursement_api_data=res.reimbursements;
      //console.log(this.rembursement_api_data);
      this.reimbursementTableTableTrigger.next();
      //this.leaveTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
        });

   }
   getRejectedData()
   {
    this.openrejected = true;
    this.openapproved = false;
    this.openunapproved = false;
    var year=this.reimbursementform.controls.year.value;
    var month=this.reimbursementform.controls.month.value;
    this.remService.getRejected(month,year).subscribe((res:any) => {
      this.rembursement_api_data=res.reimbursements;
      //console.log(this.rembursement_api_data);
      this.reimbursementTableTableTrigger.next();
      //this.leavesData=this.leaves_data.leaves_data;
      }, (err) => {
        this.toastr.showError(err.error);
        });
   }

   getData()
   {

    console.log(this.componentyear,this.componentmonth)
     var year=this.reimbursementform.controls.year.value;
     var month=this.reimbursementform.controls.month.value;
     //console.log(year,month);
     this.remService.getApproved(month,year).subscribe((res:any) => {
     this.rembursement_api_data=res.reimbursements;
      //console.log(this.rembursement_api_data);
      //this.leaveTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
        });
    }

    triggerOnChange(){
      console.log('hello')
    }

}
