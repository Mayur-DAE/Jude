import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function closePopup(id: any): any;

@Component({
  selector: 'app-add-edit-membership',
  templateUrl: './add-edit-membership.component.html',
  styleUrls: ['./add-edit-membership.component.css']
})
export class AddEditMembershipComponent implements OnInit {
  MemberShipName_errormsg = "";
  MemberShipFees_errormsg = "";
  TaxSlab_errormsg = "";
  errormsg = false;
  feeserror:boolean = false;
  nameerror:boolean = false;
  taxerror:boolean = false;
  @Output() emitData = new EventEmitter<boolean>();

  constructor(private service: SharedService, private_http: HttpClient) { }
  @Input() membership: any;

  CompanyMemberShipTypeID: any;
  CompanyMemberShipName: any;
  CompanyMembershipFees: any;
  TaxSlabID: any;
  TaxSlabName: any;
  TaxSlabsList: any = [];
  IsActive: any;
  ModifiedBy: any;
  currentUser: any;
  currentUserID: any;

  ngOnInit(): void {
    this.onUserRoles();
    this.CompanyMemberShipTypeID = this.membership.CompanyMemberShipTypeID;
    this.CompanyMemberShipName = this.membership.CompanyMemberShipName;
    this.CompanyMembershipFees = this.membership.CompanyMembershipFees;
    this.TaxSlabID = this.membership.TaxSlabID;
    this.IsActive = this.membership.IsActive;
    this.loadTaxSlabsList();
    if (this.CompanyMembershipFees) {
      this.CompanyMembershipFees = (+this.CompanyMembershipFees).toFixed(2);
    }
  }

  formatFees() {
    if (
      this.CompanyMembershipFees &&
      /^\d+(\.\d+)?$/.test(this.CompanyMembershipFees)
    ) {
      this.CompanyMembershipFees = (+this.CompanyMembershipFees).toFixed(2);
    } else if (this.CompanyMembershipFees && this.CompanyMembershipFees.trim() !== '') {
      // If it's invalid, keep it as it is without converting to NaN
      this.CompanyMembershipFees = this.CompanyMembershipFees.trim();
    } else {
      this.CompanyMembershipFees = '';
    }
  }
  
  allowOnlyNumbers(event: KeyboardEvent) {
    const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','.'];
    const inputChar = event.key;
  
    if (!allowedKeys.includes(inputChar)) {
      event.preventDefault();
    }
  
    // Prevent more than one decimal point
    if (inputChar === '.' && this.CompanyMembershipFees?.includes('.')) {
      event.preventDefault();
    }
  }
  
