import { Component, OnInit,TemplateRef,ViewChild,ElementRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable,Subject } from 'rxjs';
import { MonthYearService } from '../../../shared/service/month-year.service';
import { CommonSalaryService } from '../../../shared/service/common-salary.service';
import { NotificationService } from '../../../shared/service/notification.service';
import { UnsettledService } from './unsettled.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Papa } from 'ngx-papaparse';
import { map } from 'rxjs/operators';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import * as FileSaver from "file-saver";
import { Router } from '@angular/router';

@Component({
  selector: 'app-unsettled',
  templateUrl: './unsettled.component.html',
  styleUrls: ['./unsettled.component.css']
})
export class UnsettledComponent implements OnInit {

  @ViewChild('error_modal_of_import_csv_file') error_modal_of_csv_file: ElementRef;
  filterdataform:FormGroup;
  uploadcsvdataform:FormGroup;
  monthArray:any;yearArray:any;filteredData:any;
  unsettled_filter={selectedmonth:'',selectedyear:''};
  unsettledOptions: DataTables.Settings = {};
  unsettledTableTrigger: Subject<any> = new Subject();
  unsettle_api_data:any=[];
  single_user_unsettled_data:any[];
  single_user_single_unsettled_data:any[];
  splitmonthyear:any=[];
  csv_error:any=[];
  postdata:any=[];
  sheet_data:any;
  importedData:any=[];
  month:any;
  year:any;
  user_id:any;
  exportsheet:any=[];
  attachedbill:boolean=false;
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


  constructor(private monthandyear:MonthYearService,private commonsalary:CommonSalaryService,private api:UnsettledService,public toastr: NotificationService,private modalService: BsModalService, private papa:Papa,private router: Router) {

    this.unsettledOptions= {
      pagingType: 'full_numbers',
      lengthMenu: [[10, 20, 50, -1],
      [10, 20, 50, "All"]]
    };
    

    this.monthArray=this.monthandyear.populateMonth();
    this.yearArray=this.monthandyear.populateYear();
    this.filteredData=this.commonsalary.getMonthandYear();
    this.unsettled_filter.selectedmonth=this.filteredData.selectedmonth;
    this.unsettled_filter.selectedyear= this.filteredData.selectedyear;

    this.filterdataform = new FormGroup({
      filtermonth: new FormControl('', [Validators.required]),
      filteryear: new FormControl('', [Validators.required]),
    });

    this.uploadcsvdataform=new FormGroup({
         csvfilehidden: new FormControl(''),
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
    //console.log(year,month)
    this.api.getUnSettledReimbursementUsers(this.year,this.month).subscribe((res:any) => {
    this.unsettle_api_data=res;
    this.unsettledTableTrigger.next();
    }, (err) => {
    this.toastr.showError(err.error);
    });

  }
  userunsettledList(template: TemplateRef<any>,s)
  {
    this.userssetttledmodalRef = this.modalService.show(template);
    this.filterdataform.controls.filteryear.value == "" ? this.year = this.unsettled_filter.selectedyear : this.year =
    this.filterdataform.controls.filteryear.value    
    this.filterdataform.controls.filtermonth.value == "" ? this.month = this.unsettled_filter.selectedmonth : this.month =
    this.filterdataform.controls.filtermonth.value
     this.user_id=s.user_id;
    this.api.getSinghleUserUnsettledData(this.year,this.month,this.user_id).subscribe((res:any) => {
    this.single_user_unsettled_data=res.reimbursements;
    }, (err) => {
    this.toastr.showError(err.error);
    });
  }

  singleusersingleunsettleddata(template: TemplateRef<any>,s)
  {
    this.singleusersingledataModalRef=this.modalService.show(template);
    this.single_user_single_unsettled_data=s;
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
      if(can_import_sheet)
      {
        this.papa.parse(file, {
          header: true,
          complete: (results) => {
           //this is for null check of csv data
           console.log("My Result",results)
           results.data.forEach((result,index)=>{
              if(result.ID==""){
                results.data.splice(index,1);
              }
            });
            this.sheet_data = results.data
            this.callSaveApi(this.sheet_data);
            }
          });
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
    this.api.importCsvData(this.unsettled_filter.selectedmonth, this.unsettled_filter.selectedyear, this.postdata).subscribe((response:any) => {
    //console.log(response);
    this.importedData = response;
     //console.log("success_messages",this.importedData.success_messages);
     //console.log("Error-Message",this.importedData.error_messages)
        this.getErrorModal()
        this.getFilterData();
        this.refreshUnsettledData();
        //this.toastr.showSuccess("Successfully Uploaded!");
        this.closeimportcsvmodal();
    },
    (error) => {
      this.toastr.showError('error due to Api');
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
  exportAllUserToCSV()
  {
    this.filterdataform.controls.filteryear.value == "" ? this.year = this.unsettled_filter.selectedyear : this.year =
    this.filterdataform.controls.filteryear.value    
    this.filterdataform.controls.filtermonth.value == "" ? this.month = this.unsettled_filter.selectedmonth : this.month =
    this.filterdataform.controls.filtermonth.value
    this.api.getAllUserExportAllList(this.month,this.year).subscribe((res:any) => {
    this.exportsheet=res.reimbursements;
    // this.exportsheet.forEach((data)=>{
    //   if(data.comment==null)
    //   {
    //     data.comment = 'N/A'
    //   }
    // })
    //console.log(this.exportsheet)
    var options = {showLabels:true,showTitle: false,title: 'Your title',headers: ["ID", "USERNAME", "MONTH/YEAR","CATEGORY NAME","DATE","PURPOSE","COMMENT","REVIEW_REASON","AMOUNT","RECIEPT","Settled"]};
    new Angular5Csv(this.exportsheet, 'ExportAll',options);
    //console.log('myFormattedCSV',myFormattedCSV)
    //this.myFormattedCSV.csv = 'Instuctions↵↹ABCD'+this.myFormattedCSV.csv
    //console.log('myNewFormattedCSV',)
    //saveAs(this.myFormattedCSV.csv,"MYSAVE.csv");
    }, (err) => {
    this.toastr.showError(err.error);
    });


   
    
  }
}