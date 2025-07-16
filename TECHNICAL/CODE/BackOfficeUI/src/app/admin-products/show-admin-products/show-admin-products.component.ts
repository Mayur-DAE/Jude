import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function showInfoToast(msg: any): any;
declare function excelExport(id: any, name: string): any;


@Component({
  selector: 'app-show-admin-products',
  templateUrl: './show-admin-products.component.html',
  styleUrls: ['./show-admin-products.component.css']
})
export class ShowAdminProductsComponent implements OnInit {

  constructor(private service: SharedService) { }
  ProductsList: any = [];
  CompanyName: any;
  CompanyList: any;
  ModalTitle: any;
  ActivateAddEditproducts: boolean = false;
  products: any;
  CompanyID: any;
  ProductSubCategoryList: any;
  ProductSubCategoryName: any;
  ProductCategoryID: any;
  ProductCategoryList: any;
  ProductCategoryName: any;
  ProductSubCategoryID: any;
  enteredSearchValue: any;
  isNameSelected: any;
  CompanyNameSearch: any;
  UserRoleID: any;
  currentUser: any;
  IsPublished: any = false;
  IsApproved: any = false;
  MasterProductImageThumbnailPath: any;
  masterproducts: any;
  MasterProductName: any;
  MasterProductDescription: any;
  MasterProductPrice: any;
  MasterProductsList: any = [];
  CompanyProductsList: any = [];
  CompanyProductID: any;
  ProductPrice: any;
  DiscountType: any;
  DiscountPrice: any;
  ProductNameSearch: string = "";
  ProductNameWithoutSearch: any = [];
  editCompanyProduct: boolean = false;
  currentPage = 1;
  itemsPerPage = 5;
  companyItemsPerPage: number = 5;
  companyCurrentPage: number = 1;
  @Input()

  MasterProductID: any;

  startRowIndex: any = 0;
  PageSize: any = 50;
  countrydata: any = [];
  currency: any;

