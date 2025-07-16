import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function showInfoToast(msg: any): any;
declare function excelExport(id: any, name: string): any;

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css'],
})
export class ShowProductsComponent implements OnInit {
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
  ProductImageThumbnailPath: any;
  @Input()
  ProductID: any;
  //IsApproved: any;

  startRowIndex: any = 0;
  PageSize: any = 50;
  countrydata: any = [];
  currency: any;

  ngOnInit(): void {
    this.ProductImageThumbnailPath = this.service.PhotoUrl;
    this.loadProductSubCategoryList();
    this.loadProductCategoryList();
    this.currentUser = localStorage.getItem('BoUser');

    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      this.UserRoleID = this.currentUser.UserRoleID;
    }
    // this.loadCompanyNameList();
    this.currencySign();
  }

  emittedDataByChild(data: boolean) {
    this.ActivateAddEditproducts = data;
    if (!data) {
      this.onUserRoles();
    }
  }

  // checkpublish() {
  //   this.publish = !this.publish;

  // }
  // checkApproved(){

  // }
  // refreshProductsListPagination(index: any, pageSize: any) {
  //   var val = {
  //     startRowIndex: index,
  //     PageSize: pageSize,

  //   };
  //   this.service.getproductsListPagination(val).subscribe((data) => {
  //     if (data['status_code'] == 100) {
  //       this.ProductsList = JSON.parse(data['message']);
  //     } else {
  //       showInfoToast('No data found');
  //     }
  //   });
  // }

  // nextPage() {
  //   this.startRowIndex = this.startRowIndex + this.PageSize;
  //   this.refreshProductsListPagination(this.startRowIndex, this.PageSize);
  // }
  // PrePage() {
  //   this.startRowIndex = this.startRowIndex - this.PageSize;
  //   this.refreshProductsListPagination(this.startRowIndex, this.PageSize);
  // }

  addClick() {
    this.products = {
      ProductID: 0,
      ProductCategoryID: '',
      ProductSubCategoryID: '',
      CompanyID: '',
      TaxSlabID: 0,
      ProductName: '',
      ProductDescription: '',
      ProductPrice: '',
      ProductDiscount: '',
      ProductDiscountPrice: '',
      ProductWeight: '',
      IsPublished: false,
      IsApproved: false,
      ProductImageThumbnailImagePath: 'anonymous.png',
      ProductImageLargeImagePath: 'anonymous.png',
    };
    this.ModalTitle = 'Add Products';
    this.ActivateAddEditproducts = true;
  }

  closeClick() {
    this.ActivateAddEditproducts = false;
    this.onUserRoles();
  }

  editClick(item: any) {
    this.products = item;
    this.ModalTitle = 'Edit Product';
    this.ActivateAddEditproducts = true;
  }

  onCompanyNameType() {
    var val: any = {};
    if (val == '') {
      this.isNameSelected = false;
    }
    if (this.CompanyNameSearch?.trim().length !== 0) {
      val.CompanyName = this.CompanyNameSearch;
    }
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
        showInfoToast('No data found');
        this.ProductsList = []
      }
    });
  }
  loadCompanyNameList() {
    let val = {};
    this.service.getcompanyList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.CompanyList = JSON.parse(data['message']);
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

  Unapproved(item: any) {
    let ProductID = item.ProductID;
    this.Unpublishboth(ProductID);
    var val = {
      ProductID: item.ProductID,
      IsApproved: 0,
    };
    this.service.updateproductapproval(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else if (data['status_code'] == 300) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showSuccessToast('Some error occured, data not saved');
      }
      this.onUserRoles();
    });
  }

  Unpublishboth(ProductID: any) {
    var val = {
      ProductID: ProductID,
      IsPublished: 0,
    };
    this.service.updateproductpublish(val).subscribe((data) => {
      if (data['status_code'] == 100) {
      } else if (data['status_code'] == 300) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showSuccessToast('Some error occured, data not saved');
      }
      this.onUserRoles();
    });
  }

  approved(item: any) {
    var val = {
      ProductID: item.ProductID,
      IsApproved: 1,
    };

    this.service.updateproductapproval(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else if (data['status_code'] == 300) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showSuccessToast('Some error occured, data not saved');
      }
      this.onUserRoles();
    });
  }

  Unpublish(item: any) {
    var val = {
      ProductID: item.ProductID,
      IsPublished: 0,
    };

    this.service.updateproductpublish(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else if (data['status_code'] == 300) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showSuccessToast('Some error occured, data not saved');
      }
      this.onUserRoles();
    });
  }
  Publish(item: any) {
    var val = {
      ProductID: item.ProductID,
      IsPublished: 1,
    };

    this.service.updateproductpublish(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
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

      if (this.UserRoleID == 2) {
        this.CompanyID = this.currentUser.CompanyID;
        var val: any = { CompanyID: this.CompanyID };
        this.service.getproductsList(val).subscribe((data) => {
          if (data['status_code'] == 100) {
            this.ProductsList = JSON.parse(data['message']);
            // console.log(this.ProductsList);
          } else {
            showInfoToast('No data found');
            this.ProductsList = [];
            // console.log(this.ProductsList);
          }
        });
      }
      else {
        this.refreshProductsList();
      }
    }
  }
  exportToExcel() {
    excelExport('show-product', 'Product');
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

}
