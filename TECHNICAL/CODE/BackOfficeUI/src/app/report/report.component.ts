import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';


declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function showInfoToast(msg: any): any;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private services: SharedService) { }
  ModalTitle: any;
  report: any;
  OrderStatusList: any;
  isNameSelected: any;
  isUserNameSelected: any;
  OrderID:any;
  UserID:any;
  OrderStatusDescription:any;
  OrderStatusID:any;
  ActivateOrderDetails: boolean = false;
  
  CompanyList: any;
  UserList:any;
  CompanyID: any;
  ComapnyList: any;

  @Input()
  OrderList: any = [];
  CompanyNameSearch: any;
  UserNameSearch:any;
  FromDate: any;
  ToDate: any;

  ngOnInit(): void {
    this.loadOrderList();
    this.loadOrderStatusList();
  }

  closeClick() {
    this.ActivateOrderDetails = false;
    this.refreshOrderList();
  }

  emittedDataByChild(data: boolean) {
    this.ActivateOrderDetails = data;
    if (!data) {
      this.refreshOrderList();
    }
  }

  refreshOrderList() {
    var val: any = {};
    if (this.OrderID?.toString().length !== 0) {
      val.OrderID = this.OrderID;
    }
    if (this.UserID?.trim().length !== 0) {
      val.UserID = this.UserID;
    }
    if (this.OrderStatusID?.trim().length !== 0) {
      val.OrderStatusID = this.OrderStatusID;
    }

    if(this.CompanyID?.toString().trim().length !== 0){
      val.CompanyID = this.CompanyID;
    }

    alert(this.FromDate);
    if(this.FromDate?.toString().trim().length !== 0){
      val.FromDate = this.FromDate;
    }

    if(this.ToDate?.toString().trim().length !== 0){
      val.ToDate = this.ToDate;
    }
    
    this.services.getorderList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.OrderList = JSON.parse(data['message']);
      } else {
        showInfoToast('No data found');
      }
    });
  }
 
  loadOrderList() {
    let val = {};
    this.services.getorderList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.OrderList = JSON.parse(data['message']);
        console.log(data);
      }
    });
  }

  loadOrderStatusList() {
    let val = {};
    this.services.getOrderStatusList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.OrderStatusList = JSON.parse(data['message']);
      }
    });
  }

  loadUserList() {
    let val = {};
    this.services.getUserList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.UserList = JSON.parse(data['message']);
      }
    });
  }

  onCompanyNameType() {
    var val: any = {};
    if (val == '') {
      this.isNameSelected = false;
    }
    if (this.CompanyNameSearch?.trim().length !== 0) {
      val.CompanyName = this.CompanyNameSearch;
    }
    this.services.getCompanyList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.CompanyList = JSON.parse(data['message']);
      }
    });
  }

  onSelectName(CompanyList?: any) {
    this.CompanyList = [];
    this.isNameSelected = true;
    this.CompanyNameSearch = CompanyList["CompanyName"];
    this.CompanyID = CompanyList["CompanyID"];
  }
  
  onUserNameType() {
    var val: any = {};
    if (val == '') {
      this.isUserNameSelected = false;
    }
    if (this.UserNameSearch?.trim().length !== 0) {
      val.Username = this.UserNameSearch;
    }
    this.services.getUserList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.UserList = JSON.parse(data['message']);
      }
    });
  }  
  
  
  onSelectUserName(UserList?: any) {
    this.UserList = [];
    this.isUserNameSelected = true;
    this.UserNameSearch = UserList["Username"];
    this.UserID = UserList["UserID"];
  }
}
