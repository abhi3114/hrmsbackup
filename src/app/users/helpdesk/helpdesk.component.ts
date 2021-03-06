import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BoosterSessionService } from '../booster-session/booster-session.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NotificationService } from '../../shared/service/notification.service';
import { Helpdeskservice } from './helpdesk.service';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.component.html',
  styleUrls: ['./helpdesk.component.css']
})
export class HelpdeskComponent implements OnInit {
  //@ViewChild('mySingleFileUpload') mySingleFileUpload: ElementRef;

  mySingleFileUploads: ElementRef;
  toEditId: any;
  toDeleteId: any;
  canReopenButtonEnabled: BsModalRef;
  @ViewChild('responseTemplate') set mySingleFileUpload(content: ElementRef) {
    this.mySingleFileUploads = content;
  }
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
  max: number = 10;
  isReadonly: boolean = false; status: any; booster_id: any; api_data: any; isLoading: boolean = false;
  constructor(private router: Router, private modalService: BsModalService, public toastr: NotificationService, private api: Helpdeskservice) {
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
    this.responseData.response = "yes";
  }

  recordResponse(template: TemplateRef<any>, id: any,canReopen :any) {
    console.log('is the ID here', id);
    this.toEditId = id;
    this.canReopenButtonEnabled = canReopen;
    this.modalRef = this.modalService.show(template, this.config);
  }


  recordResponseDelete(template: TemplateRef<any>, id: any) {
    console.log('is the ID here', id);
    this.toDeleteId = id;
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
    console.log(this.mySingleFileUpload)
  }

  clickedTextBox() {
    console.log('clicked', this.mySingleFileUploads.nativeElement)
    setTimeout(() => {
      const el: HTMLElement = this.mySingleFileUploads.nativeElement as HTMLElement;
      el.click();
    }, 200);
  }

  getOpenTickets() {
    console.log('Open');
    this.user_data = [];
    $('#DataTables').DataTable().destroy();
    this.api.getAllOpenTickets().subscribe(res => {
      console.log('Open', res);
      this.user_data = res;
      console.log('This is length', this.user_data.length)
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
    console.log('Closed');
    this.user_data = [];
    $('#DataTables').DataTable().destroy();
    this.api.getAllClosedTickets().subscribe(res => {
      console.log('closed', res)
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

  getAllTickets() {
    console.log('All');
    this.user_data = [];
    $('#DataTables').DataTable().destroy();
    this.api.getAllTickets().subscribe(res => {
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

  viewAttachment(url) {
    console.log('this is url', url)
    window.open(url, '_blank');
  }

  //Ticket Deleted
  deleteTicket(id) {
    this.api.deleteTicket(id).subscribe((res: any) => {
      if (res.status) {
        this.closeModal();
        this.getOpenTickets();
        this.toastr.showSuccess('Ticket Deleted');

      }
    },
      (err) => {
        this.toastr.showError(err.error)
      });
  }

  reopenTicket(id: any) {
    this.isLoading = true;
    this.api.reopenTicket(id).subscribe(
      (res: any) => {
        if (res.status) {
          this.isLoading = false;
          this.closeModal();
          this.getOpenTickets();
          this.toastr.showSuccess('Ticket reopend Successfully');
        }
      },
      (err) => {
        this.isLoading = false;
        this.toastr.showError(err.error)
      });
  }

  //Ticket Escalated
  escalateTicket(id) {
    this.api.escalateTicket(id).subscribe((res: any) => {
      if (res.status) {
        this.closeModal();
        this.getOpenTickets();
        this.toastr.showSuccess('Ticket Escalated');
      }
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




