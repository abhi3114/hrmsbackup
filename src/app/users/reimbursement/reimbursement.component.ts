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
  model = {};
  fields: FormlyFieldConfig[]
  api_data:any;
  canShowFormAttribute:boolean=false;
  form_fields:any=[];
  categoriesArray:any=[];
  reimbursementform:FormGroup;
  mySelectedFiles:any=[];
  base64: any;
  reimbursementformdata={month:'',year:''};
  rembursement_api_data:any;
  modalRef: BsModalRef;
  openapproved: boolean = false;
  openunapproved: boolean = false;
  openrejected: boolean = false;
  rembursementTableOptions: DataTables.Settings = {};
  responseData = { file: '' };
  errorInvalidFile:boolean;
  errorLargeFile:boolean;
  reimbursementTableTrigger: Subject<any> = new Subject();
  //moment data used while login
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
      category: new FormControl('', [Validators.required]),
      client_name: new FormControl('', [Validators.required])
    });

    this.rembursementTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[10, 20, 50, -1],
      [10, 20, 50, "All"]]
    };

    this.reimbursementform = new FormGroup({
      month: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
    });
    console.log(this.componentyear,this.componentmonth)
    this.categoriesArray = [{"id": 1, "value": 'Ola/Uber'}, {"id": 2, "value": 'Local Travel'}, {"id":3, "value": 'Mobile Bill'}, {"id" :4, "value": 'Hotel Stay'}, {"id": 5, "value": 'Food'}, {"id": 6, "value": 'Electricity'}, {"id": 7, "value": 'Petrol/CNG'}, {"id" : 8, "value": 'Flight Tickets'} , {"id": 9, "value": 'Miscellaneous'}]
    this.getUnapprovedData();
  }

  ngOnInit(){

    this.fields = []
    //console.log(this.reimbursementform.controls.month.value);
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
    if ($('.client_name').val().toString().length > 0){
      model['client_name'] = $('.client_name').val()
    }
    model["name_file_attached"] =  this.mySelectedFiles[0] ? this.mySelectedFiles[0].name : null,
    model["attachment_base64"] =  this.base64
    console.log(this.model);
    this.remService.createReimbursement(model).subscribe(res => {
      this.modalRef.hide();
      this.toastr.showSuccess('Response Recorded');
      this.getUnapprovedData();
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
      if (data.title != 'client_name'){
        var type = (data.data_type == 'date') ? 'date' : ((data.title == 'expense_for') ? 'custom-select' : data.data_type)
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
            options: optionArr
          }
        }
        this.form_fields.push(commonHash)
        this.form_fields;
      }
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
          label: 'Attach Bill',
          change: (field, $event) => this.handleFileInput($event.target.files)
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
    var year;var month;
    this.openapproved = true;
    this.openunapproved = false;
    this.openrejected = false;
     this.rembursement_api_data=[];
      $('#RembursementDataTables').DataTable().destroy();
      this.reimbursementform.controls.year.value == "" ? year = this.currentyear : year =
     this.reimbursementform.controls.year.value
    this.reimbursementform.controls.month.value == "" ? month = this.cmonth : month = this.reimbursementform.controls.month.value
     this.remService.getApproved(month,year).subscribe((res:any) => {
     this.rembursement_api_data=res.reimbursements;
       this.reimbursementTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
        });

  }
  getUnapprovedData()
   {
    var year;var month;
    this.openunapproved = true;
    this.openapproved = false;
    this.openrejected = false;
    this.rembursement_api_data=[];
    console.log( this.reimbursementform.controls.year.value)
    $('#RembursementDataTables').DataTable().destroy();
    this.reimbursementform.controls.year.value == "" ? year = this.currentyear : year =
     this.reimbursementform.controls.year.value
    this.reimbursementform.controls.month.value == "" ? month = this.cmonth : month = this.reimbursementform.controls.month.value
    this.remService.getUnapproved(month,year).subscribe((res:any) =>{
      this.rembursement_api_data=res.reimbursements;
      this.reimbursementTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
        });

   }
   getRejectedData()
   {
     var year;var month;
    this.openrejected = true;
    this.openapproved = false;
    this.openunapproved = false;
    this.rembursement_api_data=[];
     $('#RembursementDataTables').DataTable().destroy();
     this.reimbursementform.controls.year.value == "" ? year = this.currentyear : year =
     this.reimbursementform.controls.year.value
    this.reimbursementform.controls.month.value == "" ? month = this.cmonth : month = this.reimbursementform.controls.month.value
    this.remService.getRejected(month,year).subscribe((res:any) => {
      this.rembursement_api_data=res.reimbursements;
      this.reimbursementTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
        });
   }

   getData()
   {
    this.openrejected ? this.getRejectedData() : this.openapproved ? this.getApprovedData() :
    this.getUnapprovedData();

   }

  modelChange(model) {
    console.warn(model);
  }

  triggerOnChange(){
    console.log('hello')
  }

  handleFileInput(file) {
    if (file.length > 0) {
      const extension = this.getFileExtension(file[0].name);
      const size: number = (file[0].size / (1024 * 1024));
      if (extension === 'jpg' || extension === 'png' || extension === 'jpeg' || extension === 'xlsx' || extension === 'pdf' || extension === 'xls' || extension === 'JPG' && size < 5.00) {
        this.mySelectedFiles.push(file[0])
        this.errorInvalidFile = false;
        this.errorLargeFile = false;
        this.responseData.file = this.mySelectedFiles[0];
        console.log('File', this.responseData.file)
        this.readThis(this.mySelectedFiles[0]);
      }
      else if (size > 5.00) {
        this.errorInvalidFile = false;
        this.errorLargeFile = true;
      }
      else {
        this.errorInvalidFile = true;
        this.errorLargeFile = false;
      }
    }
  }

  getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  }

  async readThis(inputValue: any) {
    var myReader: FileReader = new FileReader();
    myReader.readAsDataURL(inputValue);
    myReader.onloadend = (e) => {
      this.base64 = myReader.result;
    }
  }

}
