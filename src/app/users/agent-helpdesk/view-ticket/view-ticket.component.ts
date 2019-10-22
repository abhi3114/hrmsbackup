import { Component, OnInit, ElementRef, EventEmitter, ViewChild, Output, Input } from '@angular/core';
import { AgentHelpdeskservice } from '../agent-helpdesk.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NotificationService } from 'src/app/shared/service/notification.service';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { MonthYearService } from 'src/app/shared/service/month-year.service';
import { AllLeavesService } from '../../all-leaves/all-leaves.service';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {

  @ViewChild('mySingleFileUpload') mySingleFileUpload: ElementRef;
  @Output() closeModalAndRefresh = new EventEmitter<boolean>();
  responseData = { response: '', comment: '', file: '', start_date: "" };
  responseForm: FormGroup;
  isLoading: boolean = false;
  categories = [];
  mySelectedFiles = [];
  base64: any;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true
  };
  ticket = {
    id: '',
    category: '',
    comments: '',
    attachments: '',
    date: '',
    resolution: ''
  }
  @Input() template: any;
  @Input() Id: any;
  errorInvalidFile: boolean = false;
  errorLargeFile: boolean = false;

  constructor(private apis: AllLeavesService,  private api: AgentHelpdeskservice, public toastr: NotificationService, private router: Router, private route: ActivatedRoute) {
    this.responseForm = new FormGroup({
      response: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
      start_date: new FormControl('', [Validators.required]),
    });
  }

  async ngOnInit() {
   await this.getTicketInfo();
  }

  closeModal() {
    this.template.hide();
    this.responseForm.reset();
  }

  viewAttachment(url) {
   window.open(url, '_blank');
  }
  
  async getTicketInfo() {
    this.api.getTicketInfo(this.Id).subscribe(
      (res: any) => {
        this.ticket.id = res.ticket.uuid;
        this.ticket.comments = res.ticket.description;
        this.ticket.category = res.ticket.ticket_type;
        this.ticket.attachments = res.ticket.attachment;
        this.ticket.date = res.ticket.ncd;
        this.ticket.resolution = res.ticket.comment;
        this.responseData.response = res.ticket.status;
        var data = res.ticket.ncd.split("-");
        var date = new Date(Number(data[2]), Number(data[1]) - 1, Number(data[0]))
        var filterData = [];
        filterData.push({ firstDay: date });
        this.responseData.start_date = filterData[0].firstDay;
      },
      (err) => {
        this.toastr.showError(err.error);
      }

    )
  }

  async callsaveApi() {
    this.isLoading = true;
    var payload =
    {
      "ticket": {
        "status": this.responseData.response,
        "ncd": moment(this.responseData.start_date).format('DD-MM-YYYY'),
        "comments": this.responseData.comment
      }
    }
    this.api.updateTicket(payload, this.Id).subscribe((res: any) => {
      this.isLoading = false;
      if (res.status) {
        this.closeModal();
        this.closeModalAndRefresh.emit(true);
        this.toastr.showSuccess('Ticket Updated Successfully');
      }
    },
      (err) => {
        this.toastr.showError(err.error)
      });
  }


}
