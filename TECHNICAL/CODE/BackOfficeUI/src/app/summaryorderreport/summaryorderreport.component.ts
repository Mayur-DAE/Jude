import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

declare function excelExport(id: any, name: string): any;
declare function showInfoToast(msg: any): any;

@Component({
  selector: 'app-summaryorderreport',
  templateUrl: './summaryorderreport.component.html',
  styleUrls: ['./summaryorderreport.component.css'],
})
export class SummaryorderreportComponent implements OnInit {
  constructor(private services: SharedService) { }

  CompanyName: any;
  ToDate: any;
  FromDate: any;
  OrdersummaryreportList: any = [];
  countrydata: any = [];
  currency: any;

  ngOnInit(): void {
    this.refreshOrdersumaryList();
    this.currencySign();
  }

  refreshOrdersumaryList() {
    var val: any = {};
    if (this.FromDate?.toString().length !== 0) {
      val.FromDate = this.FromDate;
    }
    if (this.ToDate?.trim().length !== 0) {
      val.ToDate = this.ToDate;
    }

    if (this.CompanyName?.trim().length !== 0) {
      val.CompanyName = this.CompanyName;
    }

    this.services.getOrderSummaryreort(val).subscribe((data) => {
      console.log(val);
      if (data['status_code'] == 100) {
        this.OrdersummaryreportList = JSON.parse(data['message']);
        console.log(this.OrdersummaryreportList);
      } else {
        showInfoToast('No data found');
        this.OrdersummaryreportList = [];
      }
    });
  }

  exportToExcel() {
    excelExport('order-summary-report', 'Order_Summary');
  }

  currencySign() {
    var val: any = {
      IsActive: true,
    };
    this.services.getcurrency(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.countrydata = JSON.parse(data['message']);
        this.currency = this.countrydata[0].Symbol;

      }
    });
  }

}
