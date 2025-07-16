import { r3JitTypeSourceSpan } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

declare function bindPieChart(data: any, label: any): any;
declare function bindBarChart(data1: any, data2: any, label1: any, label2: any): any;
declare function showNotification(title: any, text: any): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private service: SharedService) { }

  companyList: any = [];
  yesterdayList: any = [];
  sevendaysList: any = [];
  monthList: any = [];
  dashboardList: any = [];
  NetSales: any;
  gmv: any;
  TotalOrderValue: any;
  TotalOrders: any;
  TotalShops: any;
  PaidShops: any;
  ExpiredShops: any;
  BestSeller: any = [];
  TopSeller: any = [];
  RecentOrder: any = [];
  OrderStatus: any = [];
  Order: any = [];
  selected = "All";
  CompanyID = 0
  userRoleID: any
  currentUser: any;
  ProductsList: any;
  BankDetailsList: any;
  companyaddressList: any;
  msg: any = "";
  showalert = false
  CompanName: any;
  countrydata: any = [];
  currency: any;

  ngOnInit(): void {

    this.userroles();
    this.refreshdashboardList();
    //  const isAddressProfileCompleted = localStorage.getItem('addressProfileCompleted') === 'true';
    //   const isBankProfileCompleted = localStorage.getItem('bankProfileCompleted') === 'true';
    //   console.log("isAddressProfileCompleted","isBankProfileCompleted",isAddressProfileCompleted,isBankProfileCompleted);
      
    if (this.userRoleID == 2 ) {
      // this.CheckAddressdata().then(res => this.ChcekBankdata().then(res => this.checkProducts().then(res => this.ShowModal())));
      this.CheckAddressdata().then(res => 
        this.ChcekBankdata().then(res => 
            this.ShowModal()
        )
    );

    
    }
    this.currencySign();




  }

  userroles() {
    this.currentUser = localStorage.getItem('BoUser');

    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      this.userRoleID = this.currentUser.UserRoleID;
      console.log(this.userRoleID)
      this.CompanyID = this.currentUser.CompanyID;
      var val: any = { CompanyID: this.CompanyID };
      this.service.getCompanyList(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          this.companyList = JSON.parse(data['message']);
          console.log(this.companyList);
          this.CompanName = this.companyList[0].CompanyName;
        }
      });


    }
  }

  todayList() {
    this.userroles();
    this.selected = "Today"

    var val: any = {};


    if (this.CompanyID !== 1) {
      val.CompanyID = this.CompanyID;
    }
    else {
      val.CompanyID = 0
    }


    if (this.userRoleID?.toString().length !== 0) {
      val.UserID = this.userRoleID;
    }

    this.service.gettoday(val).subscribe((data) => {

      this.dashboardList = data;
      console.log(this.dashboardList);

      this.NetSales = this.dashboardList['Table'][0]['Net sales'];

      this.gmv = this.dashboardList['Table'][0].GMV;

      this.TotalOrders = this.dashboardList['Table1'][0].TotalOrders;
      this.TotalShops = this.dashboardList['Table2'][0].TotalShops;
      this.PaidShops = this.dashboardList['Table3'][0].PaidShops;
      this.ExpiredShops = this.dashboardList['Table4'][0].ExpiredShops;
      this.BestSeller = this.dashboardList['Table5'];
      this.TopSeller = this.dashboardList['Table6'];
      this.RecentOrder = this.dashboardList['Table7'];
      this.OrderStatus = this.dashboardList['Table8'];
      this.Order = this.dashboardList['Table9'];

      var PieData = new Array();
      this.OrderStatus.forEach(function (value: any) {
        PieData.push(value.Count);

      });
      var PieData1 = new Array();
      this.OrderStatus.forEach(function (value: any) {
        PieData1.push(value.OrderStatusDescription);

      });


      bindPieChart(PieData, PieData1);

      var BarData = new Array();
      this.Order.forEach(function (value: any) {
        BarData.push(value.totalPrice);
      });
      var BarData1 = new Array();
      this.Order.forEach(function (value: any) {
        BarData1.push(value.month);
      });
      var BarData2 = new Array();
      this.Order.forEach(function (value: any) {
        BarData2.push(value.month);
      });
      var BarData3 = new Array();
      this.Order.forEach(function (value: any) {
        BarData3.push(value.totalPrice);
      });
      bindBarChart(BarData, BarData1, BarData2, BarData3);

    });
  }
  weeklyList() {
    this.userroles();
    this.selected = "Weekly"
    var val: any = {};


    if (this.CompanyID !== 1) {
      val.CompanyID = this.CompanyID;
    }
    else {
      val.CompanyID = 0
    }


    if (this.userRoleID?.toString().length !== 0) {
      val.UserID = this.userRoleID;
    }
    this.service.getweekly(val).subscribe((data) => {
      this.dashboardList = data;

      this.NetSales = this.dashboardList['Table'][0]['Net sales'];
      this.gmv = this.dashboardList['Table'][0].GMV;
      this.TotalOrders = this.dashboardList['Table1'][0].TotalOrders;
      this.TotalShops = this.dashboardList['Table2'][0].TotalShops;
      this.PaidShops = this.dashboardList['Table3'][0].PaidShops;
      this.ExpiredShops = this.dashboardList['Table4'][0].ExpiredShops;
      this.BestSeller = this.dashboardList['Table5'];
      this.TopSeller = this.dashboardList['Table6'];
      this.RecentOrder = this.dashboardList['Table7'];
      this.OrderStatus = this.dashboardList['Table8'];
      this.Order = this.dashboardList['Table9'];

      var PieData = new Array();
      this.OrderStatus.forEach(function (value: any) {
        PieData.push(value.Count);

      });
      var PieData1 = new Array();
      this.OrderStatus.forEach(function (value: any) {
        PieData1.push(value.OrderStatusDescription);

      });


      bindPieChart(PieData, PieData1);

      var BarData = new Array();
      this.Order.forEach(function (value: any) {
        BarData.push(value.totalPrice);
      });
      var BarData1 = new Array();
      this.Order.forEach(function (value: any) {
        BarData1.push(value.month);
      });
      var BarData2 = new Array();
      this.Order.forEach(function (value: any) {
        BarData2.push(value.month);
      });
      var BarData3 = new Array();
      this.Order.forEach(function (value: any) {
        BarData3.push(value.totalPrice);
      });
      bindBarChart(BarData, BarData1, BarData2, BarData3);

    });

  }
  quaterlyList() {
    this.userroles();
    this.selected = "Quaterly"
    var val: any = {};


    if (this.CompanyID !== 1) {
      val.CompanyID = this.CompanyID;
    }
    else {
      val.CompanyID = 0
    }


    if (this.userRoleID?.toString().length !== 0) {
      val.UserID = this.userRoleID;
    }
    this.service.getquaterly(val).subscribe((data) => {
      this.dashboardList = data;

      this.NetSales = this.dashboardList['Table'][0]['Net sales'];
      this.gmv = this.dashboardList['Table'][0].GMV;
      this.TotalOrders = this.dashboardList['Table1'][0].TotalOrders;
      this.TotalShops = this.dashboardList['Table2'][0].TotalShops;
      this.PaidShops = this.dashboardList['Table3'][0].PaidShops;
      this.ExpiredShops = this.dashboardList['Table4'][0].ExpiredShops;
      this.BestSeller = this.dashboardList['Table5'];
      this.TopSeller = this.dashboardList['Table6'];
      this.RecentOrder = this.dashboardList['Table7'];
      this.OrderStatus = this.dashboardList['Table8'];
      this.Order = this.dashboardList['Table9'];

      var PieData = new Array();
      this.OrderStatus.forEach(function (value: any) {
        PieData.push(value.Count);

      });
      var PieData1 = new Array();
      this.OrderStatus.forEach(function (value: any) {
        PieData1.push(value.OrderStatusDescription);

      });


      bindPieChart(PieData, PieData1);

      var BarData = new Array();
      this.Order.forEach(function (value: any) {
        BarData.push(value.totalPrice);
      });
      var BarData1 = new Array();
      this.Order.forEach(function (value: any) {
        BarData1.push(value.month);
      });
      var BarData2 = new Array();
      this.Order.forEach(function (value: any) {
        BarData2.push(value.month);
      });
      var BarData3 = new Array();
      this.Order.forEach(function (value: any) {
        BarData3.push(value.totalPrice);
      });
      bindBarChart(BarData, BarData1, BarData2, BarData3);
    });

  }
  yearlyList() {
    this.userroles();
    this.selected = "Yearly"
    var val: any = {};


    if (this.CompanyID !== 1) {
      val.CompanyID = this.CompanyID;
    }
    else {
      val.CompanyID = 0
    }


    if (this.userRoleID?.toString().length !== 0) {
      val.UserID = this.userRoleID;
    }
    this.service.getyearly(val).subscribe((data) => {
      this.dashboardList = data;
      this.NetSales = this.dashboardList['Table'][0]['Net sales'];
      this.gmv = this.dashboardList['Table'][0].GMV;
      this.TotalOrders = this.dashboardList['Table1'][0].TotalOrders;
      this.TotalShops = this.dashboardList['Table2'][0].TotalShops;
      this.PaidShops = this.dashboardList['Table3'][0].PaidShops;
      this.ExpiredShops = this.dashboardList['Table4'][0].ExpiredShops;
      this.BestSeller = this.dashboardList['Table5'];
      this.TopSeller = this.dashboardList['Table6'];
      this.RecentOrder = this.dashboardList['Table7'];
      this.OrderStatus = this.dashboardList['Table8'];
      this.Order = this.dashboardList['Table9'];
      var PieData = new Array();
      this.OrderStatus.forEach(function (value: any) {
        PieData.push(value.Count);
      });
      var PieData1 = new Array();
      this.OrderStatus.forEach(function (value: any) {
        PieData1.push(value.OrderStatusDescription);
      });


      bindPieChart(PieData, PieData1);

      var BarData = new Array();
      this.Order.forEach(function (value: any) {
        BarData.push(value.totalPrice);
      });
      var BarData1 = new Array();
      this.Order.forEach(function (value: any) {
        BarData1.push(value.month);
      });
      var BarData2 = new Array();
      this.Order.forEach(function (value: any) {
        BarData2.push(value.month);
      });
      var BarData3 = new Array();
      this.Order.forEach(function (value: any) {
        BarData3.push(value.totalPrice);
      });
      bindBarChart(BarData, BarData1, BarData2, BarData3);
    });

  }
  monthdataList() {
    this.userroles();
    this.selected = "Monthly"
    var val: any = {};


    if (this.CompanyID !== 1) {
      val.CompanyID = this.CompanyID;
    }
    else {
      val.CompanyID = 0
    }


    if (this.userRoleID?.toString().length !== 0) {
      val.UserID = this.userRoleID;
    }
    this.service.getmonthly(val).subscribe((data) => {
      this.dashboardList = data;
      this.NetSales = this.dashboardList['Table'][0]['Net sales'];
      this.gmv = this.dashboardList['Table'][0].GMV;
      this.TotalOrders = this.dashboardList['Table1'][0].TotalOrders;
      this.TotalShops = this.dashboardList['Table2'][0].TotalShops;
      this.PaidShops = this.dashboardList['Table3'][0].PaidShops;
      this.ExpiredShops = this.dashboardList['Table4'][0].ExpiredShops;
      this.BestSeller = this.dashboardList['Table5'];
      this.TopSeller = this.dashboardList['Table6'];
      this.RecentOrder = this.dashboardList['Table7'];
      this.OrderStatus = this.dashboardList['Table8'];
      this.Order = this.dashboardList['Table9'];
      var PieData = new Array();
      this.OrderStatus.forEach(function (value: any) {
        PieData.push(value.Count);

      });
      var PieData1 = new Array();
      this.OrderStatus.forEach(function (value: any) {
        PieData1.push(value.OrderStatusDescription);

      });


      bindPieChart(PieData, PieData1);

      var BarData = new Array();
      this.Order.forEach(function (value: any) {
        BarData.push(value.totalPrice);
      });
      var BarData1 = new Array();
      this.Order.forEach(function (value: any) {
        BarData1.push(value.month);
      });
      var BarData2 = new Array();
      this.Order.forEach(function (value: any) {
        BarData2.push(value.month);
      });
      var BarData3 = new Array();
      this.Order.forEach(function (value: any) {
        BarData3.push(value.totalPrice);
      });
      bindBarChart(BarData, BarData1, BarData2, BarData3);
    });
  }

  refreshdashboardList() {
    this.userroles();
    this.selected = "All"
    var val: any = {};
    if (this.CompanyID !== 1) {
      val.CompanyID = this.CompanyID;
    }
    else {
      val.CompanyID = 0
    }
    if (this.userRoleID?.toString().length !== 0) {
      val.UserID = this.userRoleID;
    }
    this.service.getdashboardList(val).subscribe(data => {
      this.dashboardList = data
      console.log("All data dashhh",this.dashboardList);


      this.NetSales = this.dashboardList['Table'][0]['Net sales'];
      this.gmv = this.dashboardList['Table'][0].GMV;
      this.TotalOrders = this.dashboardList['Table1'][0].TotalOrders;
      this.TotalShops = this.dashboardList['Table2'][0].TotalShops;
      this.PaidShops = this.dashboardList['Table3'][0].PaidShops;
      this.ExpiredShops = this.dashboardList['Table4'][0].ExpiredShops;
      this.BestSeller = this.dashboardList['Table5'];
      this.TopSeller = this.dashboardList['Table6'];
      this.RecentOrder = this.dashboardList['Table7'];
      this.OrderStatus = this.dashboardList['Table8'];
      this.Order = this.dashboardList['Table9'];

      var PieData = new Array();
      this.OrderStatus.forEach(function (value: any) {
        PieData.push(value.Count);

      });
      var PieData1 = new Array();
      this.OrderStatus.forEach(function (value: any) {
        PieData1.push(value.OrderStatusDescription);

      });
console.log("PieData1", PieData1);


      bindPieChart(PieData, PieData1);

      var BarData = new Array();
      this.Order.forEach(function (value: any) {
        BarData.push(value.totalPrice);
      });
      var BarData1 = new Array();
      this.Order.forEach(function (value: any) {
        BarData1.push(value.month);
      });
      var BarData2 = new Array();
      this.Order.forEach(function (value: any) {
        BarData2.push(value.month);
      });
      var BarData3 = new Array();
      this.Order.forEach(function (value: any) {
        BarData3.push(value.totalPrice);
      });
      bindBarChart(BarData, BarData1, BarData2, BarData3);
    });
  }

  refreshCompanyList() {

  }


  checkProducts() {
    return new Promise((resolve: any, reject: any) => {

      if (this.CompanyID != 0) {
        var val: any = { CompanyID: this.CompanyID };
        this.service.getproductsList(val).subscribe((data) => {
          if (data['status_code'] == 100) {
            this.ProductsList = JSON.parse(data['message']);
            resolve();
          }

          else if (data['status_code'] == 200) {


            this.msg = this.msg + "-Products\r\n"
            this.showalert = true
            resolve();
          }
        });
      }
    });
  }

  ChcekBankdata() {
    return new Promise((resolve: any, reject: any) => {

      if (this.CompanyID != 0) {
        let val = { CompanyID: this.CompanyID };
        this.service.getBankDetails(val).subscribe((data) => {
          if (data['status_code'] == 100) {
            this.BankDetailsList = JSON.parse(data['message']);
            resolve();

          }
          else if (data['status_code'] == 200) {

            this.msg = this.msg + "-Bank details\r\n"
            this.showalert = true
            resolve();
          }
        });
      }
    });
  }

  CheckAddressdata() {
    return new Promise((resolve: any, reject: any) => {

      if (this.CompanyID != 0) {
        let val = { CompanyID: this.CompanyID };
        this.service.getCompanyAddress(val).subscribe((data) => {
          if (data['status_code'] == 100) {
            this.companyaddressList = JSON.parse(data['message']);
            resolve();

          }
          else if (data['status_code'] == 200) {

            this.msg = this.msg + "-Shop address\r\n"
            this.showalert = true
            resolve();
          }
        });
      }
    });
  }



  ShowModal() {

    if (this.showalert) {
      console.log(this.msg);
    //       if (!this.msg || this.msg.trim() === '') {
    //   // ✅ No missing data – set flag to avoid future redirections
    //   localStorage.setItem('addressProfileCompleted', 'true');
    //     localStorage.setItem('bankProfileCompleted', 'true');
    //   return; // No need to show modal
    // }
      let message = "Welcome to Jude!\r\n"
      let text = " \r\n Please update the below missing information to ensure seamless experience with us: \r\n" + "\r\n" + this.msg;
      showNotification(message, text);
      this.showalert = false;
    }
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
