import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function closePopup(id: any): any;

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.css'],
})
export class AddEditProductsComponent implements OnInit {
  ProductCategory_errormsg = '';
  ProductSubCategory_errormsg = '';
  ProductCompanyName_errormsg = '';
  ProductGST_errormsg = '';
  ProductName_errormsg = '';
  ProductDescription_errormsg = '';
  ProductPrice_errormsg = '';
  ProductDiscount_errormsg = '';
  ProductDiscountPrice_errormsg = '';
  ProductWeight_errormsg = '';
  errormsg = false;
  currentUser: any;
  UserRoleID: any;

  @Output() emitData = new EventEmitter<boolean>();

  constructor(private service: SharedService, private_http: HttpClient) {}
  isNameSelected: any;
  CompanyNameSearch: any;

  @Input()
  products: any;
  ProductsList: any = [];
  ProductID: any;
  ProductCategoryID: any;
  ProductCategoryList: any;
  ProductCategoryName: any;
  ProductSubCategoryID: any;
  ProductSubCategoryList: any = [];
  ProductSubCategoryName: any;
  CompanyID: any;
  TaxSlabID: any;
  TaxslabList: any;
  CompanyList: any;
  CompanyName: any;
  ProductName: any;
  ProductDescription: any;
  ProductPrice: any;
  ProductDiscount: any;
  ProductDiscountPrice: any;
  ProductImageThumbnailImagePath: any;
  ProductImageThumbnailImageNamePath: any;
  ProductImageLargeImagePath: any;
  ProductImageLargeImageNamePath: any;
  ProductWeight: any;
  ProductGrams: any;
  IsPublished: any;
  IsApproved: any;
  CreatedBy: any;
  ModifiedBy: any;
  fileToUpload: File | null = null;

  ngOnInit(): void {
    this.onUserRoles();
    this.loadProductCategoryList();
    if (this.ProductID != 0) {
      this.loadProductSubCategoryList();
      this.ProductSubCategoryID = this.products.ProductSubCategoryID;
      this.ProductSubCategoryName = this.products.ProductSubCategoryName;
    }

    // this.loadCompanyNameList();
    this.loadTaxSlabList();

    (this.ProductID = this.products.ProductID),
      (this.IsPublished = this.products.IsPublished),
      (this.IsApproved = this.products.IsApproved),
      (this.ProductCategoryID = this.products.ProductCategoryID);
    this.ProductSubCategoryID = this.products.ProductSubCategoryID;
    this.ProductSubCategoryName = this.products.ProductSubCategoryName;
    this.CompanyID = this.products.CompanyID;
    this.TaxSlabID = this.products.TaxSlabID;
    this.CompanyName = this.products.CompanyName;
    this.ProductName = this.products.ProductName;
    this.ProductDescription = this.products.ProductDescription;
    this.ProductPrice = this.products.ProductPrice;
    this.ProductDiscount = this.products.ProductDiscount;
    this.ProductDiscountPrice = this.products.ProductDiscountPrice;
    this.ProductImageThumbnailImagePath =
      this.products.ProductImageThumbnailImagePath;

    //this.ProductImageThumbnailImageNamePath = this.products.ProductImageThumbnailImageNamePath;
    this.ProductImageThumbnailImageNamePath =
      this.service.PhotoUrl + this.products.ProductImageThumbnailImagePath;
    this.ProductImageLargeImagePath = this.products.ProductImageLargeImagePath;
    //this.ProductImageLargeImageNamePath = this.products.ProductImageLargeImageNamePath;
    this.ProductWeight = this.products.ProductWeight;
    this.ProductGrams = this.ProductWeight * 1000;
    this.ProductImageLargeImageNamePath =
      this.service.PhotoUrl + this.products.ProductImageLargeImagePath;
  }

