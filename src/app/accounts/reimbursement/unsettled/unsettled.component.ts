import { Component, OnInit,TemplateRef,ViewChild,ElementRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable,Subject } from 'rxjs';
import { MonthYearService } from '../../../shared/service/month-year.service';
import { NotificationService } from '../../../shared/service/notification.service';
import { UnsettledService } from './unsettled.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Papa } from 'ngx-papaparse';
import { map } from 'rxjs/operators';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import * as FileSaver from "file-saver";
import * as moment from 'moment';



@Component({
  selector: 'app-unsettled',
  templateUrl: './unsettled.component.html',
  styleUrls: ['./unsettled.component.css']
})
export class UnsettledComponent implements OnInit {

  @ViewChild('error_modal_of_import_csv_file') error_modal_of_csv_file: ElementRef;
  filterdataform:FormGroup;
  uploadcsvdataform:FormGroup;
  monthArray:any;yearArray:any;
  unsettled_filter:any={selectedmonth:'',selectedyear:''};
  unsettledOptions: DataTables.Settings = {};
  unsettledTableTrigger: Subject<any> = new Subject();
  unsettle_api_data:any=[];
  single_user_unsettled_data:any=[];
  single_user_single_unsettled_data:any=[];
  splitmonthyear:any=[];
  csv_error:any=[];
  postdata:any=[];
  sheet_data:any;
  importedData:any=[];
  month:any;
  year:any;
  currentmomentmonth:any;
  user_id:any;
  exportsheet:any=[];
  attachedbill:boolean=false;
  //isLoading is for buttons
  isLoading:boolean=false;
  //loading is for tables
  loading:boolean=false;
  //singleuserloading is for single user record table
  singleuserloading:boolean=false;
  ola_uber_show:boolean=false;
  hotelshow:boolean=false;
  petrolshow:boolean=false;
  fromtoshow:boolean=false;
  clientnameshow:boolean=false;

  csvData:any= [
  ["NAME","SURNAME","EMAIL"],
  ["Ahmed", "Tomi", "ah@smthing.co.com"],
  ["Raed", "Labes", "rl@smthing.co.com"],
  ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  ];
  sheet:any=[];
  myFormattedCSV:any;

  userssetttledmodalRef:BsModalRef;
  singleusersingledataModalRef:BsModalRef;
  errormodalofcsv:BsModalRef;
  uploadcsvmodal:BsModalRef;
  exportcsvmodal:BsModalRef;


  constructor(private monthandyear:MonthYearService,private api:UnsettledService,public toastr: NotificationService,private modalService: BsModalService, private papa:Papa) {

    this.unsettledOptions= {
      pagingType: 'full_numbers',
      lengthMenu: [[10, 20, 50, -1],
      [10, 20, 50, "All"]]
    };

    this.monthArray=this.monthandyear.populateMonth();
    this.yearArray=this.monthandyear.populateYear();
    this.unsettled_filter.selectedmonth=moment().month()+1;
    this.unsettled_filter.selectedyear=moment().year();

    this.filterdataform = new FormGroup({
      filtermonth: new FormControl('', [Validators.required]),
      filteryear: new FormControl('', [Validators.required]),
    });

    this.uploadcsvdataform=new FormGroup({
         csvfile: new FormControl(''),
    });

    this.getFilterData();
  }
  ngOnInit()
  {}
  getFilterData()
  {
    $('#unsettledDataTables').DataTable().destroy();
    this.filterdataform.controls.filteryear.value == "" ? this.year = this.unsettled_filter.selectedyear : this.year =
    this.filterdataform.controls.filteryear.value
    this.filterdataform.controls.filtermonth.value == "" ? this.month = this.unsettled_filter.selectedmonth : this.month =
    this.filterdataform.controls.filtermonth.value
    //console.log(this.year,this.month)
    this.loading=true;
    this.api.getUnSettledReimbursementUsers(this.year,this.month).subscribe((res:any) => {
    this.unsettle_api_data=res;
    this.isLoading=false;
    this.loading=false;
    this.unsettledTableTrigger.next();
    }, (err) => {
    this.toastr.showError(err.error);
    this.loading=false;
    });
    this.currentmomentmonth=moment().month(this.month-1).format("MMMM");

  }
  userunsettledList(template: TemplateRef<any>,s)
  {
    this.userssetttledmodalRef = this.modalService.show(template);
    this.filterdataform.controls.filteryear.value == "" ? this.year = this.unsettled_filter.selectedyear : this.year =
    this.filterdataform.controls.filteryear.value
    this.filterdataform.controls.filtermonth.value == "" ? this.month = this.unsettled_filter.selectedmonth : this.month =
    this.filterdataform.controls.filtermonth.value
    this.user_id=s.user_id;
    this.singleuserloading=true;
    this.api.getSinghleUserUnsettledData(this.year,this.month,this.user_id).subscribe((res:any) => {
    this.single_user_unsettled_data=res.reimbursements;
    console.log(this.single_user_unsettled_data)
    this.singleuserloading=false;
    }, (err) => {
    this.toastr.showError(err.error);
    this.singleuserloading=false;
    });
  }

