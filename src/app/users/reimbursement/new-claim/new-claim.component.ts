import { Component, OnInit,Input,ViewChild,ElementRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Reimbursementservice } from '../reimbursement.service';
@Component({
  selector: 'app-new-claim',
  templateUrl: './new-claim.component.html',
  styleUrls: ['./new-claim.component.css']
})
export class NewClaimComponent implements OnInit {
  @ViewChild('selectref') selectedref: ElementRef;
    @ViewChild('selectfor1') selectfor2: ElementRef;

   @Input() template: any;
   selectref:string;
   precautionContent:boolean = true;
   forhs:boolean = false;
   clienths:boolean=false;
   hotelhs:boolean=false;
   fromhs:boolean=false;
   tohs:boolean=false;
   vehiclehs:boolean=false;
   kilometerhs:boolean=false;
   datehs:boolean=false;
   amounths:boolean=false;
   commenths:boolean=false;
   purposehs:boolean=false;


  reimbursementform:FormGroup;

  constructor(private rmService:Reimbursementservice) { }

  ngOnInit() 
  {
  
    this.reimbursementform = new FormGroup({
        'userdata': new FormGroup({
        'month': new FormControl(null, [Validators.required]),
        'year': new FormControl(null, [Validators.required]),
        'category': new FormControl(null, [Validators.required]),
        'for1': new FormControl(null, [Validators.required]),
        'clientname': new FormControl(null, [Validators.required]),
        'hotelname': new FormControl(null, [Validators.required]),
        'from': new FormControl(null, [Validators.required]),
        'to': new FormControl(null, [Validators.required]),
        'vehicletype': new FormControl(null, [Validators.required]),
        'kilometer': new FormControl(null, [Validators.required]),
        'date': new FormControl(null, [Validators.required]),
        'amount': new FormControl(null, [Validators.required]),
        'comment': new FormControl(null, [Validators.required]),
        'purpose': new FormControl(null, [Validators.required]),
      })
      });
  }

  closeModal() 
  {
    this.template.hide();    
  }
       onChangefor()
        {
          const selectedfor3 = this.selectfor2.nativeElement.value;
          console.log(selectedfor3);
          if(selectedfor3==="Client")
           {
            this.clienths=true;
            console.log(selectedfor3);
            }
         else
          {
            this.clienths=false;
          }   
       }
    

  enableFormAccordingToCategory()
  {
    this.precautionContent = false; 
   
    const selectedValue = this.selectedref.nativeElement.value;
   
    if(selectedValue==="Ola/Uber")
    {
     this.forhs=true;
     this.datehs=true;
     this.amounths=true;
     this.purposehs=true;
     this.hotelhs=false;
     this.fromhs=false;
     this.tohs=false;
     this.vehiclehs=false;
     this.kilometerhs=false;
     this.commenths=false;
     this.clienths=false;    
                     
    }
     
    if(selectedValue==="Local Travel")
    {
     this.datehs=true;
     this.amounths=true;
     this.purposehs=true;
     this.forhs=false;
     this.hotelhs=false;
     this.fromhs=false;
     this.tohs=false;
     this.vehiclehs=false;
     this.kilometerhs=false;
     this.commenths=false;
     this.clienths=false;
    }
    if(selectedValue==="Mobile Bill")
    {
     this.fromhs=true;
     this.tohs=true;
     this.amounths=true;
     this.commenths=true;
     this.forhs=false;    
     this.hotelhs=false;    
     this.vehiclehs=false;
     this.kilometerhs=false;
     this.datehs=false;     
     this.purposehs=false;
     this.clienths=false;    
    }
    if(selectedValue==="Hotel Stay")
    {
     this.hotelhs=true;
     this.fromhs=true;
     this.tohs=true;
     this.amounths=true;
     this.purposehs=true;
     this.commenths=false;
     this.forhs=false;
     this.vehiclehs=false;
     this.kilometerhs=false;
     this.datehs=false;
     this.clienths=false;
    }
    if(selectedValue==="Food")
    {
     this.datehs=true;
     this.amounths=true;
     this.commenths=true;
     this.purposehs=false;
     this.forhs=false;
     this.hotelhs=false;
     this.fromhs=false;
     this.tohs=false;
     this.vehiclehs=false;
     this.kilometerhs=false;
     this.clienths=false; 
    }
    if(selectedValue==="Electricity")
    {
     this.fromhs=true;
     this.tohs=true;
     this.amounths=true;
     this.commenths=true;
     this.purposehs=false;          
     this.forhs=false;                     
     this.vehiclehs=false;
     this.kilometerhs=false;
     this.datehs=false;
     this.hotelhs=false;
     this.clienths=false;
    }
    if(selectedValue==="Petrol/CNG")
    {
     this.vehiclehs=true;
     this.kilometerhs=true;
     this.datehs=true;
     this.purposehs=true;
     this.amounths=true;
     this.fromhs=false;
     this.tohs=false;     
     this.commenths=false;               
     this.forhs=false;                        
     this.hotelhs=false;
     this.clienths=false;
    }
    if(selectedValue==="Flight Tickets")
    {
     this.datehs=true;
     this.amounths=true;
     this.purposehs=true;
     this.commenths=false;     
     this.forhs=false;     
     this.hotelhs=false;      
     this.fromhs=false;
     this.tohs=false;
     this.vehiclehs=false;
     this.kilometerhs=false;
     this.clienths=false;
    }
    if(selectedValue==="Miscellaneous")
    {
     this.datehs=true;
     this.amounths=true;
     this.purposehs=true;
     this.commenths=false;     
     this.forhs=false;     
     this.hotelhs=false;      
     this.fromhs=false;
     this.tohs=false;
     this.vehiclehs=false;
     this.kilometerhs=false;
     this.clienths=false;
    }

  }

  onSubmit()
  {
    /*console.log(this.reimbursementform.value.userdata.month);
    console.log(this.reimbursementform.value.userdata.year);
    console.log(this.reimbursementform.value.userdata.category);
    console.log(this.reimbursementform.value.userdata.for1);
    console.log(this.reimbursementform.value.userdata.clientname);
    console.log(this.reimbursementform.value.userdata.hotelname);
    console.log(this.reimbursementform.value.userdata.from);
    console.log(this.reimbursementform.value.userdata.to);
    console.log(this.reimbursementform.value.userdata.vehicletype);
    console.log(this.reimbursementform.value.userdata.kilometer);
    console.log(this.reimbursementform.value.userdata.date);
    console.log(this.reimbursementform.value.userdata.amount);
    console.log(this.reimbursementform.value.userdata.comment);
    console.log(this.reimbursementform.value.userdata.purpose);*/
    this.rmService.recordReimbursemnetResponse();
    this.reimbursementform.reset();    
  }


}
