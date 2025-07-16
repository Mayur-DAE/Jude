import { Component, OnInit, Input} from '@angular/core';
import { SharedService } from 'src/app/shared.service';


declare function showSuccessToast(msg:any): any;
declare function bindDataTable(id:any): any;

@Component({
  selector: 'app-show-productsubcategory',
  templateUrl: './show-productsubcategory.component.html',
  styleUrls: ['./show-productsubcategory.component.css']
})
export class ShowProductsubcategoryComponent implements OnInit {

  constructor(private service:SharedService) { }

  ModalTitle:any;
  ProductSubCategorySearch: any;
  ActivateAddEditProductsubcategoryComp:boolean=false;
  productsubcategory:any;
  ProductsubcategoryList:any=[];
  bindDataTableDoIt = true;
  currentPage = 1;
  itemsPerPage = 5;

  @Input()
  ProductSubCategoryID:any;
  IsActive:any;
 
  ngOnInit(): void {
    this.refreshProductsubcategoryList();
  }

  bindDatatableTS(){
    if(this.bindDataTableDoIt){
      bindDataTable('order-listing');
      this.bindDataTableDoIt = false;
    }
  }

  emittedDataByChild(data:boolean) {      
    this.ActivateAddEditProductsubcategoryComp = data;
    if(!data){
      this.refreshProductsubcategoryList();
    }
  }

  addClick(){
    this.productsubcategory={
      ProductSubCategoryID:0,
      ProductSubCategoryShortName:"",
      ProductSubCategoryDescription:"",
      ProductSubCategoryThumbNailPhotoPath:"anonymous1.png",
      ProductSubCategoryLargePhotoPath:"anonymous1.png",
      IsActive: true
    }
    this.ModalTitle="Add Sub-Category";
    this.ActivateAddEditProductsubcategoryComp=true;
  }

  editClick(item:any){  
    this.productsubcategory=item;
    this.ModalTitle="Edit Sub-Category";
    this.ActivateAddEditProductsubcategoryComp=true;
  }

  closeClick(){
    this.ActivateAddEditProductsubcategoryComp=false;
    this.refreshProductsubcategoryList();
  }
  
  Inactive(item:any){
    var val = {
      ProductSubCategoryID:item.ProductSubCategoryID,
      IsActive:0
  }
  this.service.IsActiveProductSubcategory(val).subscribe(data=>{
  if(data["status_code"] == 100){
    showSuccessToast("Sub-Category Inactivated Successfully");
  }
  else if(data["status_code"] == 300){
    showSuccessToast(JSON.parse(data["message"])[0]["message"]);
  }
  else{
    showSuccessToast("Some error occured, data not saved");
  }
  this.refreshProductsubcategoryList();
  });
  }

  Active(item:any){
  var val = {
    ProductSubCategoryID:item.ProductSubCategoryID,
    IsActive:1
  }
  this.service.IsActiveProductSubcategory(val).subscribe(data=>{
  if(data["status_code"] == 100){
    showSuccessToast("Sub-Category Activated Successfully");
  }
  else if(data["status_code"] == 300){
    showSuccessToast(JSON.parse(data["message"])[0]["message"]);
  }
  else{
    showSuccessToast("Some error occured, data not saved");
  }
  this.refreshProductsubcategoryList();
  });
  }
 
  clearProductSubCategoryFilters() {
    this.ProductSubCategorySearch = '';
  
    // Reload all data without filters
    this.refreshProductsubcategoryList(true);
  }
  
  refreshProductsubcategoryList(isReset: boolean = false) {
    let val: any = {};
  
    if (!isReset) {
      if (this.ProductSubCategorySearch?.trim().length !== 0) {
        val.ProductSubCategoryShortName = this.ProductSubCategorySearch;
      }
    }
  
    this.service.getProductSubcategoryList(val).subscribe(data => {
      if (data["status_code"] == 100) {
        this.ProductsubcategoryList = JSON.parse(data["message"]);
      }
      else {
      this.ProductsubcategoryList = [];
    }
    });
  }
  
  
  get paginatedProductsubcategory() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.ProductsubcategoryList.slice(start, start + this.itemsPerPage);
  }
  
  get totalPages() {
    return Math.ceil(this.ProductsubcategoryList.length / this.itemsPerPage);
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
