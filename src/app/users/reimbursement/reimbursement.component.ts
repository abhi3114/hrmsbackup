import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';


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

  constructor(private modalService: BsModalService) 
  {}

  ngOnInit() 
  {}

  recordResponse(template: TemplateRef<any>,canReopen :any)
  {    
    //this.canReopenButtonEnabled = canReopen;
    this.modalRef = this.modalService.show(template, this.config);
  }

  refreshOpenTicketData()
  {
    //this.getOpenTickets();
  }


}