  ngOnInit(): void {
    this.MasterProductImageThumbnailPath = this.service.PhotoUrl;
    this.loadProductSubCategoryList();
    this.loadProductCategoryList();
    this.currentUser = localStorage.getItem('BoUser');
    //console.log(this.currentUser);

    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      this.UserRoleID = this.currentUser.UserRoleID;
      //console.log(this.UserRoleID);

    }
    if (this.UserRoleID != 2) {
      this.refreshMasterProductsList();
    }
    if (this.UserRoleID != 1) {
      this.refreshCompanyProductsList();
    }
    this.currencySign();
  }

  emittedDataByChild(data: boolean) {
    this.ActivateAddEditproducts = data;
    if (!data) {
      this.onUserRoles();
    }
  }

  addClick() {
console.log("hii",this.products);

    this.products = {
      CompanyProductID: 0,
      ProductPrice: 0,
      DiscountType: '',
      DiscountPrice: 0,

      MasterProductID: 0,
      ProductCategoryID: '',
      ProductSubCategoryID: '',
      TaxSlabID: 0,
      MasterProductName: '',
      MasterProductDescription: '',
      MasterProductPrice: '',
      MasterProductUnit: '',
      IsActive: true,
    //       // Reset all form fields and image arrays
    // this.MasterProductImageLargeImagePath = '';
    // this.MasterProductImageLargeImagePaths = [];
    // this.MasterProductImageLargeImageNamePaths = [];
      MasterProductImageThumbnailImagePath: 'anonymous.png',
      MasterProductImageLargeImagePath: '',
    };
    this.ModalTitle = 'Product Information';
    this.ActivateAddEditproducts = true;
    //console.log(this.UserRoleID);

  }

  closeClick() {
    
    this.ActivateAddEditproducts = false;
    this.onUserRoles();
    //console.log(this.UserRoleID);
  }

  editClick(item: any) {
    this.products = item; 
    this.editCompanyProduct = true;
    //console.log(this.products);
    this.ModalTitle = 'Edit Product';
    this.ActivateAddEditproducts = true;
    console.log("prakash",this.products);   
  }


  refreshProductsList() {
    //alert(this.IsPublished);
    //alert(this.IsApproved);
    var val: any = {};
    this.CompanyID = this.currentUser.CompanyID;

    if (this.CompanyID?.toString().length !== 0) {

      if (this.CompanyID != 1) {
        val.CompanyID = this.CompanyID;
      }

    }
    if (this.CompanyNameSearch?.trim().length !== 0) {
      val.CompanyName = this.CompanyNameSearch;
      // console.log(this.CompanyNameSearch);
    }
    if (this.ProductCategoryID?.trim().length !== 0) {
      val.ProductCategoryID = this.ProductCategoryID;
    }
    if (this.ProductSubCategoryID?.trim().length !== 0) {
      val.ProductSubCategoryID = this.ProductSubCategoryID;
    }
    if (this.IsPublished == true) {
      val.IsPublished = 0;
    }
    if (this.IsApproved == true) {
      val.IsApproved = 0;
    }
    // console.log(val);

    this.service.getproductsList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.ProductsList = JSON.parse(data['message']);
      } else {
        //showInfoToast('No data found');
        this.ProductsList = []
      }
    });
  }

  loadProductSubCategoryList() {
    let val = { ProductCategoryID: this.ProductCategoryID, IsActive: 1 };
    this.service.getproductsubcategoryList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.ProductSubCategoryList = JSON.parse(data['message']);
        //console.log(data);
      }
      if (data['status_code'] == 200) {
        this.ProductSubCategoryList = JSON.parse(data['message']);
      }
    });
  }

  loadProductCategoryList() {
    let val = { IsActive: 1 };
    this.service.getproductcategoryList(val).subscribe((data) => {

      if (data['status_code'] == 100) {
        this.ProductCategoryList = JSON.parse(data['message']);
      }
    });
  }

  onUserRoles() {
    this.currentUser = localStorage.getItem('BoUser');
    console.log(this.currentUser);

    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      this.UserRoleID = this.currentUser.UserRoleID;
      console.log(this.UserRoleID);


      if (this.UserRoleID == 2) {
        this.refreshCompanyProductsList();
      }
      else {
        this.refreshMasterProductsList();
      }
    }
  }
  exportToExcel() {
    excelExport('show-product', 'Product');
  }

  refreshMasterProductsList() {
    this.currentPage = 1;
    var masterval = 0
    this.service.getmasterproductsList(masterval).subscribe((data) => {
      console.log(data);
      if (data['status_code'] == 100) {
        this.MasterProductsList = JSON.parse(data['message']);
        console.log(" this.MasterProductsList ", this.MasterProductsList );
        console.log(" this.MasterProductsListMasterProductImageLargeImagePath ", this.MasterProductsList[0].MasterProductImageLargeImagePath );

        
        this.ProductNameWithoutSearch = JSON.parse(data['message']);
      } else {
        showInfoToast('No data found');
        this.MasterProductsList = []
      }
    }
    );
  }
  refreshCompanyProductsList() {
    this.currentPage = 1;
    this.CompanyID = this.currentUser.CompanyID;
    var masterval: any = { CompanyID: this.CompanyID };
    this.service.getcompanyproductsList(masterval).subscribe((data) => {
      console.log(data);
      if (data['status_code'] == 100) {
        this.CompanyProductsList = JSON.parse(data['message']);
        
        this.ProductNameWithoutSearch = JSON.parse(data['message']);
      } else {
        showInfoToast('No data found');
        this.CompanyProductsList = []
      }
    }
    );
  }

  Inactive(item: any) {

    var val = {
      MasterProductID: item.MasterProductID,
      IsActive: false,
      ModifiedBy: this.currentUser.UserID,
    };
    this.service.updatemasterproducts(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast("Product Inactivated Successfully");
      } else if (data['status_code'] == 300) {
        showSuccessToast("");
      } else {
        showSuccessToast('Some error occured, data not saved');
      }
      this.onUserRoles();
    });
  }

  Active(item: any) {
    var val = {
      MasterProductID: item.MasterProductID,
      IsActive: true,
      ModifiedBy: this.currentUser.UserID,
    };
    this.service.updatemasterproducts(val).subscribe((data) => {
      //console.log(data);

      if (data['status_code'] == 100) {
        showSuccessToast("Product Activated Successfully");
      } else if (data['status_code'] == 300) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showSuccessToast('Some error occured, data not saved');
      }
      this.onUserRoles();
    });
  }
  InactiveCompany(item: any) {
    var val = {
      CompanyProductID: item.CompanyProductID,
      IsActive: false,
      ModifiedBy: this.currentUser.UserID,
    };
    this.service.updatecompanyproducts(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast("Product Inactivated Successfully");
      } else if (data['status_code'] == 300) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showSuccessToast('Some error occured, data not saved');
      }
      this.onUserRoles();
    });
  }
  ActiveCompany(item: any) {
    var val = {
      CompanyProductID: item.CompanyProductID,
      IsActive: true,
      ModifiedBy: this.currentUser.UserID,
    };
    this.service.updatecompanyproducts(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast("Product Activated Successfully");
      } else if (data['status_code'] == 300) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showSuccessToast('Some error occured, data not saved');
      }
      this.onUserRoles();
    });
  }

  filterName() {
    var ProductNameSearch = this.ProductNameSearch;
    if (this.UserRoleID != 2) {
      this.MasterProductsList = this.ProductNameWithoutSearch.filter(function (el: any) {
        return el.MasterProductName.toString().toLowerCase().includes(
          ProductNameSearch.toString().trim().toLowerCase()
        )
      })
    } else {
      this.CompanyProductsList = this.ProductNameWithoutSearch.filter(function (el: any) {
        return el.MasterProductName.toString().toLowerCase().includes(
          ProductNameSearch.toString().trim().toLowerCase()
        )
      })
    }
    
  }
  resetInput() {
    this.ProductNameSearch = '';
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

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.MasterProductsList.slice(start, start + this.itemsPerPage);
  }

  get paginatedCompanyProducts() {
    const start = (this.companyCurrentPage - 1) * this.companyItemsPerPage;
    return this.CompanyProductsList.slice(start, start + this.companyItemsPerPage);
  }
  
  getTotalPages(type: 'master' | 'company') {
    return type === 'master'
      ? Math.ceil(this.MasterProductsList.length / this.itemsPerPage)
      : Math.ceil(this.CompanyProductsList.length / this.companyItemsPerPage);
  }
  
  changePage(page: number, type: 'master' | 'company') {
    const total = this.getTotalPages(type);
    if (page < 1 || page > total) return;
  
    if (type === 'master') this.currentPage = page;
    else this.companyCurrentPage = page;
  }
  
  min(a: number, b: number) {
    return Math.min(a, b);
  }
  
  getMiddlePages(type: 'master' | 'company'): number[] {
    const total = this.getTotalPages(type);
    const current = type === 'master' ? this.currentPage : this.companyCurrentPage;
    
    if (total <= 5) return Array.from({ length: total - 2 }, (_, i) => i + 2);
  
    if (current <= 3) return [2, 3, 4,5];
    if (current >= total - 2) return [total - 3, total - 2, total - 1];
  
    return [current - 1, current, current + 1];
  }
  onItemsPerPageChange(event: Event, type: 'master' | 'company') {
    const value = +(event.target as HTMLSelectElement).value;
    if (type === 'master') {
      this.itemsPerPage = value;
      this.currentPage = 1;
    } else {
      this.companyItemsPerPage = value;
      this.companyCurrentPage = 1;
    }
  }
}