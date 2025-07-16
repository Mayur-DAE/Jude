import { Component, OnInit, Input, HostListener } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
declare function showSuccessToast(msg: any): any;
declare function bindDataTable(id: any): any;
declare function excelExport(id: any, name:string): any;

interface Review{
  SrNo: number;
  CustomerName: string;
  CompanyName: string;
  CustomerCompanyRating:string;
  CustomerRatingDescription:string;
  IsPublished: Boolean;
}

@Component({
  selector: 'app-show-rev',
  templateUrl: './show-rev.component.html',
  styleUrls: ['./show-rev.component.css'],
})
export class ShowRevComponent implements OnInit {
  constructor(private services: SharedService) {}

  ModalTitle: any;
  ActivateUpdateEditRevComp: boolean = false;
  rev: any;
  ReviewList: any = [];
  CompanyList: any;
  isNameSelected: any;
  CompanyNameSearch: any;
  bindDataTableDoIt = true;
  CompanyID:any;
  selectedReview: any = null;
  selectedRating: number = 0;
  currentPage = 1;
  itemsPerPage = 5;

  @Input()
  CustomerCompanyRatingID: any;
  IsPublished: any;
  showDropdown: boolean = false; // Track dropdown visibility


  ngOnInit(): void {
    this.refreshRevList();
     this.getCompanyList(); // Fetch the full list initially
  }
  bindDatatableTS() {
    if (this.bindDataTableDoIt) {
      bindDataTable('order-listing');
      this.bindDataTableDoIt = false;
    }
  }
  addClick() {
    this.rev = {
      CustomerCompanyRatingID: 0,
      CustomerName: '',
    };
    this.ModalTitle = 'Add';
    this.ActivateUpdateEditRevComp = true;
  }

  closeClick() {
    this.ActivateUpdateEditRevComp = false;
    this.refreshRevList();
  }

  UnPublished(item: any) {
    var val = {
      CustomerCompanyRatingID: item.CustomerCompanyRatingID,
      IsPublished: 0,
    };
    this.services.updatepublishReview(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else if (data['status_code'] == 300) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showSuccessToast('Some error occured, data not saved');
      }

      this.refreshRevList();
    });
  }

  Published(item: any) {
    var val = {
      CustomerCompanyRatingID: item.CustomerCompanyRatingID,
      IsPublished: 1,
    };
    this.services.updatepublishReview(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else if (data['status_code'] == 300) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showSuccessToast('Some error occured, data not saved');
      }
      this.refreshRevList();
    });
  }
  publishClick(item: any) {
  }

  refreshRevList() {
    this.currentPage = 1;
    let val: any = {};
  
    if (this.CompanyID) {
      val.CompanyID = this.CompanyID;
    }
    if (this.selectedRating) {
     val.CustomerCompanyRating = this.selectedRating;  
    }
    this.services.getRevList(val).subscribe((data) => {
      if (data['status_code'] === 100) {
        this.ReviewList = JSON.parse(data['message']);
      } else {
        this.ReviewList = []; 
      }
    });
  }
  
  clearratingsearch() {
    this.CompanyID = null;
    this.CompanyNameSearch = '';
    this.CompanyList = [];
    this.showDropdown = false;
    this.selectedRating = 0;
    this.refreshRevList();
  }
  
  loadCompanyNameList(){
    let val ={}
    this.services.getcompanyList(val).subscribe(data=>{
      if(data["status_code"]==100){
        this.CompanyList=JSON.parse(data["message"]);

      }
    });
  }
  getCompanyList() {
    this.services.getCompanyList({}).subscribe((data) => {
      if (data['status_code'] === 100) {
        this.CompanyList = JSON.parse(data['message']);
        // console.log("Company listttt", this.CompanyList);
        
      }
    });
  }
 onCompanyNameType() {
  if (this.CompanyNameSearch.trim().length === 0) {
    this.CompanyID = null;
    this.refreshRevList();
    this.showDropdown = false;
  } else {
    this.services.getCompanyList({ CompanyName: this.CompanyNameSearch }).subscribe((data) => {
      if (data['status_code'] === 100) {
        this.CompanyList = JSON.parse(data['message']);
        this.showDropdown = true;
      }
      else{
        this.CompanyList = [];
        this.showDropdown = true;
      }
    });
  }
}

  

 onInputClick() {
  this.getCompanyList();
  this.showDropdown = true;
  // console.log("📌 Dropdown Opened, Company List:", this.CompanyList);
}


onSelectName(dataItem: any) {
  this.CompanyNameSearch = dataItem.CompanyName;
  this.CompanyID = dataItem.CompanyID; // Store selected CompanyID
  this.showDropdown = false; // Hide dropdown
  // this.refreshRevList();
}


  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.untitled-page-block2') && !target.closest('.form-group.showReview1')) {
      this.showDropdown = false; // Hide dropdown when clicking outside
    }
  }
  // exportToExcel(){
  //   excelExport("show-review","Review");
  //   console.log(this.ReviewList);
  // }

  exportToExcel(): void {
    let htmlContent = `
      <table border="1">
        <thead>
          <tr>
            <th><b>Sr No</b></th>
            <th><b>Customer</b></th>
            <th><b>Shop</b></th>
            <th><b>Ratings</b></th>
            <th><b>Review</b></th>
            <th><b>Status</b></th>
          </tr>
        </thead>
        <tbody>
    `;
  
    this.ReviewList.forEach((review: Review, index: number) => {
      const publicationStatus = review.IsPublished ? "Published" : "UnPublished";
  
      htmlContent += `
        <tr>
          <td>${index + 1}</td>
          <td>${review.CustomerName}</td>
          <td>${review.CompanyName}</td>
          <td>${review.CustomerCompanyRating}</td>
          <td>${review.CustomerRatingDescription}</td>
          <td>${publicationStatus}</td>
        </tr>
      `;
    });
  
    htmlContent += `</tbody></table>`;
  
    let blob = new Blob([htmlContent], { type: "application/vnd.ms-excel" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "CustomerReviews.xls";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  openModal(review: any) {
    this.selectedReview = review;
  }

  get paginatedReview() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.ReviewList.slice(start, start + this.itemsPerPage);
  }
  
  get totalPages() {
    return Math.ceil(this.ReviewList.length / this.itemsPerPage);
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
