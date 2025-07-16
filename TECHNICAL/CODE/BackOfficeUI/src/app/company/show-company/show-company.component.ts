import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { using } from 'rxjs';
import { SharedService } from 'src/app/shared.service';

declare function showSuccessToast(msg: any): any;
declare function bindDataTable(id: any): any;
declare function showInfoToast(msg: any): any;
declare function showModal(): any;
declare function excelExport(id: any, name: string): any;

interface Company {
  SrNo: number;
  CompanyName: string;
  BusinessTypeName: string; 
  CompanyMemberShipName: string;
  CompanyMemberShipExpiryDate: string;
  IsActive:boolean;
}

@Component({
  selector: 'app-show-company',
  templateUrl: './show-company.component.html',
  styleUrls: ['./show-company.component.css'],
})
export class ShowCompanyComponent implements OnInit {

  constructor(private service: SharedService, private route: ActivatedRoute) {}

  companyList: any = [];
  ModalTitle: any;
  ActivateAddEditfaq: boolean = false;
  bindDataTableDoIt = true;
  company: any;
  BusinessTypeList: any;
  CompanymembershipnameList: any;
  CompanyNameSearch: any;
  @Input()
  CompanyID: any;
  BusinessTypeID: any;
  BusinessCategoryID: any;
  BusinessSubCategoryID: any;
  CompanySourceID: any;
  CompanyMemberShipTypeID: any;
  CompanyMemberShipExpiryDate: any;
  CompanyName: any;
  CompanyDescription: any;
  CompanyContactName: any;
  CompanyEmailid: any;
  CompanyMobileNo1: any;
  CompanyMobileNo2: any;
  // CompanyGSTNumber: any;
  // CompanyPANNumber: any;
  // CompanyMSMENumber: any;
  // CompanyPanCardImagePath: any;
  // CompanyGSTImagePath: any;
  // CompanyMSMEImagePath: any;
  CompanyLogoPath: any;
  // CompanyBannerPath: any;
  CompanyJoiningDate: any;
  WebsiteURL: any;
  FacbookID: any;
  Twitter: any;
  Linkedin: any;
  Instagram: any;
  WordPress: any;
  Pintrest: any;
  YouTube: any;
  CompanyTimeMonday: any;
  CompanyTimeTuesday: any;
  CompanyTimeWednesday: any;
  CompanyTimeThursday: any;
  CompanyTimeFriday: any;
  CompanyTimeSaturday: any;
  CompanyTimeSunday: any;
  IsActive: any;
  currentUser: any;
  UserRoleID: any;
  ctrl: any[] = [];

  ProductsList: any;
  companyaddressList: any;
  BankDetailsList: any;
  showModalStatus: any;
  isExpiredShops: boolean = false; // Initialize here
  currentPage = 1;
  itemsPerPage = 5;

  ngOnInit(): void {
    this.showModalStatus = this.route.snapshot.params['id'];

    this.loadBusinessList();
    this.loadCompanyMemberShipNameList();
    //this.refreshCompanyList();
    this.onUserRoles();
  }

  openModal() {
    if (this.showModalStatus == 'open-modal') {
      showModal();
    }
  }
  bindDatatableTS() {
    if (this.bindDataTableDoIt) {
      bindDataTable('order-listing');
      this.bindDataTableDoIt = false;
    }
  }
  emittedDataByChild(data: boolean) {
    this.ActivateAddEditfaq = data;
    if (!data) {
      this.onUserRoles();
    }
  }
  expire = false;
  checkExpire() {
    this.expire = !this.expire;
  }
  addClick() {
    this.company = {
      CompanyID: 0,
      BusinessTypeID: '',
      BusinessCategoryID: '',
      BusinessSubCategoryID: '',
      CompanySourceID: '',
      CompanyMemberShipTypeID: '',
      CompanyMemberShipExpiryDate: '',
      CompanyName: '',
      CompanyDescription: '',
      CompanyContactName: '',
      CompanyEmailid: '',
      CompanyMobileNo1: '',
      // CompanyGSTNumber: '',
      // CompanyPANNumber: '',
      // CompanyMSMENumber: '',
      // CompanyPanCardImagePath: 'anonymous.png',
      // CompanyGSTImagePath: 'anonymous.png',
      // CompanyMSMEImagePath: 'anonymous.png',
      CompanyLogoPath: 'anonymous.png',
      // CompanyBannerPath: 'anonymous.png',
      CompanyCancelledChequePath: 'anonymous.png',
      CompanyJoiningDate: '',
      WebsiteURL: '',
      FacbookID: '',
      Twitter: '',
      Linkedin: '',
      Instagram: '',
      WordPress: '',
      Pintrest: '',
      YouTube: '',
      CompanyTimeMonday: '',
      CompanyTimeTuesday: '',
      CompanyTimeWednesday: '',
      CompanyTimeThursday: '',
      CompanyTimeFriday: '',
      CompanyTimeSaturday: '',
      CompanyTimeSunday: '',
      IsActive: true,
    };
    this.ModalTitle = 'Add Shop';
    this.ActivateAddEditfaq = true;
  }
  // This determines whether the text input is rendered or not

