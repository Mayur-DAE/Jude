import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

declare function showInfoToast(msg: any): any;
declare function excelExport(id: any, name: string): any;

@Component({
  selector: 'app-report-expired-shop',
  templateUrl: './report-expired-shop.component.html',
  styleUrls: ['./report-expired-shop.component.css'],
})
export class ReportExpiredShopComponent implements OnInit {
  constructor(private services: SharedService) {}
  CompanyID: any;
  FromDate: any;
  ToDate: any;
  CompanyMemberShipExpiryDate: any;
  ReportsExpiredShopList: any = [];
  ActivateReportDetails: boolean = false;
  CompanyName: any;
  isNameSelected: any;
  CompanyList: any = [];

  ngOnInit(): void {
    this.refreshReportsExpiredShopList();
  }

  refreshReportsExpiredShopList() {
    var val: any = {};
    if (this.CompanyName?.toString().trim().length !== 0) {
      val.CompanyName = this.CompanyName;
    }

    if (this.FromDate?.toString().trim().length !== 0) {
      val.FromDate = this.FromDate;
    }

    if (this.ToDate?.toString().trim().length !== 0) {
      val.ToDate = this.ToDate;
    }

    if (this.CompanyMemberShipExpiryDate?.toString().trim().length !== 0) {
      val.CompanyMemberShipExpiryDate = this.CompanyMemberShipExpiryDate;
    }

    this.services.getreportsExpiredShop(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.ReportsExpiredShopList = JSON.parse(data['message']);
      } else {
        showInfoToast('No data found');
      }
    });
  }

  exportToExcel() {
    excelExport('reports-Expired', 'Report');
  }
}
