import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import {Reimbursementservice} from './reimbursement.service';
import {FormlyFormOptions, FormlyFieldConfig} from '@ngx-formly/core';
import {Observable,Subject} from 'rxjs';
import { NotificationService } from '../../shared/service/notification.service';
import { MonthYearService } from '../../shared/service/month-year.service';
import * as moment from 'moment';

@Component({
  selector: 'app-reimbursement',
  templateUrl: './reimbursement.component.html',
  styleUrls: ['./reimbursement.component.css']
})

export class ReimbursementComponent implements OnInit {
  @ViewChild('formDirective') ngForm;
  form = new FormGroup({});
  today = new Date();
  model = {};
  fields: FormlyFieldConfig[]
  options: FormlyFormOptions = {};
  api_data:any;
  canShowFormAttribute:boolean=false;
  canShowPrecautions:boolean=true;
  form_fields:any=[];
  categoriesArray:any=[];
  reimbursementform:FormGroup;
  mySelectedFiles:any=[];
  single_user_data:any=[];
  base64: any;
  reimbursementformdata={month:'',year:''};
  rembursement_api_data:any;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  modalRef: BsModalRef;
  viewmodalRef:BsModalRef;
  editmodalRef:BsModalRef;
  openapproved: boolean = false;
  openunapproved: boolean = false;
  openrejected: boolean = false;
  rembursementTableOptions: DataTables.Settings = {};
  responseData = { file: '' };
  errorInvalidFile:boolean;
  errorLargeFile:boolean;
  reimbursementTableTrigger: Subject<any> = new Subject();
  monthArray:any;yearArray:any;filteredData:any;
  reimbursement_filter:any={selectedmonth:'',selectedyear:''};
  attachedbill:boolean=false;
  //loading is for table
  loading:boolean=false;
  //isLoading is use for claim submit button
  isLoading:boolean=false;
  currentmonth:any;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true
  };
  splitmonthyear:any=[];

  constructor(private modalService: BsModalService,private remService:Reimbursementservice,public toastr: NotificationService,private monthandyear:MonthYearService)
  {

    this.monthArray=this.monthandyear.populateMonth();
    this.yearArray=this.monthandyear.populateYear();
    this.reimbursement_filter.selectedmonth=moment().month()+1;
    this.reimbursement_filter.selectedyear=moment().year();
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
    this.categoriesArray = [{"id": 1, "value": 'Ola/Uber'}, {"id": 2, "value": 'Local Travel'}, {"id":3, "value": 'Mobile Bill'}, {"id" :4, "value": 'Hotel Stay'}, {"id": 5, "value": 'Food'}, {"id": 6, "value": 'Electricity'}, {"id": 7, "value": 'Petrol/CNG'}, {"id" : 8, "value": 'Flight Tickets'} , {"id": 9, "value": 'Miscellaneous'}]
    this.getUnapprovedData();

  }

  ngOnInit()
  {
    this.fields = [];
    //console.log(this.reimbursementform.controls.month.value);
  }

  recordResponse(template: TemplateRef<any>,canReopen :any)
  {

    this.modalRef = this.modalService.show(template, this.config);
  }


  submit(model) {
    console.log(model);
    if ($('.client_name').val() != undefined && $('.client_name').val().toString().length > 0){
      model['client_name'] = $('.client_name').val()
    }
    model["name_file_attached"] =  this.mySelectedFiles[0] ? this.mySelectedFiles[0].name : null,
    model["attachment_base64"] =  this.base64
    this.isLoading=true;
    this.remService.createReimbursement(model).subscribe(res => {
      this.isLoading=false;
      this.modalRef.hide();
      this.toastr.showSuccess('Response Recorded');
      this.options.resetModel();
      this.modalRef.hide();
      this.getData();
      }, (err) => {
      this.isLoading=false;
      this.options.resetModel();
      this.toastr.showError(err.error);
      this.modalRef.hide();
    });
  }

  configureFields(selectedCategory){
  this.form_fields = [
    {
      fieldGroup: [],
    }
  ];
  var optionArr = [];
  var hashObject = {}
  this.remService.getAllFormAttribute(selectedCategory).subscribe(res => {
    this.api_data=res;
    this.api_data.forEach(data => {
      if (data.title != 'client_name'){
        var type = (data.data_type == 'date') ? 'date' : ((data.title == 'expense_for') ? 'custom-select' : (data.data_type == 'integer' ? 'input' : data.data_type))
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
          className: 'col-md-4',
          templateOptions: {
            label: data.label,
            placeholder: data.label,
            required: data.required,
            options: optionArr
          }
        }
        this.form_fields[0].fieldGroup.push(commonHash)
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
        // fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'category_id',
            defaultValue: selectedCategory
          },
          {
            key: 'amount',
            type: 'input',
            className: 'col-md-4',
            templateOptions: {
              label: 'Amount',
              placeholder: 'Enter Amount',
              required: true,
            }
          },
          {
            key: 'purpose',
            type: 'textarea',
            className: 'clearfix col-md-12',
            templateOptions: {
              label: 'Purpose',
              placeholder: '',
              rows:'3',
              required: true,
            }
          },
          {
            key: 'file',
            type: 'file',
            className: 'col-md-12',
            templateOptions: {
              label: 'Attach Bill',
              change: (field, $event) => this.handleFileInput($event.target.files)
            }
          }
        ]
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
    this.reimbursementform.controls.year.value == "" ? year = this.reimbursement_filter.selectedyear : year =
    this.reimbursementform.controls.year.value
    this.reimbursementform.controls.month.value == "" ? month = this.reimbursement_filter.selectedmonth : month = this.reimbursementform.controls.month.value
    this.loading=true;
    this.remService.getApproved(month,year).subscribe((res:any) => {
    this.rembursement_api_data=res.reimbursements;
    this.loading=false;
    //console.log(this.rembursement_api_data)
    this.reimbursementTableTrigger.next();
    }, (err) => {
    this.toastr.showError(err.error);
    this.loading=false;
    });

  }
  getUnapprovedData()
   {
    var year;var month;
    this.openunapproved = true;
    this.openapproved = false;
    this.openrejected = false;
    this.rembursement_api_data=[];
    $('#RembursementDataTables').DataTable().destroy();
    this.reimbursementform.controls.year.value == "" ? year = this.reimbursement_filter.selectedyear : year =
    this.reimbursementform.controls.year.value
    this.reimbursementform.controls.month.value == "" ? month = this.reimbursement_filter.selectedmonth : month = this.reimbursementform.controls.month.value
    this.loading=true;
    this.remService.getUnapproved(month,year).subscribe((res:any) =>{
    this.rembursement_api_data=res.reimbursements;
    //for()
    //console.log(this.rembursement_api_data[2].data.length);
    this.loading=false;
    this.reimbursementTableTrigger.next();
    }, (err) => {
    this.loading=false;
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
    this.reimbursementform.controls.year.value == "" ? year = this.reimbursement_filter.selectedyear : year =
    this.reimbursementform.controls.year.value
    this.reimbursementform.controls.month.value == "" ? month = this.reimbursement_filter.selectedmonth : month = this.reimbursementform.controls.month.value
    this.loading=true;
    this.remService.getRejected(month,year).subscribe((res:any) => {
    this.rembursement_api_data=res.reimbursements;
    this.loading=false;
    //console.log(this.rembursement_api_data)
    this.reimbursementTableTrigger.next();
    }, (err) => {
    this.loading=false;
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

  viewreimbursementsingledata(template: TemplateRef<any>,l)
  {
    this.viewmodalRef=this.modalService.show(template);
    this.single_user_data=l;
    if(l.receipt_path==null || l.receipt_path=="undefined" || l.receipt_path=="")
    {
      this.attachedbill=true;
    }
    else
    {
      this.attachedbill=false;
    }
    var spiltmonthandyear=(l.display_month_year).split('-');
    this.splitmonthyear=spiltmonthandyear;
  }
  closeviewrembursementsingledatamodal()
  {
    this.viewmodalRef.hide();
  }

  closeeditrembursementsingledatamodal()
  {
    this.editmodalRef.hide();
  }


  deletereimbursementsingledata(r)
  {
    if(confirm("Are you sure to delete "))
    {
      var id=r.id;
      this.remService.deletesingledata(id).subscribe(res => {
        this.toastr.showSuccess('Reimbursement delete successfully');
        this.getData();
      }, (err) => {
        this.toastr.showError(err.error);
      });
    }
  }

  editrembursementsingledata(template: TemplateRef<any>,l)
  {
      this.editmodalRef=this.modalService.show(template);
      console.log(l)
  }


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
    this.reimbursementTableTrigger.next();
    });
  }

  resetModel() {
  }

}
