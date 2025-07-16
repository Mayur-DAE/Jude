import { Component, ViewChild, ElementRef , Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

declare function showInfoToast(msg: any): any;
declare function excelExport(id: any, name: string): any;

interface OrderReports{
  Srno:number;
  FirstName:string;
  LastName:string;
  CompanyName:string;
  OrderStatusDescription:string;
  OrderDate:string;
  OrderPrice:string;
  ShippingPrice:string;
  TotalOrderPrice:string;
  OrderPaymentReferenceNumber:string;
}

@Component({
  selector: 'app-show-report',
  templateUrl: './show-report.component.html',
  styleUrls: ['./show-report.component.css'],
})
export class ShowReportComponent implements OnInit {
  @ViewChild('printCurrent') printCurrentButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('printAll') printAllButton!: ElementRef<HTMLButtonElement>;

  constructor(private services: SharedService) { }
  showPrintDropdown = false;
  ModalTitle: any;
  order: any;
  OrderStatusList: any;
  isNameSelected: any;
  OrderID: any;
  OrderStatusDescription: any;
  OrderStatusID: any;
  ActivateReportDetails: boolean = false;
  UserNameSearch: any;
  Username: any;
  CompanyNameSearch: any;
  CompanyList: any;
  UserList: any;
  CompanyID: any;
  LastName: any;
  FirstName: any;
  firstNameError: string = '';
  lastNameError: string = '';
  @Input()
  OrderList: any = [];
  FromDate: any;
  ToDate: any;
  countrydata: any = [];
  currency: any;
  currentPage = 1;
  itemsPerPage = 5;

  ngOnInit(): void {
    this.loadOrderList();
    this.loadOrderStatusList();
    //this.loadUserList();
    this.currencySign();
  }

  closeClick() {
    this.ActivateReportDetails = false;
    this.refreshOrderList();
  }

  emittedDataByChild(data: boolean) {
    this.refreshOrderList();
  }
  print(type: string) {
    if (type === 'printCurrent') {
      this.printCurrentButton.nativeElement.click();
    } else if (type === 'printAll') {
      this.printAllButton.nativeElement.click();
    }
  }
  refreshOrderList() {
    this.currentPage = 1;
    var val: any = {};
    if (this.OrderID?.toString().length !== 0) {
      val.OrderID = this.OrderID;
    }
    if (this.OrderStatusID?.trim().length !== 0) {
      val.OrderStatusID = this.OrderStatusID;
    }

    if (this.UserNameSearch?.trim().length !== 0) {
      val.Username = this.UserNameSearch;
    }
    if (this.CompanyID?.toString().trim().length !== 0) {
      val.CompanyID = this.CompanyID;
    }

    if (this.FirstName?.trim().length !== 0) {
      const nameRegex = /^[A-Za-z]+$/;
    
      if (!nameRegex.test(this.FirstName)) {
        this.firstNameError = "Only alphabets are allowed!"; 
      } else {
        this.firstNameError = ""; 
        val.FirstName = this.FirstName;
      }
    }

    if (this.LastName?.trim().length !== 0) {
      const nameRegex = /^[A-Za-z]+$/;
    
      if (!nameRegex.test(this.LastName)) {
        this.lastNameError = "Only alphabets are allowed!"; 
      } else {
        this.lastNameError = ""; 
        val.LastName = this.LastName;
      }
    }

    if (this.FromDate?.toString().trim().length !== 0) {
      val.FromDate = this.FromDate;
    }

    if (this.ToDate?.toString().trim().length !== 0) {
      val.ToDate = this.ToDate;
    }

     (!this.firstNameError && !this.lastNameError ) && this.services.getorderList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.OrderList = JSON.parse(data['message']);
      } else {
        // showInfoToast('No data found');
        this.OrderList = [];
      }
    });
  }

  loadOrderList() {
    let val = {};
    this.services.getorderList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.OrderList = JSON.parse(data['message']);
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

  // loadUserList() {
  //   let val = {};
  //   this.services.getUserList(val).subscribe((data) => {
  //     if (data['status_code'] == 100) {
  //       this.UserList = JSON.parse(data['message']);
  //     }
  //   });
  // }

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
    this.CompanyNameSearch = CompanyList['CompanyName'];
    this.CompanyID = CompanyList['CompanyID'];
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
  clearSearchFields() {
    this.FirstName = '';
    this.LastName = '';
    this.OrderStatusID = '';
    this.CompanyNameSearch = '';
    this.firstNameError = '';
    this.lastNameError = '';
    this.CompanyList = [];
    this.CompanyID = ''; // Reset CompanyID
    this.refreshOrderList();
 
  }

  // exportToExcel() {
  //   excelExport("order-listing", "Report");
  //   console.log(this.loadOrderList);
  // }
  
  exportToExcel(): void {
    let htmlContent = `
      <table border="1">
        <thead>
          <tr>
            <th><b>Sr No</b></th>
            <th><b>Name</b></th>
            <th><b>Shop Name</b></th>
            <th><b>Order Status</b></th>
            <th><b>Order Date</b></th>
            <th><b>Order Price</b></th>
            <th><b>Shipping Price</b></th>
            <th><b>Total Price</b></th>
            <th><b>Reference Number</b></th>
          </tr>
        </thead>
        <tbody>
    `;
  
    this.OrderList.forEach((order: OrderReports, index: number) => {
      const fullName = `${order.FirstName} ${order.LastName}`.trim();
  
      htmlContent += `
        <tr>
          <td>${index + 1}</td> 
          <td>${fullName}</td>
          <td>${order.CompanyName}</td>
          <td>${order.OrderStatusDescription}</td>
          <td>${order.OrderDate}</td>
          <td>Br ${order.OrderPrice}</td>
          <td>Br ${order.ShippingPrice}</td>
          <td>Br ${order.TotalOrderPrice}</td>
          <td>${order.OrderPaymentReferenceNumber}</td>
        </tr>
      `;
    });
  
    htmlContent += `</tbody></table>`;
  
    let blob = new Blob([htmlContent], { type: "application/vnd.ms-excel" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "OrderReports.xls";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
    
  get paginatedOrder() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.OrderList.slice(start, start + this.itemsPerPage);
  }
  
  get totalPages() {
    return Math.ceil(this.OrderList.length / this.itemsPerPage);
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
