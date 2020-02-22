import { Component, OnInit,TemplateRef, ViewChild,ElementRef } from '@angular/core';
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
  @ViewChild('myForm') myForm: ElementRef;
  showForm:boolean =true;
  form = new FormGroup({});
  today = new Date();
  model = {};
  fields: FormlyFieldConfig[]
  options: FormlyFormOptions = {};
  api_data:any;
  is_valid_form:boolean=false;
  canShowFormAttribute:boolean=false;
  canShowPrecautions:boolean=true;
  form_fields:any=[];
  categoriesArray:any=[];
  reimbursementform:FormGroup;
  mySelectedFiles:any=[];
  single_user_data:any=[];
  category:any;
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
  precaution:boolean=true;
  //loading is for table
  loading:boolean=false;
  //isLoading is use for claim submit button
  isLoading:boolean=false;
  currentmonth:any;
  nowloading:boolean =false;
  placeHolder = {
     "Mobile":
     {
      "From":"Start Of Cycle",
      "To":"End Of Cycle"
     },
     "Hotel":{
       "From":"Check-In Date",
       "To":"Check-Out Date"
     }
  }
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    class: "remCustom-modal",
    ignoreBackdropClick: true
  };
  splitmonthyear:any=[];
  ola_uber_show:boolean=false;
  hotelshow:boolean=false;
  petrolshow:boolean=false;
  fromtoshow:boolean=false;
  clientnameshow:boolean=false;
  formlyLoading: boolean=false;

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
      order: [[ 0, "desc" ]],
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
    this.is_valid_form = false;
    //console.log(this.reimbursementform.controls.month.value);
  }

  recordResponse(template: TemplateRef<any>,canReopen :any)
  {
    this.modalRef = this.modalService.show(template, this.config);
  }

  getPlaceHolders(type,placeholder):String{
      
     return this.placeHolder[type][placeholder]
  }
  submit(model) {
    if ($('.client_name').val() != undefined && $('.client_name').val().toString().length > 0){
      model['client_name'] = $('.client_name').val()
    }
    Object.keys( model ).map( function ( key ) {
      if ( model[key] == null){
        delete model[key]
      }
    });
    
    model["category_id"] = this.category
    model["name_file_attached"] =  this.mySelectedFiles[0] ? this.mySelectedFiles[0].name : null,
    model["attachment_base64"] =  this.base64
    this.isLoading=true;
    this.remService.createReimbursement(model).subscribe(res => {
      this.isLoading=false;
      this.modalRef.hide();
      this.toastr.showSuccess('Response Recorded');
      //this.options.resetModel();
      this.fields[0].formControl.markAsPristine()
      this.precaution=true;
      this.closeModal()
      this.getData();
      }, (err) => {
      this.isLoading=false;
      this.options.resetModel();
      this.fields=[];
      this.fields[0].formControl.markAsPristine()
      this.precaution=true;
      this.toastr.showError(err.error);
      this.modalRef.hide();
    });
  }

  configureFields(selectedCategory){
    this.formlyLoading = true;
    this.form_fields = [
      {
        fieldGroup: [],
      }
    ];
    var optionArr = [];
    var hashObject = {}
    this.remService.getAllFormAttribute(selectedCategory).subscribe(res => {
      this.api_data=res;
      this.api_data.forEach((data:any) => {
       
        if (data.title != 'client_name'){
         var type = data.data_type == 'date' ? 'date' : data.title == 'expense_for' ? 'custom-select' : data.data_type == 'integer' ? 'input' : data.data_type;
          if (data.options != undefined){
            data.options.forEach((option:string) => {
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
              placeholder: ((this.category == '3' || this.category == '6') && (type == 'date')) ? this.getPlaceHolders('Mobile',data.label) : (this.category == '4' && (type == 'date')) ? this.getPlaceHolders('Hotel',data.label) : data.label,
              required: data.required,
              options: optionArr
            }
          }
          this.form_fields[0].fieldGroup.push(commonHash);
         
          this.form_fields;
        }
      });
    },(err) => {
      this.loading=false;
    });
  }

  closeModal()
  {
    this.fields=[];
    this.precaution = true;
   this.modalRef.hide();
  }

  showError(){
    var el = $('.has-error');
    el.addClass('error');
    el.removeClass('has-error');
    var label = $('.invalid-feedback');
    label.addClass('error');
    label.removeClass('invalid-feedback');
    let validFlag0:boolean=false;
    let validFlag1:boolean=false;
    let validFlag2:boolean=false;
    let stringOnlyRegex = new RegExp('^[a-zA-Z ]*$');
    if(this.fields.length > 0 && this.fields[0].formControl.valid != undefined){
     
      if($('.client_name').val() != undefined && $('.client_name').val().toString().length > 0){
        validFlag2 = stringOnlyRegex.test($('.client_name').val().toString());
        console.log('validFlag2',validFlag2,$('.client_name').val().toString(),this.category);
      }
      this.fields[0].fieldGroup.map((data,index)=>{
        if(index == 0){
        validFlag0 = data.formControl.valid;
        }
        else{
        validFlag0 = validFlag0 && data.formControl.valid;
        }
      });
      this.fields[1].fieldGroup.map((data,index)=>{
        if(index == 0){
        validFlag1 = data.formControl.valid;
        }
        else{
        validFlag1 = validFlag1 && data.formControl.valid;
        }
      });
     if(this.category == 1 && $('.client_name').val() != undefined){
      return !(validFlag0 && validFlag1 && validFlag2 && this.mySelectedFiles[0] != undefined )
     }
     else{
     return !(validFlag0 && validFlag1  && this.mySelectedFiles[0] != undefined )
     }
    }
  }

  enableFormAccordingToCategory($event)
  {
   this.form_fields = [];
   if(this.fields.length > 0){
     this.fields[0].formControl.reset()
   }
    
    setTimeout(()=>{this.showForm=false;this.showForm=true},2000)
    this.model = {};
    this.options.resetModel();
    this.options.updateInitialValue();
    
    this.precaution=false;
    this.category = $event.target.value;
    this.mySelectedFiles = [];
    let common_fields = []
    var amountCustomClass = this.category == 4 ? 'custom-amount' : ''
    if (this.category == 7){
      common_fields = [
        {
          fieldGroup: [
            {
              key: 'category_id',
              defaultValue: this.category
            },
            {
              key: 'amount',
              type: 'Integer',
              className: 'col-md-4',
              templateOptions: {
                label: 'Amount',
                placeholder: 'Bill Amount',
                required: true,
    
              }
            },
            {
              key: 'date',
              type: 'date',
              className: 'col-md-4 custom-amount',
              templateOptions: {
                label: 'Date',
                placeholder: 'Date of Travel',
                required: true,
              }
            },
            {
              key: 'purpose',
              type: 'textarea',
              className: 'clearfix col-md-12 prp-space',
              templateOptions: {
                label: 'Purpose',
                placeholder: 'Give Details',
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
    }
    else
    {
      common_fields = [
        {
          fieldGroup: [
            {
              key: 'category_id',
              defaultValue: this.category
            },
            {
              key: 'amount',
              type: 'Integer',
              className: 'col-md-4'+' '+amountCustomClass,
              templateOptions: {
                label: 'Amount',
                placeholder: 'Bill Amount',
                required: true,
              }
            },
            {
              key: 'purpose',
              type: 'textarea',
              className: 'clearfix col-md-12 ',
              templateOptions: {
                label: 'Purpose',
                placeholder: 'Give Details',
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
    }
     this.configureFields(this.category);
     setTimeout(()=>{
     
      this.fields = [...this.form_fields, ...common_fields];
     
     
    
      this.formlyLoading = false;
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
    console.log(res.reimbursements);
    this.rembursement_api_data=res.reimbursements;
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
    //view form will be visible according to category
    if(this.single_user_data.category_name==="Ola/Uber")
    {
      this.ola_uber_show=true;
      if(this.single_user_data.data.expense_for==="client")
      {
        this.clientnameshow=true;
      }
    }
    else
    {
      this.ola_uber_show=false;
      this.clientnameshow=false;
    }
    if(this.single_user_data.category_name==="Hotel Stay")
    {
      this.hotelshow=true;
    }
    else
    {
      this.hotelshow=false;
    }
    if(this.single_user_data.category_name==="Petrol/CNG")
    {
      this.petrolshow=true;
    }
    else
    {
      this.petrolshow=false;
    }
    if(this.single_user_data.category_name==="Hotel Stay" || this.single_user_data.category_name==="Electricity" || this.single_user_data.category_name==="Mobile Bill")
    {
      this.fromtoshow=true;
    }
    else
    {
      this.fromtoshow=false;
    }
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
