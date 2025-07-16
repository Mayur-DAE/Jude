import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function closePopup(id: any): any;

@Component({
  selector: 'app-company-bank-details',
  templateUrl: './company-bank-details.component.html',
  styleUrls: ['./company-bank-details.component.css']
})
export class CompanyBankDetailsComponent implements OnInit {
  bankDetailsForm!: FormGroup;

  Bank: any;
  UPIID: any;
  BankName: any;
  BankBranchName: any;
  AccountHolderName: any;
  AccountNumber: any;
  IFSC: any;
  BankDetailsList: any;
  CompanyBankDetailsID:any;
  CompanyName:any;

  @Output() emitData = new EventEmitter<boolean>();
  constructor(private service: SharedService,
    private_http: HttpClient,
  private fb: FormBuilder) { }
  @Input()

  CompanyID: any;
 
  ngOnInit(): void {
    this.bankDetailsForm = this.fb.group({

      UPIID:['',Validators.required]
    });
    this.refreshBankDetailsList();
  
   
  }
  refreshBankDetailsList() {
    
    if (this.CompanyID != 0) {
      let val = { CompanyID: this.CompanyID }
      
      this.service.getBankDetails(val).subscribe(data => {
        if (data["status_code"] == 100) {
          this.BankDetailsList = JSON.parse(data["message"]);
          this.CompanyBankDetailsID = this.BankDetailsList[0].CompanyBankDetailsID
          this.UPIID = this.BankDetailsList[0].UPIID
          this.BankName = this.BankDetailsList[0].BankName
          this.BankBranchName = this.BankDetailsList[0].BankBranchName
          this.AccountHolderName = this.BankDetailsList[0].AccountHolderName
          this.AccountNumber = this.BankDetailsList[0].AccountNumber
          this.IFSC = this.BankDetailsList[0].IFSC
        }
        
      }) 
    }
  }
  addbankdeatils() { 
    if(!this.bankDetailsForm.valid){
      console.log("hiii");
      return;
    }
    else{
      
      
    var val = {
      CompanyID: this.CompanyID,
      UPIID: this.UPIID,
      BankName: this.BankName,
      BankBranchName: this.BankBranchName,
      AccountHolderName: this.AccountHolderName,
      AccountNumber: this.AccountNumber,
      IFSC: this.IFSC,
      CreatedBy: this.service.currentUserID
    };
    console.log("else",val);
    this.service.addBankDetails(val).subscribe(data => {

      if (data["status_code"] == 100) {
        closePopup('exampleModal');
        
        this.emitData.emit(false);
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
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
  updatebankdeatils() {
    var val = {
      CompanyBankDetailsID: this.CompanyBankDetailsID,
      CompanyID: this.CompanyID,
      UPIID: this.UPIID,
      BankName: this.BankName,
      BankBranchName: this.BankBranchName,
      AccountHolderName: this.AccountHolderName,
      AccountNumber: this.AccountNumber,
      IFSC: this.IFSC,
      IsDefault:1,
      ModifiedBy: this.service.currentUserID
    }
    this.service.updateBankDetails(val).subscribe(data => {

      if (data["status_code"] == 100) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
        closePopup('exampleModal');
        this.emitData.emit(false);
        this.CompanyBankDetailsID = 0;
        this.CompanyID = 0;
        this.UPIID = '';
        this.BankName = '';
        this.BankBranchName = 0;
        this.AccountHolderName = 0;
        this.AccountNumber = '';
        this.IFSC = '';
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
