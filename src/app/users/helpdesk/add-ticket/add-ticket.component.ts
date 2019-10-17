import { Component, OnInit,TemplateRef,Input ,ViewChild,ElementRef ,EventEmitter,Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Helpdeskservice } from '../helpdesk.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
//import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { Router, ActivatedRoute } from '@angular/router';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {
  //modalRef: any;
  @ViewChild('mySingleFileUpload') mySingleFileUpload: ElementRef;
  @Output() closeModalAndRefresh = new EventEmitter<boolean>();
  responseData={ response:'',comment:'',file:''};
  responseForm: FormGroup;
  isLoading: boolean = false
  categories= [];
  mySelectedFiles = [];
  base64:any;
  config = {
    animated:true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true
  };
  @Input() template:any;
  errorInvalidFile: boolean = false;
  errorLargeFile: boolean = false;
 
  constructor(private api : Helpdeskservice,public toastr: NotificationService,private router : Router ,private route: ActivatedRoute) { 
    //console.log('the Modal template',this.template)
    
    //instantiate the form
    this.responseForm = new FormGroup({
      response: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
      file:new FormControl('',[])
      });
  }

  async ngOnInit() {
    await this.getCategories();
  }

  closeModal()
    {
      this.template.hide();
      this.responseForm.reset();
    }

  
  clickedTextBox() {
      //console.log('clicked',this.mySingleFileUpload.nativeElement)
    setTimeout(() => {
      const el: HTMLElement = this.mySingleFileUpload.nativeElement as HTMLElement;
        //console.log('HTML element',el)
      el.click();
    }, 200);
  }

  getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
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

  handleFileInput(file) {
    if (file.length > 0) {
      const extension = this.getFileExtension(file[0].name);
      const size: number = (file[0].size / (1024 * 1024));
      if (extension === 'jpg' || extension === 'png' || extension === 'jpeg' || extension === 'xlsx' || extension === 'pdf' || extension === 'xls' || extension === 'JPG' && size < 5.00) {
        this.mySelectedFiles.push(file[0])
        this.errorInvalidFile = false;
        this.errorLargeFile = false;
        this.responseData.file = this.mySelectedFiles[0];
        console.log('File',this.responseData.file)
        this.readThis(this.mySelectedFiles[0]);
      }
      else if(size > 5.00) {
        this.errorInvalidFile = false;
        this.errorLargeFile = true;
      } 
      else {
        this.errorInvalidFile = true;
        this.errorLargeFile = false;
      }
    }
  }

  removeFile(selectedFileForRemoval) {
    var index = this.mySelectedFiles.indexOf(selectedFileForRemoval);
    if (index > -1) {
      this.mySelectedFiles.splice(index, 1);
    }
  }

  getBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=> {
      this.base64 = reader.result
    };
    reader.onerror = function (error) {
    };
  }

  async readThis(inputValue: any) {
    var myReader:FileReader = new FileReader();
    myReader.readAsDataURL(inputValue);
    myReader.onloadend = (e) => {
     this.base64 = myReader.result;
    }
  }

  async callsaveApi()
  { 
    this.isLoading=true;
    var payload = 
    {
      "ticket" : {
      "ticket_type" :this.responseData.response,
      "problem" : this.responseData.comment,
      "name_file_attached": this.mySelectedFiles[0] ? this.mySelectedFiles[0].name : null,
      "attachment_base64":  this.base64
      }
    }
    console.log('My Final Payload',payload)
    this.api.addNewTicket(payload).subscribe((res:any) => {
      this.isLoading=false;
      if(res.status){
        this.closeModal();
        this.closeModalAndRefresh.emit(true);
        this.toastr.showSuccess('Ticket Created Successfully');
      }
    }, 
    (err) => {
      this.toastr.showError(err.error)
    });
  }

}
