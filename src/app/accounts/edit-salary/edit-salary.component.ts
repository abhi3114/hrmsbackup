import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {Observable,Subject} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as _ from 'underscore';
import { EditSalaryService } from './edit-salary.service';
import { MonthYearService } from '../../shared/service/month-year.service';
import { PaymentComponentsService } from '../../shared/service/payment-components.service';

@Component({
  selector: 'app-edit-salary',
  templateUrl: './edit-salary.component.html',
  styleUrls: ['./edit-salary.component.css']
  })
export class EditSalaryComponent implements OnInit {
  salary_filter={selectedmonth:'',selectedyear:''};
  monthArray:any;yearArray:any; stateParams:any;queryParams:any;
  user_salary_data:any;components:any;user_payemnt_data:any;payment_components:any;
  choices = [{ id: 'choice',amount:'',component:'',details:'' }];user_payment_components:any; paymentArray=[];
  showIncentiveDetail:any;componentArray=[];payment_attributes=[];lwparray=[];data:any;
  isBetween:any;showUserSalary=false;showUserPayment=false;isshowBreakUp:false;
  addSalaryForm: FormGroup;
  addSalaryData={title:'',start_date:'',total_amount:''};
  salaryBreakComponents={basic:'',hra:''travel_allowance:'',special_allowance:'',pt:'',pbi:''}
  config = {
    animated:true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class:'modal-lg'
  };
  constructor(private router:Router,private api:EditSalaryService,private monthandyear:MonthYearService,private modalService: BsModalService,public toastr: ToastrManager,private route: ActivatedRoute,private paymentData:PaymentComponentsService)
  {
    this.route.params.subscribe( params => this.stateParams=params);
    this.route.queryParams.subscribe( queryParams => this.queryParams=queryParams);
    this.addSalaryForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      start_date: new FormControl('', [Validators.required]),
      total_amount: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]*$/i)]),
      });
  }
  ngOnInit()
  {
    this.monthArray=this.monthandyear.populateMonth();
    this.yearArray=this.monthandyear.populateYear();
    this.user_payment_components=this.paymentData.getPaymentComponents();
    this.salary_filter.selectedmonth=this.queryParams.month;
    this.salary_filter.selectedyear=this.queryParams.year;
    this.isBetween=this.monthandyear.getSalaryEditableRange(this.salary_filter.selectedmonth,this.salary_filter.selectedyear);
    this.api.getUserSalaryDetails(this.stateParams.id).subscribe(res => {
      this.user_salary_data=res;
      this.components=  this.user_salary_data.components;
      this.showUserSalary=true;
      }, (err) =>
      {
        this.showError(err.error);
        });
    this.api.getUserPayemntDetails(this.stateParams.id,this.salary_filter.selectedmonth,this.salary_filter.selectedyear).subscribe(res => {
      this.user_payemnt_data=res;
      this.payment_components=this.user_payemnt_data.components;
      this.showUserPayment=true;
      }, (err) =>
      {
        this.showError(err.error);
        });
  }
  refreshSalary()
  {
    this.api.getUserSalaryDetails(this.stateParams.id).subscribe(res => {
      this.user_salary_data=res;
      this.components=  this.user_salary_data.components;
      this.showUserSalary=true;
      }, (err) =>
      {
        this.showError(err.error);
        });
  }

  refreshPayment()
  {
    this.api.getUserPayemntDetails(this.stateParams.id,this.salary_filter.selectedmonth,this.salary_filter.selectedyear).subscribe(res => {
      this.user_payemnt_data=res;
      this.payment_components=this.user_payemnt_data.components;
      this.showUserPayment=true;
      }, (err) =>
      {
        this.showError(err.error);
        });
  }
  filter(month,year)
  {
    this.isBetween=this.monthandyear.getSalaryEditableRange(this.salary_filter.selectedmonth,this.salary_filter.selectedyear);
    this.api.getUserPayemntDetails(this.stateParams.id,this.salary_filter.selectedmonth,this.salary_filter.selectedyear).subscribe(res => {
      this.user_payemnt_data=res;
      this.payment_components=this.user_payemnt_data.components;
      this.showUserPayment=true;
      }, (err) =>
      {
        this.showError(err.error);
        });
  }

  showError(e,position: any = 'top-center') {
    this.toastr.errorToastr(e.message, 'Oops Some went wrong!',{  position: position});
  }
  showSuccess(message,position: any = 'top-center') {
    this.toastr.successToastr(message, 'Success',{  position: position});
  }
  showCustomError(message:any,position: any = 'top-center') {
    this.toastr.errorToastr(message,'Oops Some went wrong!',{  position: position});
  }
  addMoreCT()
  {
    var newItemNo2 = this.choices.length + 1;
    this.choices.push({ 'id': 'added' + newItemNo2,'component':'' });
    console.log(this.choices);
  }
  delCT (i)
  {
    if (i != 0) {
      var id = this.choices[i].id.toString();
      if (id.includes("added")) {
        this.componentArray.push({ title:this.paymentArray[i],amount:this.choices[i].amount, _destroy: true });
      }
      else {
        this.componentArray.push({ id: this.choices[i].id,title:this.titlesArray[i],amount:this.choices[i].amount, _destroy: true });
      }

      this.choices.splice(i, 1);
      this.paymentArray.splice(i,1);
    }
    else { this.showCustomError("There must atleast be a single component") }
  }
  getpayments(val,index)
  {
    if (val != null)
    {this.paymentArray[index]=val;}
    if(val =='Incentive')
    {this.showIncentiveDetail=true;}
    else{this.showIncentiveDetail=false;}
  }
  deletePay (i)
  {

    this.componentArray.push({ title:this.payment_components[i].title,amount:this.payment_components[i].amount,id:this.payment_components[i].id, _destroy: true });

    this.payment_components.splice(i, 1);
  }
  save()
  {

    for(var i=0;i<this.choices.length;i++)
    {
      if(this.paymentArray[i]=='Incentive')
      {
        this.componentArray.push({title:this.paymentArray[i],amount:this.choices[i].amount,details:this.choices[i].details})
      }
      else
      {
        this.componentArray.push({title:this.paymentArray[i],amount:this.choices[i].amount})
      }
    }
    if(this.payment_components != undefined)
    {
      for(var p=0;p<this.payment_components.length;p++)
      {
        if(this.paymentArray[i] == 'Incentive')
        {
          this.componentArray.push({title:this.payment_components[p].title,amount:this.payment_components[p].amount,details:this.payment_components[p].details,id:this.payment_components[p].id})
        }
        else{this.componentArray.push({title:this.payment_components[p].title,amount:this.payment_components[p].amount,id:this.payment_components[p].id})}

      }
    }

    this.payment_attributes.push({id:  this.user_payemnt_data.payment_id ,components_attributes:this.componentArray});

    if(this.user_payemnt_data.lwp_id==null)
    {this.lwparray.push({month:this.salary_filter.selectedmonth,year:this.salary_filter.selectedyear,lwp:this.user_payemnt_data.lwp})}
    else
    {this.lwparray.push({month:this.salary_filter.selectedmonth,year:this.salary_filter.selectedyear,lwp:this.user_payemnt_data.lwp,id:this.user_payemnt_data.lwp_id})}
    var postdata =
    {
      "user":
      {
        "lwps_attributes": this.lwparray,
        "payments_attributes": this.payment_attributes
      }

    }
    this.api.editPayment(this.stateParams.id,postdata).subscribe(res => {
      this.data=res;
      this.showSuccess('Payment Added');
      this.refreshPayment();
      this.choices = [{ id: 'choice','component':'' }]; this.paymentArray=[]; this.lwparray=[];
      this.componentArray=[];this.payment_attributes=[];
      }, (err) =>
      {
        this.showError(err.error);
        this.choices = [{ id: 'choice','component':'' }]; this.paymentArray=[]; this.lwparray=[];
        this.componentArray=[];this.payment_attributes=[];
        });
  }


  reprocessSal()
  {
    this.calculate();
  }
  calculate()
  {
    var currentmonth= new Date().getMonth()+1;
    var currentyear=new Date().getFullYear();
    var smonth= parseInt(this.salary_filter.selectedmonth);
    var prevYear = currentyear-1;
    var diffmonth= smonth - currentmonth;
    var diffyear= currentyear- this.salary_filter.selectedyear;
    if(currentyear== this.salary_filter.selectedyear)
    {
      if(diffmonth<1)
      {
        this.callreprocess();
      }
      else
      {
        this.showCustomError('salary can be reprocessed only of current or previous month');
      }
    }
    else if(diffyear == 1)
    {
      if(diffmonth== 11)
      {
        this.callreprocess();
      }
      else
      {
        this.showCustomError('salary can be reprocessed only of current or previous month');
      }
    }
    else
    {
      this.showCustomError('cannot re procees salary for selected year');
    }
  }
  callreprocess()
  {

    if(this.user_payemnt_data.lwp_id == null || this.user_payemnt_data.lwp_id == undefined)
    {
      var postdata ={ lwp_count:this.user_payemnt_data.lwp};
    }
    else
    {
      var postdata ={ lwp_count:this.user_payemnt_data.lwp,lwp_id:this.user_payemnt_data.lwp_id};
    }
    this.api.reprocessSalary(this.stateParams.id,this.user_payemnt_data.payment_id,postdata).subscribe(res => {
      this.data=res;
      this.showSuccess('Payment Reprocessed');
      this.refreshPayment();
      this.choices = [{ id: 'choice','component':'' }]; this.paymentArray=[]; this.lwparray=[];
      this.componentArray=[];this.payment_attributes=[];
      }, (err) =>
      {
        this.showError(err.error);
        this.choices = [{ id: 'choice','component':'' }]; this.paymentArray=[]; this.lwparray=[];
        this.componentArray=[];this.payment_attributes=[];
        });
  }

  addSalary(template: TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(template,this.config);
  }

  gotodeleteSalary(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,this.config);
  }


  decline()
  {
    this.modalRef.hide();
  }
  confirm()
  {

    this.api.deleteSalary(this.stateParams.id,this.user_salary_data.id).subscribe(res => {
      this.data=res;
      this.showSuccess('Salary Deleted');
      this.modalRef.hide();
      this.refreshSalary();
      this.showUserSalary=false;
      }, (err) =>
      {
        this.showError(err.error);
        });
  }
  breakupSalary(total)
  {
    if(total == undefined || total == '')
    {
      this.showCustomError('Please make sure you have entered the amount');
    }
    else
    {
      if(total<25000)
      {
        this.salaryBreakComponents.basic=parseInt(total*0.76);
        this.salaryBreakComponents.hra=parseInt(this.salaryBreakComponents.basic*0.10);
        this.salaryBreakComponents.travel_allowance=0;
      }
      else if(25000<=total && total<=35000)
      {
        this.salaryBreakComponents.basic=parseInt(total*0.61);
        this.salaryBreakComponents.hra=parseInt(this.salaryBreakComponents.basic*0.40);
        this.salaryBreakComponents.travel_allowance=800;
      }
      else
      {
        this.salaryBreakComponents.basic=parseInt(total*0.45);
        this.salaryBreakComponents.hra=parseInt(this.salaryBreakComponents.basic*0.40);
        this.salaryBreakComponents.travel_allowance=1600;
      }
      this.salaryBreakComponents.pt=200;
      this.salaryBreakComponents.pbi=0;
      this.salaryBreakComponents.special_allowance=parseInt(total-(this.salaryBreakComponents.basic+ this.salaryBreakComponents.hra+this.salaryBreakComponents.travel_allowance));
      if( this.salaryBreakComponents.special_allowance<0){this.salaryBreakComponents.special_allowance=0};
      this.isshowBreakUp=true;
    }

  }
  validateAddSalaryForm()
  {
    var array=[] var sum =0;
    array.push({title:'Basic',amount:this.salaryBreakComponents.basic});
    array.push({title:'HRA',amount:this.salaryBreakComponents.hra});
    array.push({title:'Travelling Allowance',amount:this.salaryBreakComponents.travel_allowance});
    array.push({title:'Additional Payout',amount: this.salaryBreakComponents.special_allowance});
    array.push({title:'Professional Tax',amount:  this.salaryBreakComponents.pt});
    array.push({title:'Performance Based Incentive',amount:  this.salaryBreakComponents.pbi});
    sum= (parseInt(this.salaryBreakComponents.basic)+parseInt(this.salaryBreakComponents.hra)+parseInt(this.salaryBreakComponents.travel_allowance)+parseInt(this.salaryBreakComponents.special_allowance)+parseInt(this.salaryBreakComponents.pbi)); //addition of all salary components//
    var postdata =
    {

      "salary":
      {
        "start_date": this.addSalaryData.start_date,
        "amount": this.addSalaryData.total_amount,
        "title": this.addSalaryData.title,
        "components_attributes":array
      }

    }
    if(sum == parseInt(this.addSalaryData.total_amount))
    {

      this.api.editSalary(this.stateParams.id,postdata).subscribe(res => {
        this.data=res;
        this.showSuccess('Salary Added');
        this.modalRef.hide();
        this.refreshSalary();
        this.addSalaryForm.reset();
        this.showUserSalary=true;
        this.salaryBreakComponents={};
        }, (err) =>
        {
          this.showError(err.error);
          this.modalRef.hide();
          this.addSalaryForm.reset();
          this.salaryBreakComponents={};
          });
    }
    else
    {
      this.showCustomError("All component amounts do not add upto total amount");
    }

  }
  undoPayment(template: TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(template,this.config);
  }
  confirmUndoPayment()
  {
    this.api.undoPayment(this.stateParams.id,this.user_payemnt_data.payment_id).subscribe(res => {
      this.data=res;
      this.showSuccess('Payment Undone');
      this.modalRef.hide();
      this.refreshPayment();
      this.showUserSalary=false;
      }, (err) =>
      {
        this.showError(err.error);
        });
  }


}
