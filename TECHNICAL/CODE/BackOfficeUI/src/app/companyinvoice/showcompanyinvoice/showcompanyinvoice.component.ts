import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
declare function closePopup(id: any): any;

declare function showSuccessToast(msg: any): any;
declare function bindDataTable(id: any): any;
declare function showInfoToast(msg: any): any;

@Component({
  selector: 'app-showcompanyinvoice',
  templateUrl: './showcompanyinvoice.component.html',
  styleUrls: ['./showcompanyinvoice.component.css'],
})
export class ShowcompanyinvoiceComponent implements OnInit {
  ModalTitle: any;
  UserRoleID: any;
  companyInvoicesList: any;
  CompanyNameSearch: any;
  CompanyID: any;
  CompanyMembershipInvoiceID: any;
  isNameSelected: any;
  CompanyList: any;
  Invoicedata: any;
  pdf: any;
  ModalTitle1: any;
  countrydata: any = [];
  currency: any;
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private service: SharedService) { }
  ActivateAddEditinvoice: boolean = false;
  Activategenerateinvoice: boolean = false;

  ngOnInit(): void {
    this.ModalTitle = 'Generate Membership Invoice';
    this.refreshInvoicesList();
    this.currencySign();
  }
  generateinvoice(item: any) {
    this.Invoicedata = item;
    this.ModalTitle1 = 'Generate Invoice';
    this.ActivateAddEditinvoice = true;
  }

  emittedDataByChild(data: boolean) {
    this.ActivateAddEditinvoice = data;
    if (!data) {
      this.refreshInvoicesList();
    }
  }

  emittedDataChil(data: boolean) {
    this.Activategenerateinvoice = data;
    if (!data) {
      this.refreshInvoicesList();
    }
  }

  closeClick() {
    this.ActivateAddEditinvoice = false;
    this.refreshInvoicesList();
  }

  closeeClick() {
    this.Activategenerateinvoice = false;
    this.refreshInvoicesList();
  }

  viewClick(item: any) {
    this.Invoicedata = item;
    this.ModalTitle = '';
    this.Activategenerateinvoice = true;
  }

  onCompanyNameType() {
    var val: any = {};
    if (this.CompanyNameSearch?.trim().length === 0) {
      // Clear company ID and fetch all data if input is empty
      this.CompanyID = '';
      this.isNameSelected = false;
      this.refreshInvoicesList(); 
      this.CompanyList = []; // Hide dropdown
      return;
    }
  
    val.CompanyName = this.CompanyNameSearch;
  
    this.service.getCompanyList(val).subscribe((data) => {
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
  
  refreshInvoicesList() {
    this.currentPage = 1;
    var val: any = {};
    if (this.CompanyID && this.CompanyID.toString().trim() !== '') {
      val.CompanyID = this.CompanyID;
    }
    // const val: any = {};

    // if (this.CompanyID && this.CompanyID.toString().trim() !== '') {
    //   val.CompanyID = this.CompanyID;
    // }

  
    this.service.getMembershipInvoicesList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.companyInvoicesList = JSON.parse(data['message']);
      } else if (data['status_code'] == 200) {
        // showInfoToast(JSON.parse(data['message'])[0]['Message']);
         this.companyInvoicesList = [];
      }
    });
  }

  clearFilters() {
  this.CompanyID = null;
  this.CompanyNameSearch = '';
  this.refreshInvoicesList();
}
  
  // Hide dropdown when clicking outside
  hideDropdown() {
    setTimeout(() => {
      this.CompanyList = [];
    }, 200); // Delay to allow selection before hiding
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

  get paginatedcompanyInvoices() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.companyInvoicesList.slice(start, start + this.itemsPerPage);
  }
  
  get totalPages() {
    return Math.ceil(this.companyInvoicesList.length / this.itemsPerPage);
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
