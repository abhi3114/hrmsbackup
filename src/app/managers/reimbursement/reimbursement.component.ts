import { Component, OnInit } from '@angular/core';
import {ReimbursementManagerService} from './reimbursement-manager.service';
import {Observable,Subject} from 'rxjs';
import { NotificationService } from '../../shared/service/notification.service';


@Component({
  selector: 'app-reimbursement',
  templateUrl: './reimbursement.component.html',
  styleUrls: ['./reimbursement.component.css']
})
export class ReimbursementComponent implements OnInit
{
  leaves_data:any;
  leavesData:any;
  openTickets: boolean = false;
  closedTickets: boolean = false;
  allTickets: boolean = false;
  leaveTableTrigger: Subject<any> = new Subject();
  constructor(private api : ReimbursementManagerService,public toastr: NotificationService)
  {
  this.getOpenTickets();
  }

  ngOnInit() {
  }

   getOpenTickets()
   {
    this.openTickets = true;
    this.closedTickets = false;
    this.allTickets = false;
    this.api.getApproved().subscribe(res => {
      this.leaves_data=res;
      console.log(this.leaves_data);
      //this.leavesData=this.leaves_data.leaves_data;
      //this.leaveTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
        });
   }
   getClosedTickets()
   {
    this.closedTickets = true;
    this.openTickets = false;
    this.allTickets = false;
    this.api.getUnapproved().subscribe(res => {
      this.leaves_data=res;
      console.log(this.leaves_data);
      //this.leavesData=this.leaves_data.leaves_data;
      //this.leaveTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
        });

   }
   getAllTickets()
   {
    this.allTickets = true;
    this.openTickets = false;
    this.closedTickets = false;
    this.api.getRejected().subscribe(res => {
      this.leaves_data=res;
      console.log(this.leaves_data);
      //this.leavesData=this.leaves_data.leaves_data;
      //this.leaveTableTrigger.next();
      }, (err) => {
        this.toastr.showError(err.error);
        });
   }
  getData()
   {

   }

}
