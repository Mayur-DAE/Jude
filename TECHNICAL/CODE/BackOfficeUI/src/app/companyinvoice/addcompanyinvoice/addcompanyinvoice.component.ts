import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { SharedService } from 'src/app/shared.service';
import { FormControl } from '@angular/forms';

declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function closePopup(id: any): any;

@Component({
  selector: 'app-addcompanyinvoice',
  templateUrl: './addcompanyinvoice.component.html',
  styleUrls: ['./addcompanyinvoice.component.css'],
})
export class AddcompanyinvoiceComponent implements OnInit {
  @Output() emitData = new EventEmitter<boolean>();
  MemberhsipType: any;
  CompanymembershipnameList: any;
  CompanymembershipList: any;

  constructor(private service: SharedService, private_http: HttpClient) { }

  @Input()
  Invoicedata: any;
  CompanyMemberShipStartDate: any;
  CompanyMemberShipExpiryDate: any;
  InvoiceDate: any;
  CompanyName: any;
  CompanyMemberShipTypeID: any;
  CompanyID: any;
  InvoiceAmount: any;
  SGST: any;
  CGST: any;
  IGST = 0;
  InvoiceTotal: any;
  TaxSlabPercentage: any;
  CreatedBy: any;
  currentUser: any;
  ReferenceNumber: any;
  PaymentMode: any;
  Taxslablist: any;
  countrydata: any = [];
  currency: any;

  ngOnInit(): void {
    console.log(this.Invoicedata);
    this.loadCompanyMemberShipNameList();

    this.CompanyMemberShipStartDate =
      this.Invoicedata.CompanyMemberShipStartDate;
    this.CompanyMemberShipExpiryDate =
      this.Invoicedata.CompanyMemberShipExpiryDate;
    this.CompanyID = this.Invoicedata?.CompanyID;
    this.CompanyName = this.Invoicedata?.CompanyName;
    this.CompanyMemberShipTypeID = this.Invoicedata?.CompanyMemberShipTypeID;
    this.InvoiceAmount = this.Invoicedata?.CompanyMembershipFees;
    this.MemberhsipType = this.Invoicedata?.CompanyMemberShipName;
    this.TaxSlabPercentage = this.Invoicedata?.TaxSlabPercentage;
    this.sgst();
    this.currentUser = localStorage.getItem('BoUser');
    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
    }
    this.currencySign();
  }

  loadInvoicedata() {
    let val = {
      IsActive: 1,
      CompanyMemberShipTypeID: this.CompanyMemberShipTypeID,
    };
    console.log(val);
    this.service.GetCompanyMemberShip(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.CompanymembershipList = JSON.parse(data['message']);

        this.InvoiceAmount =
          this.CompanymembershipList[0].CompanyMembershipFees;
        this.loadtaxslab();
      }
    });
  }

  loadtaxslab() {
    let val = { TaxSlabID: this.CompanymembershipList[0].TaxSlabID };
    console.log(val);
    this.service.GetTaxSlabs(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.Taxslablist = JSON.parse(data['message']);
        console.log(this.Taxslablist[0].TaxSlabPercentage);
        this.InvoiceTotal =
          this.InvoiceAmount +
          (this.Taxslablist[0].TaxSlabPercentage / 2) *
          (this.InvoiceAmount / 100) *
          2;

        this.CGST =
          (this.Taxslablist[0].TaxSlabPercentage / 2) *
          (this.InvoiceAmount / 100);

        this.SGST =
          (this.Taxslablist[0].TaxSlabPercentage / 2) *
          (this.InvoiceAmount / 100);
      }
    });
  }

  sgst() {
    this.InvoiceTotal =
      this.InvoiceAmount +
      (this.TaxSlabPercentage / 2) * (this.InvoiceAmount / 100) * 2;
    this.CGST = (this.TaxSlabPercentage / 2) * (this.InvoiceAmount / 100);
    this.SGST = (this.TaxSlabPercentage / 2) * (this.InvoiceAmount / 100);
  }

  //Dropdown Membership List
  loadCompanyMemberShipNameList() {
    let val = { IsActive: 1 };
    this.service.GetCompanyMemberShip(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.CompanymembershipnameList = JSON.parse(data['message']);
        this.MemberhsipType = this.Invoicedata.CompanyMemberShipTypeID;
      }
    });
  }

  Addinvoice() {
    var val = {
      CompanyMemberShipStartDate: this.CompanyMemberShipStartDate,
      CompanyMemberShipExpiryDate: this.CompanyMemberShipExpiryDate,
      InvoiceDate: this.InvoiceDate,
      CompanyID: this.CompanyID,
      CompanyMemberShipTypeID: this.CompanyMemberShipTypeID,
      InvoiceAmount: this.InvoiceAmount,
      SGST: this.SGST,
      CGST: this.CGST,
      PaymentMode: this.PaymentMode,
      ReferenceNumber: this.ReferenceNumber,
      IGST: 0,
      InvoiceTotal: this.InvoiceTotal,
      CreatedBy: this.currentUser.UserID,
    };
    this.service.addMembershipinvoice(val).subscribe((data) => {
      console.log(val);
      if (data['status_code'] == 100) {
        closePopup('exampleModal1');
        this.emitData.emit(false);
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else if (data['status_code'] == 300) {
        showDangerToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showDangerToast('Some error occured, data not saved');
      }
    });
  }

  currencySign() {
    var val: any = {
      IsActive: true,
    };
    this.service.getcurrency(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.countrydata = JSON.parse(data['message']);
        this.currency = this.countrydata[0].Symbol;

      }
    });
  }

}
