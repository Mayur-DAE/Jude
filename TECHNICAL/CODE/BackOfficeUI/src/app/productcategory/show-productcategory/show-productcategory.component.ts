import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function bindDataTable(id: any): any;

@Component({
  selector: 'app-show-productcategory',
  templateUrl: './show-productcategory.component.html',
  styleUrls: ['./show-productcategory.component.css']
})
export class ShowProductcategoryComponent implements OnInit {

  constructor(private service: SharedService) { }

  ModalTitle: any;
  ProductcategorySearch: any;
  ActivateAddEditProductcategoryComp: boolean = false;
  productcategory: any;
  ProductcategoryList: any = [];
  bindDataTableDoIt = true;
  currentPage = 1;
  itemsPerPage = 5;

  @Input()
  ProductCategoryID: any;
  IsActive: any;

  ngOnInit(): void {
    this.refreshProductcategoryList();
  }
  bindDatatableTS() {
    if (this.bindDataTableDoIt) {
      bindDataTable('order-listing');
      this.bindDataTableDoIt = false;
    }
  }
  emittedDataByChild(data: boolean) { 
    this.ActivateAddEditProductcategoryComp = data;
    if (!data) {
      this.refreshProductcategoryList();
    }
  }
  addClick() {
    this.productcategory = {
      ProductCategoryID: 0,
      ProductCategoryShortName: "",
      ProductCategoryDescription: "",
      ProductCategoryThumbNailPhotoPath: "anonymous.png",
      ProductCategoryLargePhotoPath: "anonymous.png",
      IsActive: true
    }
    this.ModalTitle = "Add Category";
    this.ActivateAddEditProductcategoryComp = true;
  }

  editClick(item: any) {
    this.productcategory = item;
    console.log("Item", item);
    this.ModalTitle = "Edit Category";
    this.ActivateAddEditProductcategoryComp = true;
  }

  closeClick() {
    this.ActivateAddEditProductcategoryComp = false;
    this.refreshProductcategoryList();
  }

  Inactive(item: any) {
    var val = {
      ProductCategoryID: item.ProductCategoryID,
      IsActive: 0
    }
    this.service.IsActiveProductcategory(val).subscribe(data => {
      console.log(data);
      if (data["status_code"] == 100) {
        showSuccessToast("Category Inactivated Successfully");
      }
      else if (data["status_code"] == 300) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showSuccessToast("Some error occured, data not saved");
      }

      this.refreshProductcategoryList();
    });
  }
  Active(item: any) {
    console.log(item);
    var val = {
      ProductCategoryID: item.ProductCategoryID,
      IsActive: 1
    }
    this.service.IsActiveProductcategory(val).subscribe(data => {

      console.log(data);
      if (data["status_code"] == 100) {
        showSuccessToast("Category Activated Successfully");
      }
      else if (data["status_code"] == 300) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showSuccessToast("Some error occured, data not saved");
      }
      this.refreshProductcategoryList();
    });
  }
  clearProductCategoryFilters() {
    this.ProductCategoryID = null;
    this.ProductcategorySearch = '';
  
    // Call refreshProductcategoryList() without filters
    this.refreshProductcategoryList(true);
  }
  
  refreshProductcategoryList(isReset: boolean = false) {
    let val: any = {};
  
    if (!isReset) {
      if (this.ProductCategoryID) {
        val.ProductCategoryID = this.ProductCategoryID;
      }
      if (this.ProductcategorySearch?.trim().length !== 0) {
        val.ProductCategoryShortName = this.ProductcategorySearch;
      }
    }
  
    this.service.getProductcategoryList(val).subscribe(data => {
      if (data["status_code"] == 100) {
        this.ProductcategoryList = JSON.parse(data["message"]);
      }
      else {
      this.ProductcategoryList = [];
    }
    });
  }
  
  
  get paginatedProductcategory() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.ProductcategoryList.slice(start, start + this.itemsPerPage);
  }
  
  get totalPages() {
    return Math.ceil(this.ProductcategoryList.length / this.itemsPerPage);
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
