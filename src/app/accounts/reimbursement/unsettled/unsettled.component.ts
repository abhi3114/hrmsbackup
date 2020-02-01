import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable,Subject } from 'rxjs';
import { MonthYearService } from '../../../shared/service/month-year.service';
import { CommonSalaryService } from '../../../shared/service/common-salary.service';
import { NotificationService } from '../../../shared/service/notification.service';
import { UnsettledService } from './unsettled.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-unsettled',
  templateUrl: './unsettled.component.html',
  styleUrls: ['./unsettled.component.css']
})
export class UnsettledComponent implements OnInit {

  filterdataform:FormGroup;
  monthArray:any;yearArray:any;filteredData:any;
  unsettled_filter={selectedmonth:'',selectedyear:''};
  unsettledOptions: DataTables.Settings = {};
  unsettledTableTrigger: Subject<any> = new Subject();
  unsettle_api_data:any=[];
  single_user_unsettled_data:any[];
  single_user_single_unsettled_data:any[];
  splitmonthyear:any=[];
  postdata:any=[];
  sheet_data:any;
  importedData:any;

  userssetttledmodalRef:BsModalRef;
  singleusersingledataModalRef:BsModalRef;


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
    });

    this.getFilterData();

  }

  ngOnInit()
  {}
  
    getFilterData()
  {    
    var year;var month;
    $('#unsettledDataTables').DataTable().destroy();
    this.filterdataform.controls.filteryear.value == "" ? year = this.unsettled_filter.selectedyear : year =
    this.filterdataform.controls.filteryear.value    
    this.filterdataform.controls.filtermonth.value == "" ? month = this.unsettled_filter.selectedmonth : month =
    this.filterdataform.controls.filtermonth.value
    //console.log(year,month)
    this.api.getUnSettledReimbursementUsers(year,month).subscribe((res:any) => {
    this.unsettle_api_data=res;
    this.unsettledTableTrigger.next();
    }, (err) => {
    this.toastr.showError(err.error);
    });
    //console.log(this.unsettle_api_data)
  }

  
  userunsettledList(template: TemplateRef<any>,s)
  {
    this.userssetttledmodalRef = this.modalService.show(template);
    var year;var month;
    this.filterdataform.controls.filteryear.value == "" ? year = this.unsettled_filter.selectedyear : year =
    this.filterdataform.controls.filteryear.value    
    this.filterdataform.controls.filtermonth.value == "" ? month = this.unsettled_filter.selectedmonth : month =
    this.filterdataform.controls.filtermonth.value
    var user_id=s.user_id;
    this.api.getSinghleUserUnsettledData(year,month, user_id).subscribe((res:any) => {
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
           /* this is for null check of csv data
           results.data.forEach((result,index)=>{
              if(result.Name==""){
                results.data.splice(index,1);
              }
            });*/
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
    this.postdata = { "reimbursement_setteld_file": {'data':parsedSheetData,'month':this.unsettled_filter.selectedmonth,'year':this.unsettled_filter.selectedyear}};
    //this.api.importCsvData(this.postdata);
    this.api.importCsvData(this.postdata).subscribe(response => {
    //this.importedData = response;
    this.toastr.showSuccess(response);
    },
    (error) => {
      this.toastr.showError('error due to Api');

      });
  }

}