  singleusersingleunsettleddata(template: TemplateRef<any>,s)
  {
    this.singleusersingledataModalRef=this.modalService.show(template);
    this.single_user_single_unsettled_data=s;
    console.log(this.single_user_unsettled_data)
    if(s.receipt_path==null || s.receipt_path=="undefined" || s.receipt_path=="")
    {
      this.attachedbill=true;
    }
    else
    {
      this.attachedbill=false;
    }
    var spiltmonthandyear=(s.display_month_year).split('-');
    this.splitmonthyear=spiltmonthandyear;
    if(this.single_user_single_unsettled_data.category_name==="Ola/Uber")
    {
      this.ola_uber_show=true;
      if(this.single_user_single_unsettled_data.data.expense_for==="client")
      {
        this.clientnameshow=true;
      }
    }
    else
    {
      this.ola_uber_show=false;
      this.clientnameshow=false;
    }
    if(this.single_user_single_unsettled_data.category_name==="Hotel Stay")
    {
      this.hotelshow=true;
    }
    else
    {
      this.hotelshow=false;
    }
    if(this.single_user_single_unsettled_data.category_name==="Petrol/CNG")
    {
      this.petrolshow=true;
    }
    else
    {
      this.petrolshow=false;
    }
    if(this.single_user_single_unsettled_data.category_name==="Hotel Stay" || this.single_user_single_unsettled_data.category_name==="Electricity" || this.single_user_single_unsettled_data.category_name==="Mobile Bill")
    {
      this.fromtoshow=true;
    }
    else
    {
      this.fromtoshow=false;
    }
  }

