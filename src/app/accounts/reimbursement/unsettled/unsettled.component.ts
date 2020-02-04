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


@Component({
  selector: 'app-unsettled',
  templateUrl: './unsettled.component.html',
  styleUrls: ['./unsettled.component.css']
})
export class UnsettledComponent implements OnInit {

  @ViewChild('error_modal_of_import_csv_file') error_modal_of_csv_file: ElementRef;
  filterdataform:FormGroup;
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
  csvData:any= [
  ["Ahmed", "Tomi", "ah@smthing.co.com"],
  ["Raed", "Labes", "rl@smthing.co.com"],
  ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  ];
  sheet:any=[];
  pushexportsheet:any[];

  userssetttledmodalRef:BsModalRef;
  singleusersingledataModalRef:BsModalRef;
  errormodalofcsv:BsModalRef;


  constructor(private monthandyear:MonthYearService,private commonsalary:CommonSalaryService,private api:UnsettledService,public toastr: NotificationService,private modalService: BsModalService, private papa:Papa) {

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
    //console.log(s.receipt)
    //console.log(s)
    var spiltmonthandyear=(s.display_month_year).split('-');
    this.splitmonthyear=spiltmonthandyear;
  }

  closesingleusersingledatamodal()
  {
    this.singleusersingledataModalRef.hide();
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
      var can_import_sheet = true
      if(can_import_sheet)
      {
        this.papa.parse(file, {
          header: true,
          complete: (results) => {
           //this is for null check of csv data
           // results.data.forEach((result,index)=>{
           //    if(result.ID==""){
           //      results.data.splice(index,1);
           //    }
           //  });
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
    //console.log(parsedSheetData)
    this.postdata = {'data':parsedSheetData,'month':this.unsettled_filter.selectedmonth,'year':this.unsettled_filter.selectedyear};
    this.api.importCsvData(this.postdata).subscribe((response:any) => {
    this.importedData = response;
      // response.forEach(function (item)=>{
      //       if(item.status=="failed")
      //       {
      //        this.csv_error.push(this.item);
      //       }
      //  });
      this.csv_error=[];
      console.log(this.importedData)
      for(let i=0;i<response.length;i++)
      {
        if(this.importedData[i].status=="failed")
        {
          this.csv_error.push(this.importedData[i])
          console.log(this.importedData[i])
        }
      }
      if(this.csv_error.length===0)
      {
        this.getFilterData();
        this.refreshUnsettledData();
        this.toastr.showSuccess("Successfully Uploaded!");
      }
      else
      {
        this.getErrorModal();
      }
    },
    (error) => {
      this.toastr.showError('error due to Api');
      });
  }

  getErrorModal()
  {
    this.errormodalofcsv= this.modalService.show(this.error_modal_of_csv_file);
    this.filterdataform.controls.csvfilehidden.reset();
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
    //console.log(this.exportsheet)
    this.exportsheet.forEach((data)=>{
      if(data.comment==null)
      {
        data.comment = 'N/A'
      }
      if(data.review_reason==null)
      {
        data.review_reason = 'N/A'
      }
      if(data.receipt_path=="" || data.receipt_path)
      {
        data.receipt_path = 'N/A'
      }
      //this.pushexportsheet.push(data.id,data.user_name,data.display_month_year,data.category_name,data.display_date);
    })
    //console.log(this.exportsheet)
    var options = {headers: ["ID", "USERNAME", "MONTH/YEAR","CATEGORY NAME","DATE","PURPOSE","COMMENT","REVIEW_REASON","AMOUNT","RECIEPT","Settled"]};
    new Angular5Csv(this.exportsheet, 'ExportAll',options);
    //console.log(this.pushexportsheet)
    }, (err) => {
    this.toastr.showError(err.error);
    });

   
    
  }
}