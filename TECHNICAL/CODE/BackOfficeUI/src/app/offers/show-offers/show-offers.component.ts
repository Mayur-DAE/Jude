import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function excelExport(id: any, name:string): any;

interface Offer {
  OfferName: string;
  CompanyName: string;
  OfferDescription: string;
  OfferStartDate: string;
  OfferEndDate: string;
  OfferDiscount: number;
}

@Component({
  selector: 'app-show-offers',
  templateUrl: './show-offers.component.html',
  styleUrls: ['./show-offers.component.css']
})
export class ShowOffersComponent implements OnInit {

  constructor(private service: SharedService) { }
  OffersList: any = [];
  ModalTitle: any;
  ActiveAddEditOffersComp: boolean = false;
  offer: any;
  isEditMode: boolean = false; // Track edit mode
  currentPage = 1;
  itemsPerPage = 5;

  @Input()
  OfferID: any;
  OfferName: any;
  OfferDescription: any;
  OfferStartDate: any;
  OfferEndDate: any;
  OfferDiscount: any;
  OfferDiscountType: any;
  CreatedBy: any;
  countrydata: any = [];
  currency: any;
  ngOnInit(): void {
    this.refreshOfferList();
        this.currencySign();

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
  emittedDataByChild(data: boolean) {
    this.ActiveAddEditOffersComp = data;
    if (!data) {
      this.refreshOfferList();
    }
  }

  addClick() { 
    const userRole = localStorage.getItem('userRole');  
    const shopName = localStorage.getItem('shopName');  
  
    this.offer = {
      OfferID: 0,
      CompanyID: userRole === 'ShopOwner' ? shopName : "", 
      OfferName: "",
      OfferDescription: "",
      OfferStartDate: "",
      OfferEndDate: "",
      OfferDiscount: "",
      OfferDiscountType: "",
      CreatedBy: ""
    };
  
    this.isEditMode = userRole === 'ShopOwner';  
    this.ModalTitle = "Add Offer";
    this.ActiveAddEditOffersComp = true;
    this.refreshOfferList();
  }
  
  
  editClick(item: any) {
   console.log("item",item);
   
    this.offer = item;
    this.OfferDiscountType = item.discountType; // Set the discount type
    this.ModalTitle = "Edit Offer";
    this.ActiveAddEditOffersComp = true;
    this.isEditMode = true; // Enable edit mode
    
}
  closeClick() {
    this.ActiveAddEditOffersComp = false;
    this.refreshOfferList();
  }
 refreshOfferList() {
  // Retrieve logged-in user details
  let currentUser = localStorage.getItem('BoUser');

  if (currentUser) {
    let user = JSON.parse(currentUser);
    let val: any = {};

    // Only filter offers for a specific shop (CompanyID)
    if (user.CompanyID && user.CompanyID !== 1) { 
      val.CompanyID = user.CompanyID;
    }

    this.service.GetOffers(val).subscribe(data => {
      if (data["status_code"] == 100) {
        this.OffersList = JSON.parse(data["message"]);
        console.log("hi",this.OffersList);
        
      } else {
        this.OffersList = [];
        console.log("No offers available for this shop.");
      }
    });
  }
}


  // exportToExcel(){
  //   excelExport("show-offer","Offer");
  // }
  
exportToExcel(): void {
  let htmlContent = `
    <table border="1">
      <thead>
        <tr>
          <th><b>Name</b></th>
          <th><b>Shop Name</b></th>
          <th><b>Description</b></th>
          <th><b>Start Date</b></th>
          <th><b>End Date</b></th>
          <th><b>Discount</b></th>
        </tr>
      </thead>
      <tbody>
  `;

  this.OffersList.forEach((offer: Offer) => {
    htmlContent += `
      <tr>
        <td>${offer.OfferName}</td>
        <td>${offer.CompanyName}</td>
        <td>${offer.OfferDescription}</td>
        <td>${offer.OfferStartDate}</td>
        <td>${offer.OfferEndDate}</td>
        <td>${offer.OfferDiscount}</td>
      </tr>
    `;
  });

  htmlContent += `</tbody></table>`;

  let blob = new Blob([htmlContent], { type: "application/vnd.ms-excel" });
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = "Offers.xls";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

  get paginatedOffers() {
    
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.OffersList.slice(start, start + this.itemsPerPage);
  }
  
  get totalPages() {
    return Math.ceil(this.OffersList.length / this.itemsPerPage);
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