  onUserRoles() {
    this.currentUser = localStorage.getItem('BoUser');
    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      this.UserRoleID = this.currentUser.UserRoleID;
    }
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
    this.service.getProductcategoryList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.ProductCategoryList = JSON.parse(data['message']);
        // console.log(data);
      }
    });
  }
  // loadCompanyNameList(){
  //   let val ={}
  //   this.service.getcompanyList(val).subscribe(data=>{
  //     if(data["status_code"]==100){
  //       this.CompanyList=JSON.parse(data["message"]);

  //     }
  //   });
  // }
  loadTaxSlabList() {
    let val = {IsActive: 1};
    this.service.GetTaxSlabs(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.TaxslabList = JSON.parse(data['message']);
      }
    });
  }

  addproduct() {
    this.ProductCategory_errormsg = '';
    this.ProductSubCategory_errormsg = '';
    this.ProductName_errormsg = '';
    this.ProductDescription_errormsg = '';
    this.ProductPrice_errormsg = '';

    this.ProductDiscount_errormsg = '';
    this.ProductDiscountPrice_errormsg = '';
    this.ProductWeight_errormsg = '';
    this.ProductCompanyName_errormsg = '';
    this.ProductGST_errormsg = '';

    if (this.CompanyID.toString().length === 0) {
      this.ProductCompanyName_errormsg = '* Please enter Shop Name';
      this.errormsg = true;
    }
    if (this.TaxSlabID.toString().length === 0) {
      this.ProductGST_errormsg = "* Please select product tax";
      this.errormsg = true;
    }

    if (this.ProductCategoryID.toString().length === 0) {
      this.ProductCategory_errormsg = '* Please select product category';
      this.errormsg = true;
    }
    if (this.ProductSubCategoryID.toString().length === 0) {
      this.ProductSubCategory_errormsg = '* Please select product subcategory';
      this.errormsg = true;
    }
    if (this.ProductName.trim().length === 0) {
      this.ProductName_errormsg = '* Please enter product name';
      this.errormsg = true;
    }
    if (this.ProductDescription.trim().length === 0) {
      this.ProductDescription_errormsg = '* Please enter product description';
      this.errormsg = true;
    }
    if (this.ProductPrice.toString().length === 0) {
      this.ProductPrice_errormsg = '* Please enter product price';
      this.errormsg = true;
    }
    if (this.ProductDiscount.toString().length === 0) {
      this.ProductDiscount_errormsg = '* Please enter product discount';
      this.errormsg = true;
    }
    if (this.ProductDiscountPrice.toString().length === 0) {
      this.ProductDiscountPrice_errormsg =
        '* Please enter product discount price';
      this.errormsg = true;
    }
    if (this.ProductWeight.toString().length === 0) {
      this.ProductWeight_errormsg = '* Please enter product weight';
      this.errormsg = true;
    } else {
      this.errormsg = false;
      if (this.UserRoleID == 2) {
        (this.IsPublished = 0),
          (this.IsApproved = 0),
          (this.CompanyID = this.currentUser.CompanyID);
      }

      var val = {
        ProductCategoryID: this.ProductCategoryID,
        ProductSubCategoryID: this.ProductSubCategoryID,
        CompanyID: this.CompanyID,
        TaxSlabID: this.TaxSlabID,
        CompanyName: this.CompanyID,
        ProductName: this.ProductName,
        ProductDescription: this.ProductDescription,
        ProductPrice: this.ProductPrice,
        ProductDiscount: this.ProductDiscount,
        ProductDiscountPrice: this.ProductDiscountPrice,
        ProductImageThumbnailImagePath: this.ProductImageThumbnailImagePath,
        ProductImageLargeImagePath: this.ProductImageLargeImagePath,
        ProductWeight: this.ProductWeight,
        IsPublished: this.IsPublished,
        IsApproved: this.IsApproved,
        CreatedBy: this.currentUser.UserID,
      };
      console.log(val);
      this.service.addproducts(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          closePopup('exampleModal');
          this.emitData.emit(false);
          showSuccessToast(JSON.parse(data['message'])[0]['message']);
        } else if (data['status_code'] == 300) {
          showDangerToast(JSON.parse(data['message'])[0]['message']);
        } else {
          showDangerToast('Some error occured, data not saved');
        }
      });
    }
  }

  updateproduct() {
    this.ProductCategory_errormsg = '';
    this.ProductSubCategory_errormsg = '';
    this.ProductName_errormsg = '';
    this.ProductDescription_errormsg = '';
    this.ProductPrice_errormsg = '';

    this.ProductDiscount_errormsg = '';
    this.ProductDiscountPrice_errormsg = '';
    this.ProductWeight_errormsg = '';
    this.ProductCompanyName_errormsg = '';
    this.ProductGST_errormsg = '';

    if (this.CompanyID.toString().length === 0) {
      this.ProductCompanyName_errormsg = '* Please enter Shop Name';
      this.errormsg = true;
    }
    if (this.TaxSlabID.toString().length === 0) {
      this.ProductGST_errormsg = "* Please select product Tax";
      this.errormsg = true;
    }

    if (this.ProductCategoryID.toString().length === 0) {
      this.ProductCategory_errormsg = '* Please select product category';
      this.errormsg = true;
    }
    if (this.ProductSubCategoryID.toString().length === 0) {
      this.ProductSubCategory_errormsg = '* Please select product subcategory';
      this.errormsg = true;
    }
    if (this.ProductName.trim().length === 0) {
      this.ProductName_errormsg = '* Please enter product name';
      this.errormsg = true;
    }
    if (this.ProductDescription.trim().length === 0) {
      this.ProductDescription_errormsg = '* Please enter product description';
      this.errormsg = true;
    }
    if (this.ProductPrice.toString().length === 0) {
      this.ProductPrice_errormsg = '* Please enter product price';
      this.errormsg = true;
    }
    if (this.ProductDiscount.toString().length === 0) {
      this.ProductDiscount_errormsg = '* Please enter product discount';
      this.errormsg = true;
    }
    if (this.ProductDiscountPrice.toString().length === 0) {
      this.ProductDiscountPrice_errormsg =
        '* Please enter product discount price';
      this.errormsg = true;
    }
    if (this.ProductWeight.toString().length === 0) {
      this.ProductWeight_errormsg = '* Please enter product weight';
      this.errormsg = true;
    } else {
      if (this.UserRoleID == 2) {
        (this.IsPublished = 0), (this.IsApproved = 0);
      }
      var val = {
        ProductID: this.ProductID,
        ProductCategoryID: this.ProductCategoryID,
        ProductSubCategoryID: this.ProductSubCategoryID,
        CompanyID: this.CompanyID,
        TaxSlabID: this.TaxSlabID,
        CompanyName: this.CompanyID,
        ProductName: this.ProductName,
        ProductDescription: this.ProductDescription,
        ProductPrice: this.ProductPrice,
        ProductDiscount: this.ProductDiscount,
        ProductDiscountPrice: this.ProductDiscountPrice,
        ProductImageThumbnailImagePath: this.ProductImageThumbnailImagePath,
        ProductImageLargeImagePath: this.ProductImageLargeImagePath,
        ProductWeight: this.ProductWeight,
        IsPublished: this.IsPublished,
        IsApproved: this.IsApproved,
        ModifiedBy: this.currentUser.UserID,
      };

      this.service.updateproducts(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          showSuccessToast(JSON.parse(data['message'])[0]['message']);

          //Closing module popup using js function
          closePopup('exampleModal');

          //sending false value to ShowCompont to destroy this component
          this.emitData.emit(false);

          this.ProductID = 0;
          this.ProductCategoryID = 0;
          this.ProductSubCategoryID = 0;
          this.CompanyID = 0;
          this.TaxSlabID = 0;
          this.ProductName = '';
          this.ProductDescription = '';
          this.ProductPrice = 0;
          this.ProductDiscount = 0;
          this.ProductDiscountPrice = 0;
          this.ProductImageThumbnailImagePath = '';
          this.ProductImageLargeImagePath = '';
          this.ProductWeight = '';
          (this.IsPublished = false),
            (this.IsApproved = false),
            (this.ModifiedBy = 0);
        } else if (data['status_code'] == 300) {
          showDangerToast(JSON.parse(data['message'])[0]['message']);
        } else {
          showDangerToast('Some error occured, data not saved');
        }
      });
    }
  }

  uploadthumbnailimage(event: File[]) {
    var file = event[0];
    const fromData: FormData = new FormData();
    fromData.append('uploaded File', file, file.name);
    this.service.uploadProductPhoto(fromData).subscribe((data: any) => {
      this.ProductImageThumbnailImagePath = data.toString();
      this.ProductImageThumbnailImageNamePath =
        this.service.PhotoUrl + this.ProductImageThumbnailImagePath;
    });
  }

  uploadlargeimage(event: File[]) {
    var file = event[0];
    const fromData: FormData = new FormData();
    fromData.append('uploaded File', file, file.name);
    this.service.uploadProductPhoto(fromData).subscribe((data: any) => {
      this.ProductImageLargeImagePath = data.toString();
      this.ProductImageLargeImageNamePath =
        this.service.PhotoUrl + this.ProductImageLargeImagePath;
    });
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

  pricecal() {
    this.ProductDiscountPrice =
      this.ProductPrice - this.ProductDiscount * (this.ProductPrice / 100);
  }
  cal() {
    this.ProductGrams = this.ProductWeight * 1000;
  }
}
