import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { SharedService } from 'src/app/shared.service';
import { FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';

declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function showInfoToast(msg: any): any;
declare function showSwal(msg: any): any;

declare var Razorpay: any;
declare function closePopup(id: any): any;

@Component({
  selector: 'app-onlinemembershippayment',
  templateUrl: './onlinemembershippayment.component.html',
  styleUrls: ['./onlinemembershippayment.component.css'],
})
export class OnlinemembershippaymentComponent implements OnInit {
  @Output() emitData = new EventEmitter<boolean>();
  MemberhsipType: any;
  CompanymembershipnameList: any;
  CompanymembershipList: any;

  constructor(private service: SharedService, private_http: HttpClient) { }

  // @Input()
  // Invoicedata: any;
  CompanyMemberShipStartDate: any;
  error: any = '';
  paymentId: any = '';

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
  currentDate: any;
  expireyDate: any;
  companyList: any;
  countrydata: any = [];
  currency: any;

  title = 'Shipping Address';
  options = {
    //live
    //key: 'rzp_live_f7525EfqRRxaZr',
    // key: 'rzp_live_A8l357iZikuOEv',

    //demo
    key: 'rzp_live_A8l357iZikuOEv',
    amount: '20000',
    name: 'Area Online',
    description: 'Area Online',
    image:
      'https://www.areaonline.in/uploads/logo/c30eccd82fa3ab85bba38bc90f9b4afa.jpg',
    order_id: '',
    handler: function (response: any) {
      var event = new CustomEvent('payment.success', {
        detail: response,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    },
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    notes: {
      address: '',
    },
    theme: {
      color: '#3399cc',
    },
  };

  ngOnInit(): void {
    // console.log(this.Invoicedata);
    this.loadCompanyMemberShipNameList();

    this.sgst();
    this.currentUser = localStorage.getItem('BoUser');
    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
    }
    this.CompanyID = this.currentUser.CompanyID;
    console.log(this.CompanyID);
    this.getCompany();

    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    console.log(this.currentDate);
    this.currencySign();
  }

  getCompany() {
    var val: any = { CompanyID: this.CompanyID };
    this.service.getCompanyList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.companyList = JSON.parse(data['message']);
        this.CompanyName = this.companyList[0].CompanyName;
        console.log(this.companyList);
      } else if (data['status_code'] == 200) {
        showInfoToast(JSON.parse(data['message'])[0]['Message']);
      }
    });
  }

  loadInvoicedata() {
    let val = {
      IsActive: 1,
      CompanyMemberShipTypeID: this.CompanyMemberShipTypeID,
    };

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

    this.service.GetTaxSlabs(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.Taxslablist = JSON.parse(data['message']);

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

        if (this.CompanyMemberShipTypeID == 1) {
          var date = new Date();
          var newDate = new Date(date.setMonth(date.getMonth() + 12));
          this.expireyDate = formatDate(newDate, 'yyyy-MM-dd', 'en-US');
        }
        if (this.CompanyMemberShipTypeID == 2) {
          this.expireyDate = this.currentDate;
        }
        if (this.CompanyMemberShipTypeID == 3026) {
          var date = new Date();
          var newDate = new Date(date.setMonth(date.getMonth() + 1));
          this.expireyDate = formatDate(newDate, 'yyyy-MM-dd', 'en-US');
        }
        if (this.CompanyMemberShipTypeID == 3027) {
          var date = new Date();
          var newDate = new Date(date.setMonth(date.getMonth() + 4));
          this.expireyDate = formatDate(newDate, 'yyyy-MM-dd', 'en-US');
        }
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
    console.log(val);
    this.service.GetCompanyMemberShip(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.CompanymembershipnameList = JSON.parse(data['message']);
        console.log(this.CompanymembershipnameList);
        // this.MemberhsipType = this.Invoicedata.CompanyMemberShipTypeID;
      }
    });
  }

  Addinvoice() {
    var val = {
      CompanyMemberShipStartDate: this.currentDate,
      CompanyMemberShipExpiryDate: this.expireyDate,
      InvoiceDate: this.currentDate,
      CompanyID: this.CompanyID,
      CompanyMemberShipTypeID: this.CompanyMemberShipTypeID,
      InvoiceAmount: this.InvoiceAmount,
      SGST: this.SGST,
      CGST: this.CGST,
      PaymentMode: 'Online',
      ReferenceNumber: this.ReferenceNumber,
      IGST: 0,
      InvoiceTotal: this.InvoiceTotal,
      CreatedBy: this.currentUser.UserID,
    };
    this.service.addMembershipinvoice(val).subscribe((data) => {
      console.log(val);
      if (data['status_code'] == 100) {
        // closePopup('exampleModal1');
        this.emitData.emit(false);
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else if (data['status_code'] == 300) {
        showDangerToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showDangerToast('Some error occured, data not saved');
      }
    });
  }

  PayNow() {
    this.paymentId = '';

    this.error = '';

    var InvoiceTotall = this.InvoiceTotal * 100;

    this.options.amount = InvoiceTotall.toString(); //paise

    // this.options.prefill.name = 'Mayur Utekar';

    // this.options.prefill.email = 'mayurutekar124@gmail.com';

    // this.options.prefill.contact = '9820312449';

    var rzp1 = new Razorpay(this.options);

    rzp1.open();

    rzp1.on('payment.failed', function (response: any) {
      showDangerToast('Payment failed please retry.');

      // Todo - store this information in the server
      //console.log(response.error.code);
      //console.log(response.error.description);
      //console.log(response.error.source);
      // console.log(response.error.step);
      // console.log(response.error.reason);
      //console.log(response.error.metadata.order_id);
      // console.log(response.error.metadata.payment_id);
      //this.error = response.error.reason;
    });
  }

  onPaymentFailed() { }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    //console.log(event);
    //alert(event.detail.razorpay_payment_id);
    this.ReferenceNumber = event.detail.razorpay_payment_id;
    //mru
    //this.placeOrder();
    this.Addinvoice();
    showSwal('success-message');
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
