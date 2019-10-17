import { Component, OnInit,ElementRef,EventEmitter,ViewChild ,Output,Input} from '@angular/core';
import { AgentHelpdeskservice } from '../../agent-helpdesk/agent-helpdesk.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NotificationService } from 'src/app/shared/service/notification.service';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { MonthYearService } from 'src/app/shared/service/month-year.service';
import { AllLeavesService } from '../../all-leaves/all-leaves.service';
import { Helpdeskservice } from '../helpdesk.service';

@Component({
  selector: 'app-view-tickets',
  templateUrl: './view-tickets.component.html',
  styleUrls: ['./view-tickets.component.css']
})
export class ViewTicketsComponent implements OnInit {

  @ViewChild('mySingleFileUpload') mySingleFileUpload: ElementRef;
  @Output() closeModalAndRefresh = new EventEmitter<boolean>();
  responseData={ response:'',comment:'',file:'',start_date:""};
  responseForm: FormGroup;
  isLoading: boolean = false;
  categories= [];
  mySelectedFiles = [];
  base64:any;
  config = {
    animated:true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true
  };
  ticket= {
    id:'',
    category:'',
    comments:'',
    attachments:'',
    date:'',
    resolution:''
  }
  @Input() template:any;
  @Input() Id:any;
  errorInvalidFile: boolean = false;
  errorLargeFile: boolean = false;
  
  constructor(private apis:AllLeavesService,private monthandyear:MonthYearService,private api : Helpdeskservice,public toastr: NotificationService,private router : Router ,private route: ActivatedRoute) { 
    //console.log('the Modal template',this.template)
    
    
  
  
    //instantiate the form
    this.responseForm = new FormGroup({
      response: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
      start_date: new FormControl('', [Validators.required]),
      });
  }
  
  async ngOnInit() {
   
    await this.getCategories();
    await this.getTicketInfo();
  }
  
  closeModal()
    {
      this.template.hide();
      this.responseForm.reset();
    }
  
  
    viewAttachment(url){
      console.log('this is url',url)
      window.open(url, '_blank');
    }
  
  
   async getTicketInfo(){
        this.api.getTicketInfo(this.Id).subscribe(
          (res:any)=>{
            console.log('response-->',res);
            this.ticket.id = res.ticket.uuid;
            this.ticket.comments = res.ticket.description;
            this.ticket.category = res.ticket.ticket_type;
            this.ticket.attachments = res.ticket.attachment;
            this.ticket.date = res.ticket.ncd;
            this.ticket.resolution = res.ticket.comment;
            this.responseData.response = res.ticket.status;
            console.log('Ticket Modal',this.ticket)
            var data = res.ticket.ncd.split("-");
            console.log('My Data is',data)
            var date = new Date(Number(data[2]),Number(data[1])-1,Number(data[0]))
            console.log('Please be the date',date);
            var filterData=[];
            filterData.push({firstDay:date});
            this.responseData.start_date = filterData[0].firstDay;
           
          },
          (err)=>
          {
            this.toastr.showError(err.error);
          }
          
          )
    }
  
  
  async getCategories(){
    this.api.getCategory().subscribe(
      (res:any)=>{
        if(res) {
         this.categories = res.categories
        }
      },
      (err)=>{
       this.toastr.showError(err.error);
      }
  
     )
  }
  
  
 
  
  
}
