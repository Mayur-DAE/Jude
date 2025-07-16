import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function showInfoToast(msg: any): any;
declare function excelExport(id: any, name: string): any;

interface Orders{
  OrderID: number;
  FirstName: string;
  LastName: string;
  OrderStatusDescription: string;
  OrderDate:string;
  CompanyName:string;
  OrderDeliveryTypeName:string;
  OrderPrice: number;
}

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.css']
})
export class ShowOrderComponent implements OnInit {

  constructor(private service: SharedService) { }
  OrderList: any = [];
  CompanyList: any = [];
  OrderStatusList: any;
  ModalTitle: any;
  ActivateAddEditorder: boolean = false;
  order: any;
  currentUser: any;
  CompanyID: any;
  UserID: any;
  UserRoleID: any;
  isNameSelected: any;
  CompanyNameSearch: any;
  OrderID: any;
  LastName: any;
  FirstName: any;
  OrderStatusID: any;
  actionClick: any;
  countrydata: any = [];
  currency: any;
  firstNameError:string ='';
  lastNameError:string = '';
  orderIdError:string = '';
  showDropdown: boolean = false; // Controls dropdown visibility
  isDataLoaded: boolean = false; // Prevents unnecessary API calls
  currentPage = 1;
  itemsPerPage = 5;
  @Input()


  ngOnInit(): void {
    this.onUserRoles();
    this.loadOrderStatusList();
    this.currencySign();
  }

  refreshorderList() {
    this.currentPage = 1;
    var val: any = {}
  
    if (this.OrderID !== undefined && this.OrderID !== null) {
      const orderIDNumber = Number(this.OrderID); 
  
      if (isNaN(orderIDNumber) || orderIDNumber <= 0) {
        this.orderIdError = "Please enter a valid Order ID!";
        return;
      } else {
        this.orderIdError = ""; 
        val.OrderID = this.OrderID;
      }
    }
    
    if (this.CompanyID?.toString().length !== 0) {
      if (this.CompanyID != 1) {
        val.CompanyID = this.CompanyID;
      }
    }
    if (this.OrderStatusID?.trim().length !== 0) {
      val.OrderStatusID = this.OrderStatusID;
    }
    if (this.UserID?.toString().length !== 0) {
      val.UserID = this.UserID;
    }

    if (this.FirstName?.trim().length !== 0) {
      const nameRegex = /^[A-Za-z\s]+$/;
    
      if (!nameRegex.test(this.FirstName)) {
        this.firstNameError = "Only alphabets are allowed!"; 
      } else {
        this.firstNameError = ""; 
        val.FirstName = this.FirstName;
      }
    }

    if (this.LastName?.trim().length !== 0) {
      const nameRegex = /^[A-Za-z\s]+$/;
    
      if (!nameRegex.test(this.LastName)) {
        this.lastNameError = "Only alphabets are allowed!"; 
      } else {
        this.lastNameError = ""; 
        val.LastName = this.LastName;
      }
    }

    (!this.orderIdError && !this.firstNameError && !this.lastNameError ) && this.service.getorderList(val).subscribe(data => {
      if (data["status_code"] == 100) {
        this.OrderList = JSON.parse(data["message"]);
        console.log(this.OrderList);
      }
      else {
        // showInfoToast('No data found');
        this.OrderList= [];
      }
    });
  }

  closeClick() {
    this.ModalTitle = "Order details"
    this.ActivateAddEditorder = false;
    this.onUserRoles();
  }

  invoiceClick(item: any) {
    this.order = item;
    this.actionClick = 1;
    this.ModalTitle = "Invoice Details"
    this.ActivateAddEditorder = true;
  }

