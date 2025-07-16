import { Component,Input ,OnInit,Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';

declare function showSuccessToast(msg:any): any;
declare function showDangerToast(msg:any): any;
declare function closePopup(id:any):any;

@Component({
  selector: 'app-add-edit-faq',
  templateUrl: './add-edit-faq.component.html',
  styleUrls: ['./add-edit-faq.component.css']
})
export class AddEditFaqComponent implements OnInit {
  @Output() emitData = new EventEmitter<boolean> ();
  errormsg= false; 
  TitleName_errormsg="";
  Answer_errormsg=""
  constructor(private service:SharedService,private_http:HttpClient) { }

    @Input() 
    faq:any;
    FAQID:any;
    FAQTitle:any;
    FAQAnswer:any;
    IsApproved:any;
    ModifiedBy:any;
    IsPublished:any;
    currentUser: any;
  currentUserID: any;

  ngOnInit(): void {
    this.onUserRoles();
    this.FAQID = this.faq.FAQID;
    this.FAQTitle = this.faq.FAQTitle;
    this.FAQAnswer = this.faq.FAQAnswer;
    if(this.faq.IsApproved ==null){
      this.IsApproved= 0
    }else{
      this.IsApproved= this.faq.IsApproved
    }
    if(this.faq.IsPublished ==null){
      this.IsPublished= 0
    }else{
      this.IsPublished= this.faq.IsPublished
    }
    
  }

  onUserRoles() {
    this.currentUser = localStorage.getItem('BoUser');
    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      this.currentUserID = this.currentUser.currentUserID;


    }
  }
  addfaq() {
    this.TitleName_errormsg = "";
    if (this.FAQTitle.trim().length === 0) {
      this.TitleName_errormsg = "Please enter FAQ question";
      this.errormsg=true;
    }
    this.Answer_errormsg = "";
    if (this.FAQAnswer.trim().length === 0) {
      this.Answer_errormsg = "Please enter FAQ answer";
      this.errormsg=true;
    }
    else {
      this.errormsg=false;
    var val = {
      FAQID: this.FAQID,
      FAQTitle: this.FAQTitle,
      FAQAnswer: this.FAQAnswer,
      IsApproved: this.IsApproved,
      IsPublished: this.IsPublished,
      CreatedBy:this.currentUserID
     
    };

    this.service.addfaq(val).subscribe(data => {
      if (data["status_code"] == 100) {
        closePopup('exampleModal');
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
        //sending false value to ShowCompont to destroy this component 
        this.emitData.emit(false);
      }
      else if (data["status_code"] == 300) {
        showDangerToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showDangerToast("Some error occured, data not saved");
      }
    });
  }
}

  
  updatefaq(){
    var val = {
      FAQID:this.FAQID,
      FAQTitle:this.FAQTitle,
      FAQAnswer:this.FAQAnswer,
      IsApproved:this.IsApproved,
      IsPublished:this.IsPublished,
      ModifiedBy:this.currentUserID
    };
    this.service.updatefaq(val).subscribe(data=>{
      if (data["status_code"] == 100) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);

        //Closing module popup using js function
        closePopup('exampleModal');

        //sending false value to ShowCompont to destroy this component 
        this.emitData.emit(false);
        // showSuccessToast('Update Successfully');
        this.FAQTitle ='' ;
        this.FAQAnswer = '';
        this.IsApproved = false;
        this.IsPublished = false;
        this.ModifiedBy = 0;

      }
      else if (data["status_code"] == 300) {
        showDangerToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showDangerToast("Some error occured, data not saved");
      }
    });
  }

}
