import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import {Reimbursementservice} from './reimbursement.service';


@Component({
  selector: 'app-reimbursement',
  templateUrl: './reimbursement.component.html',
  styleUrls: ['./reimbursement.component.css']
})
export class ReimbursementComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(private modalService: BsModalService,private remService:Reimbursementservice)
  {}

  ngOnInit() 
  {}

  recordResponse(template: TemplateRef<any>,canReopen :any)
  {    
    
    this.modalRef = this.modalService.show(template, this.config);
  }

  refreshOpenTicketData()
  {
    
  }


}
