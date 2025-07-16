import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css'],
})
export class ShowDetailComponent implements OnInit {
landmark: any;
  constructor(
    private service: SharedService,

    private_http: HttpClient
  ) { }
  @Input()
  actionClick: any;
  @Input()
  order: any;
  OrderInvoiceNumber: any;


  OrderList: any = [];
  OrderInvoiceList: any = [];
  OrderProductList: any = [];
  bindDataTableDoIt = true;
  CompanyAddress: any;
  Username: any;
  OrderId: any;
  UserId: any;
  CompanyId: any;
  Address1: any;
  Address2: any;
  OrderDate: any;
  ProductName: any;
  Quantity: any;
  OrderPrice: any;
  CompanyLogoPath: any;
  TotalPrice: any = 0;
  ShippingPrice: any = 0;
  TotalOrderPrice: any = 0;
  CompanyName: any;
  CompanyLogo: any;
  CompanyMobileNo1: any;
  FirstName: any;
  MiddleName: any;
  // Landmark1:any;
  LastName: any;
  MobileNumber: any;
  countrydata: any = [];
  currency: any;


  ngOnInit(): void {
    this.OrderId = this.order['OrderID'];
    this.CompanyName = this.order['CompanyName']
    this.CompanyLogo = this.order['CompanyLogoPath']
    this.CompanyAddress = this.order['CompanyAddress']
    this.CompanyMobileNo1 = this.order['CompanyMobileNo1']
    this.FirstName = this.order['FirstName']
    this.MiddleName = this.order['MiddleName']
    this.LastName = this.order['LastName']
    this.Address1 = this.order['Address1']
        this.Address2 = this.order['Address2']
    this.landmark = this.order['landmark']
    this.MobileNumber = this.order['MobileNumber']
    this.OrderDate = this.order['OrderDate']

    this.OrderInvoiceNumber = this.order['OrderInvoiceNumber']
    this.CompanyId = this.order.CompanyID;
    this.CompanyLogoPath = this.service.PhotoUrl + '/listing/';
    this.refreshOrderList();
    this.refreshOrderInvoiceList();
    this.currencySign();
    console.log(this.landmark, 'this.Landmark1');
    
    
  }
  refreshOrderList() {
    let val = { OrderId: this.OrderId };
    this.service.getorderList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.OrderList = JSON.parse(data['message']);
        this.TotalPrice = this.OrderList[0]['OrderPrice'];
        this.ShippingPrice = this.OrderList[0]['ShippingPrice'];
        this.TotalOrderPrice = this.OrderList[0]['TotalOrderPrice'];
      }
    });
  }
  // landmark: any;
  refreshOrderInvoiceList() {
    let val = { OrderId: this.OrderId };
    this.service.getOrderInvoiceList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.OrderInvoiceList = JSON.parse(data['message']);
        console.log( 'order invoice23456789ee',this.OrderInvoiceList);
        this.landmark = this.OrderInvoiceList[0]["landmark"];
        console.log( 'order invoice23456789ee',this.landmark)
        // this.OrderInvoiceList.forEach( (element: any) => {
        //   this.TotalPrice = element.TotalPrice + this.TotalPrice ;
        // });
      }
    });
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('orderData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(this.OrderInvoiceNumber + '.pdf');
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