  closeClick() {
    this.ActivateAddEditfaq = false;
    this.onUserRoles();
    this.showModalStatus = '';
  }
  editClick(item: any) {
    this.company = item;
    this.ModalTitle = 'Edit Shop';
    this.ActivateAddEditfaq = true;
  }

  refreshCompanyList(isReset: boolean = false) {
    this.currentPage = 1;
    let val: any = {};
  
    if (!isReset) { 
      // Only apply filters if not resetting
      if (this.BusinessTypeID) {
        val.BusinessTypeID = this.BusinessTypeID;
      }
      if (this.CompanyMemberShipTypeID) {
        val.CompanyMemberShipTypeID = this.CompanyMemberShipTypeID;
      }
      if (this.CompanyNameSearch?.trim().length !== 0) {
        val.CompanyName = this.CompanyNameSearch;
      }
    }
  
    // Fetch data from the API without any filters if reset
    this.service.getCompanyList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.companyList = JSON.parse(data['message']);
  
        // Apply expiration filter if needed
        if (this.isExpiredShops) {
          this.companyList = this.companyList.filter((elem: any) => {
            return new Date(elem.CompanyMemberShipExpiryDate) < new Date();
          });
        }
      } else if (data['status_code'] == 200) {
        // showInfoToast(JSON.parse(data['message'])[0]['Message']);
        this.companyList = [];
      }
    });
  }
  
  loadBusinessList() {
    let val = { IsActive: 1 };
    this.service.GetComplist(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.BusinessTypeList = JSON.parse(data['message']);
      }
    });
  }
  loadCompanyMemberShipNameList() {
    let val = { IsActive: 1 };
    this.service.GetCompanyMemberShip(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.CompanymembershipnameList = JSON.parse(data['message']);
      }
    });
  }

  activeClick(item: any) {
    var val = {
      CompanyID: item.CompanyID,
      ModifiedBy: 1,
      IsActive: 0,
    };
    this.service.setCompanyISActive(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast("Shop Inactivated Successfully");
      } else if (data['status_code'] == 300) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showSuccessToast('Some error occured, data not saved');
      }
      this.onUserRoles();
    });
  }
  inactiveClick(item: any) {
    var val = {
      CompanyID: item.CompanyID,
      ModifiedBy: 1,
      IsActive: 1,
    };
    this.service.setCompanyISActive(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast("Shop Actived Successfully");
      } else if (data['status_code'] == 300) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showSuccessToast('Some error occured, data not saved');
      }

      this.onUserRoles();
    });
  }
  onUserRoles() {
    this.currentUser = localStorage.getItem('BoUser');

    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      this.UserRoleID = this.currentUser.UserRoleID;
      this.CompanyID = this.currentUser.CompanyID;
      if (this.UserRoleID == 2) {
        var val: any = { CompanyID: this.CompanyID };
        this.service.getCompanyList(val).subscribe((data) => {
          if (data['status_code'] == 100) {
            this.companyList = JSON.parse(data['message']);
            console.log(this.companyList);
          } else if (data['status_code'] == 200) {
            showInfoToast(JSON.parse(data['message'])[0]['Message']);
          }
        });
      } else {
        this.refreshCompanyList();
      }
    }
  }
  clearSearchFields() {
    this.CompanyNameSearch = '';  // Clear Shop Name input
    this.BusinessTypeID = null;  // Reset Business Type dropdown
    this.CompanyMemberShipTypeID = null;  // Reset Membership Type dropdown
    this.isExpiredShops = false; 
      // Call refreshCompanyList() without filters to load all data
  this.refreshCompanyList(true);
  }

    
  exportToExcel(): void {
    console.log(287, this.companyList);
  
    let htmlContent = `
      <table border="1">
        <thead>
          <tr>
            <th><b>Sr No</b></th>
            <th><b>Name</b></th>
            <th><b>Business Type</b></th>
            <th><b>Membership Type</b></th>
            <th><b>Expiry Date</b></th>
            <th><b>Status</b></th>
          </tr>
        </thead>
        <tbody>
    `;
  
    this.companyList.forEach((company: Company, index: number) => {
      const status = company.IsActive ? "Active" : "Inactive"; 
  
      htmlContent += `
        <tr>
          <td>${index + 1}</td> 
          <td>${company.CompanyName}</td>
          <td>${company.BusinessTypeName}</td>
          <td>${company.CompanyMemberShipName}</td>
          <td>${company.CompanyMemberShipExpiryDate}</td>
          <td>${status}</td>  
        </tr>
      `;
    });
  
    htmlContent += `</tbody></table>`;
  
    let blob = new Blob([htmlContent], { type: "application/vnd.ms-excel" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "Company.xls";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  get paginatedCompany() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.companyList.slice(start, start + this.itemsPerPage);
  }
  
  get totalPages() {
    return Math.ceil(this.companyList.length / this.itemsPerPage);
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
