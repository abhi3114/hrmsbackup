import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BoosterSessionService } from '../booster-session/booster-session.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NotificationService } from '../../shared/service/notification.service';
import { AgentHelpdeskservice } from '../agent-helpdesk/agent-helpdesk.service';
import * as moment from 'moment';
import { async } from '@angular/core/testing';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-agent-helpdesk',
  templateUrl: './agent-helpdesk.component.html',
  styleUrls: ['./agent-helpdesk.component.css']
})
export class AgentHelpdeskComponent implements OnInit {

  mySingleFileUploads: ElementRef;
  @ViewChild('responseTemplate') set mySingleFileUpload(content: ElementRef) {
    this.mySingleFileUploads = content;
  }
  toEditId;
  closedOn: String = '';
  user_data: any = []; booster_session_data: any;
  isDataPresent: boolean = false
  @ViewChild(DataTableDirective)
  isDtInitialized: boolean = false
  dtElement: DataTableDirective;
  openTickets: boolean = false;
  closedTickets: boolean = false;
  allTickets: boolean = false;
  boosterSessionTableOptions: DataTables.Settings = {};
  boosterSessionTableTrigger: Subject<any> = new Subject();
  responseData = { response: '', rating: '', comment: '', reason: '' };
  responseForm: FormGroup;
  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true
  };
  max: number = 5;
  isReadonly: boolean = false; status: any; booster_id: any; api_data: any; isLoading: boolean = false;
  constructor(private router: Router, private modalService: BsModalService, public toastr: NotificationService, private api: AgentHelpdeskservice) {
    this.getOpenTickets();
    this.boosterSessionTableOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[10, 20, 50, -1],
      [10, 20, 50, "All"]]
    };

    this.responseForm = new FormGroup({
      response: new FormControl('', [Validators.required]),
      rating: new FormControl('', []),
      comment: new FormControl('', []),
      reason: new FormControl('', [])
    });
    
  }

  recordResponse(template: TemplateRef<any>, id: any) {
    this.toEditId = id;
    this.modalRef = this.modalService.show(template, this.config);
  }

  closeModal() {
    this.modalRef.hide();
    this.responseForm.reset();
  }

  refreshOpenTicketData() {
    this.getOpenTickets();
  }

  ngOnInit() {
   
  }

  viewAttachment(url) {
  
    window.open(url, '_blank');
  }

  clickedTextBox() {
    setTimeout(() => {
      const el: HTMLElement = this.mySingleFileUploads.nativeElement as HTMLElement;
      el.click();
    }, 200);
  }

  getOpenTickets() {
   
    this.user_data = [];
    $('#DataTables').DataTable().destroy();
    this.api.getAllOpenAdminTickets().subscribe(res => {
      this.user_data = res;
      this.user_data.length > 0 ? this.isDataPresent = true : this.isDataPresent = false;
      this.openTickets = true;
      this.closedTickets = false;
      this.allTickets = false;
      this.boosterSessionTableTrigger.next();
    },
      (err) => {
        this.toastr.showError(err.error)
      });
  }

  getClosedTickets() {
   
    this.user_data = [];
    $('#DataTables').DataTable().destroy();
    this.api.getAllClosedAdminTickets().subscribe(res => {
      this.user_data = res;
      this.user_data.length > 0 ? this.isDataPresent = true : this.isDataPresent = false;
      this.closedTickets = true;
      this.openTickets = false;
      this.allTickets = false;
      this.boosterSessionTableTrigger.next();
    },
      (err) => {
        this.toastr.showError(err.error)
      });
  }

  closeTicket(id: any) {
    this.isLoading = true;
    this.api.closeTicket(id).subscribe(
      (res: any) => {
        if (res.status) {
          this.isLoading = false;
          this.closeModal();
          this.getOpenTickets();
          this.toastr.showSuccess('Ticket Closed Successfully');
        }
      },
      (err) => {
        this.toastr.showError(err.error)
      });
  }

  getAllTickets() {
    
    this.user_data = [];
    $('#DataTables').DataTable().destroy();
    this.api.getAllAdminTickets().subscribe(res => {
      this.user_data = res;
      this.user_data.length > 0 ? this.isDataPresent = true : this.isDataPresent = false;
      this.allTickets = true;
      this.openTickets = false;
      this.closedTickets = false;
      this.boosterSessionTableTrigger.next();
    },
      (err) => {
        this.toastr.showError(err.error)
      });
  }

  refreshData() {
    this.getOpenTickets();
    this.rerender();
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.boosterSessionTableTrigger.next();
    });
  }

}
