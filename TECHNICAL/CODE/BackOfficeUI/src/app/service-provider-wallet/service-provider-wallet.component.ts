import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
declare function closePopup(id: any): any;

declare function showSuccessToast(msg: any): any;
declare function bindDataTable(id: any): any;
declare function showInfoToast(msg: any): any;
declare function showDangerToast(msg: any): any;

@Component({
  selector: 'app-service-provider-wallet',
  templateUrl: './service-provider-wallet.component.html',
  styleUrls: ['./service-provider-wallet.component.css'],
})
export class ServiceProviderWalletComponent implements OnInit {
  ModalTitle: any;
  ServiceProviderID: any;
  ServiceProviderList: any;
  CurrentBalance: any;
  AmountCredited: any;
  ReferenceNumber: any;
  currentUserID: any;
  currentUser: any;
  UserRoleID: any;
  CreditDate: any;

  ServiceProviderWalletLog: any;

  ServiceProviderWalletLogID: any;
  editServiceProviderID: any;
  editAmountCredited: any;
  editReferenceNumber: any;
  editCreditDate: any;
  OldAmountCredited: any;

  ServiceProvider_errormsg: any;
  AmountCredited_errormsg: any;
  ReferenceNumber_errormsg: any;
  CreditDate_errormsg: any;

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.ModalTitle = 'Generate Membership Invoice';
    this.getServiceProvider();

    this.currentUser = localStorage.getItem('BoUser');

    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      this.currentUserID = this.currentUser.UserID;
      this.UserRoleID = this.currentUser.UserRoleID;
    }

    this.getServiceProviderWalletLog();
  }

  getServiceProvider() {
    let val = {};
    this.service.getServiceProvider(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.ServiceProviderList = JSON.parse(data['message']);
      }
    });
  }

  getServiceProviderBalance() {
    if (this.ServiceProviderID != '') {
      let val = {
        ServiceProviderID: this.ServiceProviderID,
      };
      this.service.getServiceProvider(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          let obj = JSON.parse(data['message']);
          this.CurrentBalance = obj[0]['CurrentWallentBalance'];

          this.getServiceProviderWalletLog_();
        }
      });
    }
  }

  save() {
    if (this.validate()) {
      var val = {
        ServiceProviderID: this.ServiceProviderID,
        AmountCredited: this.AmountCredited,
        CreditDate: this.CreditDate,
        CreditReferenceNumber: this.ReferenceNumber,
        CreatedBy: this.currentUserID,
      };

      this.service.addServiceProviderWalletLog(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          showSuccessToast(JSON.parse(data['message'])[0]['message']);
          this.getServiceProviderWalletLog();
          this.getServiceProviderBalance();

          this.CreditDate = null;
          this.AmountCredited = null;
          this.ReferenceNumber = null;
        } else if (data['status_code'] == 300) {
          showDangerToast(JSON.parse(data['message'])[0]['message']);
        } else {
          showDangerToast('Some error occured, data not saved');
        }
      });
    }
  }

  Update() {
    var val = {
      ServiceProviderWalletLogID: this.ServiceProviderWalletLogID,
      ServiceProviderID: this.editServiceProviderID,
      AmountCredited: this.editAmountCredited,
      OldAmountCredited: this.OldAmountCredited,
      CreditDate: this.editCreditDate,
      CreditReferenceNumber: this.editReferenceNumber,
      ModifiedBy: this.currentUserID,
    };

    this.service.updateServiceProviderWalletLog(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);

        this.getServiceProviderBalance();
        if (this.ServiceProviderID != '') {
          this.getServiceProviderWalletLog_();
        } else {
          this.getServiceProviderWalletLog();
        }

        this.ServiceProviderWalletLogID = null;
        this.editServiceProviderID = null;
        this.editAmountCredited = null;
        this.OldAmountCredited = null;
        this.editReferenceNumber = null;
        this.editCreditDate = null;

        closePopup('SPModal');
      } else if (data['status_code'] == 300) {
        showDangerToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showDangerToast('Some error occured, data not saved');
      }
    });
  }

  getServiceProviderWalletLog() {
    let val = {};
    this.service.ServiceProviderWalletLog(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.ServiceProviderWalletLog = JSON.parse(data['message']);
      }
    });
  }

  getServiceProviderWalletLog_() {
    let val = {
      ServiceProviderID: this.ServiceProviderID,
    };
    this.service.ServiceProviderWalletLog(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.ServiceProviderWalletLog = JSON.parse(data['message']);
      } else {
        showInfoToast(JSON.parse(data['message'])[0]['Message']);
        this.ServiceProviderWalletLog = null;
      }
    });
  }

  edit(dataItem: any) {
    this.ServiceProviderWalletLogID = dataItem.ServiceProviderWalletLogID;
    this.editServiceProviderID = dataItem.ServiceProviderID;
    this.editAmountCredited = dataItem.AmountCredited;
    this.OldAmountCredited = dataItem.AmountCredited;
    this.editReferenceNumber = dataItem.CreditReferenceNumber;
    this.editCreditDate = dataItem.CreditDate;
  }

  validate() {
    var returnValue = true;

    this.ServiceProvider_errormsg = '';
    this.AmountCredited_errormsg = '';
    this.ReferenceNumber_errormsg = '';
    this.CreditDate_errormsg = '';

    if (this.ServiceProviderID == null || this.ServiceProviderID == '') {
      this.ServiceProvider_errormsg = 'Select service provider';
      return false;
    }

    if (this.AmountCredited == null || this.AmountCredited == '') {
      this.AmountCredited_errormsg = 'Enter valid amount';
      return false;
    }

    if (this.ReferenceNumber == null || this.ReferenceNumber == '') {
      this.ReferenceNumber_errormsg = 'Enter valid Reference Number';
      return false;
    }

    if (this.CreditDate == null || this.CreditDate == '') {
      this.CreditDate_errormsg = 'Select valid date';
      return false;
    }
    return returnValue;
  }
}