  viewClick(item: any) {
    this.order = item;

    this.actionClick = 0;
    this.ModalTitle = "Order Details"
    this.ActivateAddEditorder = true;
  }
  loadOrderStatusList() {
    let val = {};
    this.service.getOrderStatusList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.OrderStatusList = JSON.parse(data['message']);
      }
    });
  }
  onUserRoles() {
    this.currentUser = localStorage.getItem('BoUser');

    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      this.UserRoleID = this.currentUser.UserRoleID;
      this.CompanyID = this.currentUser.CompanyID;
console.log("this.currentUser",this.currentUser);

console.log("this.CompanyID ",this.CompanyID );

      if (this.UserRoleID == 2) {
        var val: any = { CompanyID: this.CompanyID };
        this.service.getorderList(val).subscribe(data => {
          if (data["status_code"] == 100) {
            this.OrderList = JSON.parse(data["message"]);
          }
        });
      }
      else {
        this.refreshorderList();
      }
    }
  }
  loadCompanyNameList() {
    let val = {}
    this.service.getcompanyList(val).subscribe(data => {
      if (data["status_code"] == 100) {
        this.CompanyList = JSON.parse(data["message"]);
      }
      else {
        showInfoToast('No data found');
      }
    });
  }
 
// Called when typing in the input field
onCompanyNameType() {
  if (!this.CompanyNameSearch?.trim()) {
    // If input is empty, fetch and show the full list
    this.fetchFullCompanyList();
    return;
  }

  let val: any = { CompanyName: this.CompanyNameSearch };

  this.service.getCompanyList(val).subscribe((data) => {
    if (data['status_code'] == 100) {
      this.CompanyList = JSON.parse(data['message']);
      this.showDropdown = true; // Show list when typing
    }
  });
}

// Called when input field is focused
onFocusInput() {
  if (!this.CompanyNameSearch?.trim()) {
    // If input is empty, fetch and show the full list
    this.fetchFullCompanyList();
  } else {
    this.showDropdown = true; // Show filtered list if input has value
  }
}

// Called when a company is selected
onSelectName(CompanyList?: any) {
  this.CompanyNameSearch = CompanyList?.CompanyName;
  this.CompanyID = CompanyList?.CompanyID;
  this.showDropdown = false; // Hide dropdown after selecting
}

// Called when clicking outside the input field
onBlurInput() {
  setTimeout(() => {
    this.showDropdown = false; // Hide dropdown when clicking outside
  }, 200);
}

fetchFullCompanyList() {
  this.service.getCompanyList({}).subscribe((data) => {
    if (data['status_code'] == 100) {
      this.CompanyList = JSON.parse(data['message']);
      this.isDataLoaded = true;

      // Only show dropdown when typing or focusing, not on clear
      if (this.CompanyNameSearch?.trim()) {
        this.showDropdown = true;
      } else {
        this.showDropdown = false;
      }
    }
  });
}


clearFilters() {
  // Reset input fields
  this.OrderID = null;
  this.FirstName = '';
  this.LastName = '';
  this.OrderStatusID = '';
  this.CompanyNameSearch = '';
  this.CompanyID = '';

  // Ensure dropdown is hidden
  this.showDropdown = false;
if (this.UserRoleID==2) {
  this.onUserRoles(); 
}else{
  // Fetch all data again
  this.refreshorderList();
}
}


  // exportToExcel() {
  //   excelExport("show-order", "Order");
  //   console.log(this.OrderList,249);
  // }

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

  exportToExcel(): void {
    let htmlContent = `
      <table border="1">
        <thead>
          <tr>
            <th><b>Order ID</b></th>
            <th><b>Name</b></th>
            <th><b>Status</b></th>
            <th><b>Date</b></th>
            <th><b>Shop</b></th>
            <th><b>Delivery Type</b></th>
            <th><b>Price</b></th>
          </tr>
        </thead>
        <tbody>
    `;
  
    this.OrderList.forEach((order: Orders) => {
      const customerName = `${order.FirstName} ${order.LastName}`;
  
      htmlContent += `
        <tr>
          <td>${order.OrderID}</td>
          <td>${customerName}</td>
          <td>${order.OrderStatusDescription}</td>
          <td>${order.OrderDate}</td>
          <td>${order.CompanyName}</td>
          <td>${order.OrderDeliveryTypeName}</td>
          <td>Br ${order.OrderPrice}</td>
        </tr>
      `;
    });
  
    htmlContent += `</tbody></table>`;
  
    let blob = new Blob([htmlContent], { type: "application/vnd.ms-excel" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "Orders.xls";
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
