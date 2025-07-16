import { HostListener } from '@angular/core';
import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function showInfoToast(msg: any): any;
declare function closePopup(id: any): any;
declare function excelExport(id: any, name: string): any;

interface ShippingSettlement{
  SrNo:number;
  OrderDate:Date;
  CompanyName:string;
  CustomerName:string;
  CompanyMobileNo1:string;
  CompanyEmailid:string;
  OrderPrice:string;
  OrderID:number;
  OrderStatusDescription:string;
  ShippingPrice:string;
  TotalOrderPrice:string;
  IsShopPaymentSettled:boolean;
  ShopPaymentReference:string;
}

@Component({
  selector: 'app-show-settlement',
  templateUrl: './show-settlement.component.html',
  styleUrls: ['./show-settlement.component.css']
})
export class ShowSettlementComponent implements OnInit {


  constructor(private services: SharedService) { }
  TotalSettlementprice: any;
  isNameSelected: any;
  isUserNameSelected: any;
  ModalTitle: any;
  ActivateAddEditSettlementComp: boolean = false;
  settlement: any;
  settlementList: any = [];

  CompanyList: any;
  CompanyID: any;
  IsShopPaymentSettled: any = false;

  OrderID: any;
  submitsettlementlist: any = [];
  ShopPaymentReference: any;
  ShopPaymentSettledBy: any;
  CompanyNameSearch: any;
  currentUser: any;
  countrydata: any = [];
  currency: any;
  isDropdownOpen = false; // Flag to track dropdown state
  currentPage = 1;
  itemsPerPage = 5;

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('BoUser');
    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
    }
    this.refreshSettlementList();
    this.currencySign();
  }



  refreshSettlementList() {
    this.currentPage = 1;
    var val: any = {};

    if (this.CompanyID?.toString().length !== 0) {

      val.CompanyID = this.CompanyID;
      val.IsShopPaymentSettled = this.IsShopPaymentSettled;
    }
    if (this.CompanyNameSearch?.trim().length !== 0) {
      val.CompanyName = this.CompanyNameSearch;
      // console.log(this.CompanyNameSearch);
    }
    if(this.currentUser.UserRoleID == 1){
      val ={
        CompanyID: 0, IsShopPaymentSettled: true
       }
    }
    // else{
    //   val ={
    //     CompanyID: this.currentUser.CompanyID, IsShopPaymentSettled: true
    //    }
    // }
    this.services.getshopSettlementList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.settlementList = JSON.parse(data['message']);
        this.submitsettlementlist = [];
        console.log(this.settlementList)
      } else {
        this.submitsettlementlist = [];
        this.settlementList = [];

        // showInfoToast('No data found');
      }
    });

  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!(event.target as HTMLElement).closest('.showlayout1')) {
      this.isDropdownOpen = false;
      this.CompanyList = []; // Clear dropdown list
    }
  }

  onCompanyNameType() {
    var val: any = {};
    if (this.CompanyNameSearch?.trim().length !== 0) {
      val.CompanyName = this.CompanyNameSearch;
      this.isDropdownOpen = true; 
    } else {
      this.isDropdownOpen = false;
    }

    this.services.getCompanyList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.CompanyList = JSON.parse(data['message']);
      }
    });
  }

  onSelectName(CompanyList?: any) {
    this.CompanyList = [];
    this.isDropdownOpen = false;
    this.isNameSelected = true;
    this.CompanyNameSearch = CompanyList['CompanyName'];
    this.CompanyID = CompanyList['CompanyID'];
  }

  saveclick() {
    this.ShopPaymentReference = ""
    this.TotalSettlementprice = this.submitsettlementlist.reduce(function (
      acc: any,
      val: any
    ) {
      return acc + val.orderprice;
    },
      0);

  }


  submitshopsettlement() {


    this.submitsettlementlist.map((d: any) => {

      var val: any = {
        OrderID: d.OrderID,
        IsShopPaymentSettled: d.IsShopPaymentSettled,
        ShopPaymentReference: this.ShopPaymentReference,
        ShopPaymentSettledBy: this.currentUser.UserID
      };
      console.log(val);
      this.services.updateshopsettlement(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          showSuccessToast(JSON.parse(data['message'])[0]['message']);
          closePopup('exampleModal');

          this.submitsettlementlist = [];
          this.refreshSettlementList();
        }
      });
    })


  }


  oncheckedshop($event: any, OrderPrice: any) {
    if ($event.target.checked) {


      var customObj = {

        OrderID: $event.target.value,
        IsShopPaymentSettled: $event.target.checked,
        orderprice: OrderPrice
      }
      this.submitsettlementlist.push(customObj);

    }
    else {
      let OrderID = $event.target.value;
      this.submitsettlementlist = this.submitsettlementlist.filter((item: any) => item.OrderID !== OrderID);

    }
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

  // exportToExcel() {
  //   excelExport("show-settlement", "Settlement");
  //   console.log(this.submitsettlementlist);
  // }

  exportToExcel(): void {
    let htmlContent = `
      <table border="1">
        <thead>
          <tr>
            <th><b>Sr No</b></th>
            <th><b>Order Date</b></th>
            <th><b>Shop Name</b></th>
            <th><b>Customer Name</b></th>
            <th><b>Contact No</b></th>
            <th><b>Email ID</b></th>
            <th><b>Amount Payable</b></th>
            <th><b>Order ID</b></th>
            <th><b>Order Status</b></th>
            <th><b>Order Price</b></th> 
            <th><b>Shipping Price</b></th>
            <th><b>Total Price</b></th>
            <th><b>Settled</b></th>
            <th><b>Payment Ref</b></th>
          </tr>
        </thead>
        <tbody>
    `;
  
    this.settlementList.forEach((settlement: ShippingSettlement, index: number) => {
  
      htmlContent += `
        <tr>
          <td>${index + 1}</td> 
          <td>${settlement.OrderDate}</td>
          <td>${settlement.CompanyName}</td>
          <td>${settlement.CustomerName}</td>
          <td>${settlement.CompanyMobileNo1}</td>
          <td>${settlement.CompanyEmailid}</td>
          <td>Br ${settlement.OrderPrice}</td>
          <td>Br ${settlement.OrderID}</td>
          <td>${settlement.OrderStatusDescription}</td>
          <td>Br ${settlement.OrderPrice}</td>
          <td>Br ${settlement.ShippingPrice}</td>
          <td>Br ${settlement.TotalOrderPrice}</td>
          <td>${settlement.IsShopPaymentSettled}</td>
          <td>${settlement.ShopPaymentReference}</td>
        </tr>
      `;
    });
  
    htmlContent += `</tbody></table>`;
  
    let blob = new Blob([htmlContent], { type: "application/vnd.ms-excel" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "Shop Payment Settlement Report.xls";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  get paginatedSettlement() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.settlementList.slice(start, start + this.itemsPerPage);
  }
  
  get totalPages() {
    return Math.ceil(this.settlementList.length / this.itemsPerPage);
  }
  
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }
  
  min(a: number, b: number) {
    return Math.min(a, b);
  }
  
  getMiddlePages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    
    if (total <= 5) return Array.from({ length: total - 2 }, (_, i) => i + 2);
  
    if (current <= 3) return [2, 3, 4,5];
    if (current >= total - 2) return [total - 3, total - 2, total - 1];
  
    return [current - 1, current, current + 1];
  }
  
  onItemsPerPageChange(event: Event) {
    this.itemsPerPage = +(event.target as HTMLSelectElement).value;
    this.currentPage = 1;
  }
   
}