  openModal(membershipFee: any) {
    this.CompanyMembershipFees = membershipFee ? (+membershipFee).toFixed(2) : '';
  }
  onUserRoles() {
    this.currentUser = localStorage.getItem('BoUser');
    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      this.currentUserID = this.currentUser.currentUserID;


    }
  }
  loadTaxSlabsList() {
    let val = {IsActive: 1}
    this.service.GetTaxSlabs(val).subscribe(data => {
      if (data["status_code"] == 100) {
        this.TaxSlabsList = JSON.parse(data["message"]);
        console.log(this.TaxSlabsList);
        this.TaxSlabName = this.membership.TaxSlabID;
      }
    });
  }
  // addCompanyMemberShip() {
  //   this.MemberShipName_errormsg = "";
  //   if (this.CompanyMemberShipName.trim().length === 0) {
  //     this.MemberShipName_errormsg = "Please enter membership name";
  //     this.nameerror = true;
  //     return;
  //   }

  //   this.MemberShipFees_errormsg = "";
  //   if (this.CompanyMembershipFees.trim().length === 0) {
  //     this.MemberShipFees_errormsg = "Please enter fees";
  //     this.feeserror= true;
  //     return;
  //   } 
  //   else if (!/^\d+(\.\d+)?$/.test(this.CompanyMembershipFees) || parseFloat(this.CompanyMembershipFees) <= 0) {
  //     this.MemberShipFees_errormsg = "Please enter valid amount";
  //     this.feeserror= true;
  //     return;
  //   }

  //   this.TaxSlab_errormsg = "";
  //   if (this.TaxSlabID.trim().length === 0) {
  //     this.TaxSlab_errormsg = "Please enter Tax";
  //     this.taxerror = true;
  //   }
  //   else {
  //     // this.errormsg = false;
  //     // this.feeserror = false;
  //     // this.nameerror = false;
  //     // this.taxerror = false;
  //     var val = {
  //       CompanyMemberShipTypeID: this.CompanyMemberShipTypeID,
  //       CompanyMemberShipName: this.CompanyMemberShipName,
  //       CompanyMembershipFees: this.CompanyMembershipFees,
  //       TaxSlabID: this.TaxSlabID,
  //       IsActive: this.IsActive,
  //       CreatedBy: this.currentUserID
  //       // CreatedBy:11,
  //       // ModifiedBy:1
  //     };
  //     this.service.AddCompanyMemberShipTypes(val).subscribe(data => {

  //       if (data["status_code"] == 100) {
  //         //Closing module popup using js function
  //         closePopup('showMembership-Module');
  //         //sending false value to ShowCompont to destroy this component 
  //         this.emitData.emit(false);
  //         showSuccessToast(JSON.parse(data["message"])[0]["message"]);
  //       }
  //       else if (data["status_code"] == 300) {
  //         showDangerToast(JSON.parse(data["message"])[0]["message"]);
  //       }
  //       else {
  //         showDangerToast("Some error occured, data not saved");
  //       }
  //     });
  //   }
  // }
  onNameChange(val: string) {
    if (val && val.trim().length > 0) {
      this.nameerror = false;
      this.MemberShipName_errormsg = '';
    }
  }
  
  onFeesChange(val: string) {
    if (val && /^\d+(\.\d+)?$/.test(val) && parseFloat(val) > 0) {
      this.feeserror = false;
      this.MemberShipFees_errormsg = '';
    }
  }
  
  onTaxChange(val: any) {
    if (val && val !== '') {
      this.taxerror = false;
      this.TaxSlab_errormsg = '';
    }
  }
  

  validateFields(): boolean {
    this.MemberShipName_errormsg = "";
    this.MemberShipFees_errormsg = "";
    this.TaxSlab_errormsg = "";
    this.nameerror = false;
    this.feeserror = false;
    this.taxerror = false;
  
    let isValid = true;
  
    if (!this.CompanyMemberShipName || this.CompanyMemberShipName.trim().length === 0) {
      this.MemberShipName_errormsg = "Please enter membership name";
      this.nameerror = true;
      isValid = false;
    }
  
    const fees = this.CompanyMembershipFees?.toString().trim() || '';
    if (fees.length === 0) {
      this.MemberShipFees_errormsg = "Please enter fees";
      this.feeserror = true;
      isValid = false;
    } else if (!/^\d+(\.\d{1,2})?$/.test(fees) || parseFloat(fees) <= 0) {
      this.MemberShipFees_errormsg = "Please enter valid amount";
      this.feeserror = true;
      isValid = false;
    }
  
    if (!this.TaxSlabID || this.TaxSlabID.toString().trim() === '' || this.TaxSlabID === '--Select--') {
      this.TaxSlab_errormsg = "Please select a valid VAT";
      this.taxerror = true;
      isValid = false;
    }
  
    return isValid;
  }
  

  addCompanyMemberShip() {
    if (!this.validateFields()) return;
  
    const val = {
      CompanyMemberShipTypeID: this.CompanyMemberShipTypeID,
      CompanyMemberShipName: this.CompanyMemberShipName.trim(),
      CompanyMembershipFees: this.CompanyMembershipFees,
      TaxSlabID: this.TaxSlabID,
      IsActive: this.IsActive,
      CreatedBy: this.currentUserID
    };
  
    this.service.AddCompanyMemberShipTypes(val).subscribe(data => {
      if (data["status_code"] == 100) {
        closePopup('showMembership-Module');
        this.emitData.emit(false);
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      } else if (data["status_code"] == 300) {
        showDangerToast(JSON.parse(data["message"])[0]["message"]);
      } else {
        showDangerToast("Some error occurred, data not saved");
      }
    });
  }
  

  // updateCompanyMemberShip() {
  //   this.MemberShipFees_errormsg = "";
  //   if (this.CompanyMembershipFees.trim().length === 0) {
  //     this.MemberShipFees_errormsg = "Please enter fees";
  //     this.feeserror = true;
  //     return;
  //   } 

  //   if (!/^\d+(\.\d+)?$/.test(this.CompanyMembershipFees) || parseFloat(this.CompanyMembershipFees) <= 0) {
  //     this.MemberShipFees_errormsg = "Please enter valid amount";
  //     this.feeserror= true;
  //     return;
  //   }

  //   this.MemberShipFees_errormsg ="";
  //   this.feeserror = false;

  //   var val = {
  //     CompanyMemberShipTypeID: this.CompanyMemberShipTypeID,
  //     CompanyMemberShipName: this.CompanyMemberShipName,
  //     CompanyMembershipFees: this.CompanyMembershipFees,
  //     TaxSlabID: this.TaxSlabID,
  //     IsActive: this.IsActive,
  //     ModifiedBy: this.currentUserID
  //   };
  //   this.service.UpdateCompanyMemberShip(val).subscribe(data => {
  //     if (data["status_code"] == 100) {
  //       showSuccessToast(JSON.parse(data["message"])[0]["message"]);

  //       //Closing module popup using js function
  //       closePopup('showMembership-Module');

  //       //sending false value to ShowCompont to destroy this component 
  //       this.emitData.emit(false);

  //       this.CompanyMemberShipTypeID = 0;
  //       this.CompanyMemberShipName = '';
  //       this.CompanyMembershipFees = 0;
  //       this.TaxSlabID = 0;
  //       this.IsActive = false;
  //       this.ModifiedBy = 0;
  //     }
  //     // else {
  //     //   showDangerToast('Update Failed');
  //     // }
  //     else if (data["status_code"] == 300) {
  //       showDangerToast(JSON.parse(data["message"])[0]["message"]);
  //     }
  //     else {
  //       showDangerToast("Some error occured, data not saved");
  //     }
  //   });
  // }
  updateCompanyMemberShip() {
    if (!this.validateFields()) return;
  
    const val = {
      CompanyMemberShipTypeID: this.CompanyMemberShipTypeID,
      CompanyMemberShipName: this.CompanyMemberShipName,
      CompanyMembershipFees: this.CompanyMembershipFees,
      TaxSlabID: this.TaxSlabID,
      IsActive: this.IsActive,
      ModifiedBy: this.currentUserID
    };
  
    this.service.UpdateCompanyMemberShip(val).subscribe(data => {
      if (data["status_code"] == 100) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
        closePopup('showMembership-Module');
        this.emitData.emit(false);
  
        this.CompanyMemberShipTypeID = 0;
        this.CompanyMemberShipName = '';
        this.CompanyMembershipFees = 0;
        this.TaxSlabID = 0;
        this.IsActive = false;
        this.ModifiedBy = 0;
      } else if (data["status_code"] == 300) {
        showDangerToast(JSON.parse(data["message"])[0]["message"]);
      } else {
        showDangerToast("Some error occured, data not saved");
      }
    });
  }
  
}