  closesingleusersingledatamodal()
  {
    this.singleusersingledataModalRef.hide();
  }
  importcsvmodal(template: TemplateRef<any>)
  {
    this.uploadcsvmodal=this.modalService.show(template);
  }
   closeimportcsvmodal()
  {
    this.uploadcsvmodal.hide();
    this.uploadcsvdataform.reset();
  }
  importCsv(){
    let file = (<HTMLInputElement>($('#files')[0])).files[0];
    this.postdata = {};
    if(file == undefined)
    {
      this.toastr.CustomErrorMessage('Please Select a csv file');
    }
    else
    {
      var can_import_sheet = true;
      this.isLoading=true;
      if(can_import_sheet)
      {
        this.papa.parse(file, {
          header: true,
          complete: (results) => {
           //this is for null check of csv data
           //console.log("My Result",results)
           results.data.forEach((result,index)=>{
              if(result.ID==""){
                results.data.splice(index,1);
              }
            });
            this.sheet_data = results.data
            this.callSaveApi(this.sheet_data);
            }
          });
        this.isLoading=false;
      }
      else
      {
        this.toastr.CustomErrorMessage('cannot import sheet');
      }
    }
  }
  callSaveApi(parsedSheetData)
  {
    this.postdata = {'data':parsedSheetData};
    this.isLoading=true;
    this.api.importCsvData(this.unsettled_filter.selectedmonth, this.unsettled_filter.selectedyear, this.postdata).subscribe((response:any) => {
    //console.log(response);
    this.importedData = response;
    //console.log("success_messages",this.importedData.success_messages);
    //console.log("Error-Message",this.importedData.error_messages)
    this.getErrorModal();
    this.getFilterData();
    this.refreshUnsettledData();
    //this.toastr.showSuccess("Successfully Uploaded!");
    this.closeimportcsvmodal();
    this.isLoading=false;
    },
    (error) => {
    this.toastr.showError('error due to Api');
    this.isLoading=false;
    });
  }
  getErrorModal()
  {
    this.errormodalofcsv= this.modalService.show(this.error_modal_of_csv_file);
  }
  close_error_modal()
  {
    this.errormodalofcsv.hide();
  }
  refreshUnsettledData()
  {
    this.api.getSinghleUserUnsettledData(this.year,this.month,this.user_id).subscribe((res:any) => {
    this.single_user_unsettled_data=res.reimbursements;
    }, (err) => {
    this.toastr.showError(err.error);
    });
  }
  exportmodal(template: TemplateRef<any>)
  {
    this.exportcsvmodal=this.modalService.show(template);
  }
  closeexportmodal()
  {
    this.exportcsvmodal.hide();
  }
  exportAllUserToCSV()
  {
    if(confirm('Are you sure to Export CSV Data for Following: \nMONTH-'+this.currentmomentmonth+' & YEAR-'+this.year))
    {
      this.filterdataform.controls.filteryear.value == "" ? this.year = this.unsettled_filter.selectedyear : this.year =
      this.filterdataform.controls.filteryear.value
      this.filterdataform.controls.filtermonth.value == "" ? this.month = this.unsettled_filter.selectedmonth : this.month =
      this.filterdataform.controls.filtermonth.value
      this.api.getAllUserExportAllList(this.month,this.year).subscribe((res:any) => {
      this.exportsheet=res.reimbursements;
      this.exportsheet.map((data)=>{
        if(data.review_reason!=null)
        {
          data.review_reason=data.review_reason.split('</br>').join('');
        }
      })
      // for(let i=0;i<res.reimbursements.length;i++)
      // {
      //   this.exportsheet.push([res.reimbursements[i].id,res.reimbursements[i].user_name,res.reimbursements[i].display_month_year,res.reimbursements[i].category_name,res.reimbursements[i].display_date,res.reimbursements[i].employee_number,res.reimbursements[i].department_name,res.reimbursements[i].manager_name,res.reimbursements[i].purpose,res.reimbursements[i].review_reason,res.reimbursements[i].amount,res.reimbursements[i].receipt_path]);
      // }
      this.isLoading=true;
      var options = {showLabels:true,showTitle: false,title: 'Your title',headers: ["ID", "USERNAME", "MONTH/YEAR","CATEGORY NAME","DATE","EMPLOYEE CODE","DEPARTMENT NAME","MANAGER NAME","PURPOSE","REVIEW REASON","AMOUNT","RECIEPT","Settled"]};
      new Angular5Csv(this.exportsheet, 'ExportAll-month-'+this.month+'-year-'+this.year,options);
      this.isLoading=false;
      this.closeexportmodal();
      }, (err) => {
      this.toastr.showError(err.error);
      this.isLoading=false;
      this.closeexportmodal();
      });
    }
  }
  export_error_csv()
  {
    this.isLoading=true;
    var options = {showLabels:true,showTitle: false,title: 'Your title',headers: ["ID","MESSAGE"]};
    new Angular5Csv(this.importedData.error_messages,'Error-CSV-Report-month-'+this.month+'-year-'+this.year,options);
    this.isLoading=false;
    this.errormodalofcsv.hide();
  }

}