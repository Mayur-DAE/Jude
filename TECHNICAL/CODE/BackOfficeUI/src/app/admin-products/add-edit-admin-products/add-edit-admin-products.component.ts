import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

import { HttpClient } from '@angular/common/http';
declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function closePopup(id: any): any;
declare function showInfoToast(msg: any): any;

@Component({
  selector: 'app-add-edit-admin-products',
  templateUrl: './add-edit-admin-products.component.html',
  styleUrls: ['./add-edit-admin-products.component.css'],
})
export class AddEditAdminProductsComponent implements OnInit {
  filepath: string = 'Photo';
  DiscountPrice_errormsg = '';
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
  ProductUnit_errormsg = '';
  DiscountType_errormsg = '';
  errormsg = false;
  currentUser: any;
  UserRoleID: any;
  ShowMasterTable: boolean = false;
  filteredMasterProductsList: any = [];
  isImageLoaded: boolean = false;
  selectedProductImage: string | null = null;
  SelectedProductName: string = '';
  isCardClicked = false;
  filteredProducts: any[] = [];
  showSuggestions: boolean = false;
  filteredMasterProducts: any[] = [];
  selectedProductName: string = '';
  searchText: string = '';

    searchTexts: string = '';

  isDropdownOpen: boolean = false;
  Shop_ProductCategory_errormsg = '';
  Shop_ProductSubCategory_errormsg = '';

  @ViewChild('step3Section') step3Section!: ElementRef;
  @ViewChild('step2Section') step2Section!: ElementRef;

  @Input() options: any[] = [];
  @Output() emitData = new EventEmitter<boolean>();
  MasterProductImageLargeImageNamePathss: string[] | undefined;
  showprice:boolean=false;

  constructor(private service: SharedService, private_http: HttpClient) { }
  isNameSelected: any;
  CompanyNameSearch: any;
photoUrl: any =this.service.PhotoUrl 
  @Input()
  products: any;
  CompanyProductID: any;
  CompanyID: any;
  ProductPrice: any;
  DiscountType: any;
  DiscountPrice: any;
  MasterProductsList: any = [];
  MasterProductID: any;
  ProductCategoryID: any = 0;
  ProductCategoryList: any;
  ProductCategoryName: any;
  ProductSubCategoryID: any = 0;
  ProductSubCategoryList: any = [];
  ProductSubCategoryName: any;
  TaxSlabID: any;
  TaxslabList: any;
  CompanyList: any;
  CompanyName: any;
  MasterProductName: any;
  MasterProductDescription: any;
  MasterProductPrice: any;
  ProductDiscount: any;
  ProductDiscountPrice: any;
  MasterProductImageThumbnailImagePath : any;
  MasterProductImageThumbnailImageNamePath: any;
  // MasterProductImageLargeImagePath: any;
  MasterProductImageLargeImageNamePath: any;
  MasterProductUnit: any;
  ProductGrams: any;
  IsActive: any;
  CreatedBy: any;
  ModifiedBy: any;
  fileToUpload: File | null = null;
  activeLanguages: any = [];
  formSubmitted: boolean = false;
  thumbnailErrormsg = '';
  largeErrormsg = '';
  
  thumbnailError: boolean = true;
  largeError: boolean = true;

  ngOnInit(): void {
        this.currencySign();

        this.MasterProductImageLargeImageNamePaths=[];
    this.UserRoleID = this.onUserRoles();
    this.getLanguage();
   // console.log(this.UserRoleID);
   //  console.log("vijay", this.products.ProductCategoryID);
    
    this.loadProductCategoryList();
    // console.log("vijay 2", this.ProductCategoryID);
    //   console.log("ProductSubCategoryID",this.ProductSubCategoryID);

    if (this.MasterProductID != 0) {
      this.loadProductSubCategoryList();
      this.ProductSubCategoryID = this.ProductSubCategoryID;
      // this.ProductSubCategoryID = this.products.ProductSubCategoryID;
     //  console.log("ProductSubCategoryID",this.ProductSubCategoryID);
      
      this.ProductSubCategoryName = this.products.ProductSubCategoryName;
    }

    this.loadTaxSlabList();
    this.MasterProductID = this.products.MasterProductID;
    this.IsActive = this.products.IsActive;

    this.ProductCategoryID = this.ProductCategoryID;
   //  console.log("this.ProductCategoryIDprakash",this.ProductCategoryID),
    this.ProductSubCategoryID = this.ProductSubCategoryID;
    // this.ProductCategoryID = this.products.ProductCategoryID;
    // console.log("this.ProductCategoryIDprakash",this.ProductCategoryID),
    // this.ProductSubCategoryID = this.products.ProductSubCategoryID;
   //  console.log("vijay 2", this.ProductSubCategoryID);

    this.ProductSubCategoryName = this.products.ProductSubCategoryName;
    this.TaxSlabID = this.products.TaxSlabID;
    this.MasterProductName = this.products.MasterProductName;
    MasterProductDescription: this.MasterProductDescription;
    this.MasterProductPrice = this.products.MasterProductPrice;
    this.MasterProductImageThumbnailImagePath  =
      this.products.MasterProductImageThumbnailImagePath ;

      this.MasterProductImageThumbnailImageNamePath =
      this.service.PhotoUrl + 'MasterProductImage/' + this.products.MasterProductImageThumbnailImagePath;
    

      // this.MasterProductImageLargeImageNamePaths = this.products.MasterProductImageLargeImageNamePaths
    // this.MasterProductImageLargeImagePath =
    //   this.products.MasterProductImageLargeImagePath;
    this.MasterProductUnit = this.products.MasterProductUnit;
   //  console.log(this.products.MasterProductImageLargeImagePath)
   //  console.log("",this.products.MasterProductImageLargeImagePath.split(','))
    const imgarray = this.products.MasterProductImageLargeImagePath.split(',');
    // console.log("imgarray",imgarray)
    // const path = this.products.MasterProductImageLargeImagePath;
    // const imgarray = path ? path.split(',') : [];
    // console.log("imgarray", imgarray);
    this.MasterProductImageLargeImageNamePaths =imgarray ?imgarray: [];

    this.ProductGrams = this.MasterProductUnit * 1000;
    this.MasterProductImageLargeImageNamePath =
      this.service.PhotoUrl + 'MasterProductImage/' + this.products.MasterProductImageLargeImagePath;
    this.CompanyProductID = this.products.CompanyProductID;

    this.ProductPrice = this.products.ProductPrice;
    this.DiscountType = this.products.DiscountType;
    this.DiscountPrice = this.products.DiscountPrice;
    if (this.UserRoleID != 1) {
      this.CompanyID = this.currentUser.CompanyID;
      this.isCardClicked = !this.isCardClicked;
      this.MasterProductImageThumbnailImageNamePath =
        this.service.PhotoUrl +'MasterProductImage/'+
        this.products.MasterProductImageThumbnailImagePath;
    }
    if (this.CompanyProductID !== 0 && this.UserRoleID != 1) {
      this.loadCompanyNameList();
    }
    this.MasterProductImageThumbnailImagePath = null;
    
    this.loadMasterNameList();

    setTimeout(() => {
      const selectedProduct = this.MasterProductsList.find(
        (x: { MasterProductID: any }) =>
          x.MasterProductID == this.MasterProductID
      );
      this.searchText = selectedProduct
        ? selectedProduct.MasterProductName
        : '';
    }, 100);
    if (this.MasterProductPrice) {
      this.MasterProductPrice = (+this.MasterProductPrice).toFixed(2);
    }
  }
  // openModal(productPrice: any) {
  //   this.MasterProductPrice = productPrice ? (+productPrice).toFixed(2) : '';
  // }
  DiscountTypeList = [
    { type: 'Percentage', value: 'P' },
    { type: 'Value', value: 'V' },
  ];

  // roundUpDiscountPrice() {
  //   if (this.DiscountPrice !== null && this.DiscountPrice !== undefined) {
  //     // Standard rounding to 2 decimal places
  //     this.DiscountPrice = parseFloat(this.DiscountPrice.toFixed(2));
  //   }
  // }  
currency: any;
  countrydata: any = [];
showDiscountField = false;

onDiscountTypeChange() {
  this.showDiscountField = !!this.DiscountType; // Show if DiscountType is not empty  
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
  getLanguage() {
    this.service.getLanguage(null).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.activeLanguages = JSON.parse(data['message']);
        this.getMasterProductLanguage();
      } else {
        showSuccessToast('Some error occured');
      }
    });
  }

  getMasterProductLanguage() {
    if (this.MasterProductID != 0) {
      this.service
        .getmasterProductsLanguage({ MasterProductID: this.MasterProductID })
        .subscribe((data) => {
          if (data['status_code'] == 100) {
            var categoryLanguage = JSON.parse(data['message']);

            this.activeLanguages.forEach((lang: any) => {
              const categoryLang = categoryLanguage.find(
                (catLang: any) => catLang.LanguageID === lang.LanguageId
              );
              if (categoryLang) {
                lang.Name = categoryLang.MasterProductName;
                lang.Description = categoryLang.MasterProductDescription;
              }
            });
          }
        });
    }
  }

  isFieldInvalid(value: string): boolean {
    return this.formSubmitted && !value?.trim();
  }
  onUserRoles() {
    this.currentUser = localStorage.getItem('BoUser');
   //  console.log(this.currentUser);

    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      this.UserRoleID = this.currentUser.UserRoleID;
      // console.log(this.UserRoleID);
      return this.UserRoleID;
    }
  }

  loadProductSubCategoryList() {
    this.ProductSubCategoryList = []
    let val = { ProductCategoryID: this.ProductCategoryID, IsActive: 1 };
   //  console.log(" let val", val);

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

  loadTaxSlabList() {
    let val = { IsActive: 1 };
    this.service.GetTaxSlabs(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.TaxslabList = JSON.parse(data['message']);
      }
    });
  }

  uploadthumbnailimage(event: File[]) {
    this.MasterProductImageThumbnailImageNamePath =
      this.service.PhotoUrl + 'MasterProductImage/'+
      this.products.MasterProductImageThumbnailImagePath;
    this.MasterProductImageThumbnailImagePath =
      this.products.MasterProductImageThumbnailImagePath;
    this.thumbnailErrormsg = '';
    this.thumbnailError = false;

    // if (!event || event.length === 0) {
    //   this.thumbnailError = 'No file selected.';
    //   return;
    // }
    var file = event[0];
    if (file !== undefined) {
      if (!file.type.startsWith('image/')) {
        this.thumbnailErrormsg = 'Please upload a valid image file.';
        this.thumbnailError = true;
        return;
      }
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
       //  console.log(img.width, img.height);
        if (img.width === 220 && img.height === 220) {
          this.thumbnailErrormsg = '';
          this.thumbnailError = false;

          const fromData: FormData = new FormData();
          const basepath = 'Photos/MasterProductImage';
          fromData.append('uploaded File', file, file.name);
          fromData.append('basepath', basepath);

          this.service.uploadProductPhoto(fromData).subscribe((data: any) => {
            this.MasterProductImageThumbnailImagePath = data.toString();
           //  console.log(this.MasterProductImageThumbnailImagePath);

            this.MasterProductImageThumbnailImageNamePath =
              this.service.PhotoUrl+ 'MasterProductImage/' + this.MasterProductImageThumbnailImagePath;
            // console.log(this.MasterProductImageThumbnailImageNamePath);
          });
        } else {
          this.thumbnailErrormsg = 'Image dimensions must be 220x220 pixels.';
          this.thumbnailError = true;
        }
      };
      img.onerror = () => {
        this.thumbnailErrormsg = 'Invalid image file. Please try again.';
        this.thumbnailError = true;
      };
    };
    if (file !== undefined) {
      reader.readAsDataURL(file);
    }
  }
  // MasterProductImageLargeImagePaths: string[] = []; 
  // MasterProductImageLargeImageNamePaths: string[] = []; 

  MasterProductImageLargeImagePath: string = '';
MasterProductImageLargeImagePaths: string[] = [];
MasterProductImageLargeImageNamePaths: string[] = [];



uploadlargeimage(files: File[]) {
 const newImages = files; 
  if ((this.MasterProductImageLargeImageNamePaths.length + newImages.length) >= 6) {
    this.largeErrormsg = `You can upload only 5 images in total`;
    return;
  }
    
  for (let file of files) {
    this.largeErrormsg = '';
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name); 
    const basepath = 'Photos/MasterProductImage';
    formData.append('basepath', basepath);

    this.service.uploadProductPhoto(formData).subscribe(
      (data: any) => {
        const imageName = data.imagePath || data;
       //  console.log('Image uploaded:', imageName);
        if (imageName) {
          this.MasterProductImageLargeImagePaths.push(imageName);
            
          const fullImageUrl =   imageName;
          this.MasterProductImageLargeImageNamePaths.push(fullImageUrl);
        }
      },
      (error) => {
        console.error('Upload error:', error);
      }
    );
  }
}

  addMasterproduct() { 
console.log("this.MasterProductImageLargeImageNamePaths",this.MasterProductImageLargeImageNamePaths.length);
    
    this.ProductCategory_errormsg = '';
    this.ProductSubCategory_errormsg = '';
    this.ProductGST_errormsg = '';
    this.ProductName_errormsg = '';
    this.ProductDescription_errormsg = '';
    this.ProductPrice_errormsg = '';
    this.ProductUnit_errormsg = '';
    this.formSubmitted = true;
    // this.largeErrormsg = '';
    this.errormsg = false;

    // Check if form is valid
    const isValid = this.activeLanguages.every(
      (lang: any) => lang.Name?.trim() && lang.Description?.trim()
    );

  // Check for Category
  if (!this.ProductCategoryID || this.ProductCategoryID.toString().trim() === '') {
    this.ProductCategory_errormsg = 'Please select product category';
    this.errormsg = true;
  }

  // Check for Sub-Category
  if (!this.ProductSubCategoryID || this.ProductSubCategoryID.toString().trim() === '') {
    this.ProductSubCategory_errormsg = 'Please select product subcategory';
    this.errormsg = true;
  }
    if (this.TaxSlabID.toString().length === 0) {
      this.ProductGST_errormsg = 'Please select VAT';
      this.errormsg = true;
    }
    if (this.MasterProductName.trim().length === 0) {
      this.ProductName_errormsg = 'Please enter product name';
      this.errormsg = true;
    }
    // if (this.MasterProductDescription.trim().length === 0) {
    //   this.ProductDescription_errormsg = '* Please Enter Product Description';
    //   this.errormsg = true;
    // }

    if (
      !this.MasterProductPrice ||
      this.MasterProductPrice.toString().trim() === ''
    ) {
      this.ProductPrice_errormsg = 'Please enter price';
      this.errormsg = true;
    } else if (
      !/^[1-9]\d*(\.\d+)?$/.test(this.MasterProductPrice.toString().trim())
    ) {
      this.ProductPrice_errormsg = 'Invalid price';
      this.errormsg = true;
    } else {
      this.ProductPrice_errormsg = '';
    }

    if (this.MasterProductUnit.toString().length === 0) {
      this.ProductUnit_errormsg = 'Please enter product unit';
      this.errormsg = true;
    }
   //  console.log("thumbnailErrormsg",this.thumbnailErrormsg);

    if (
      this.thumbnailError ||
      this.MasterProductImageThumbnailImagePath ===
      this.products.MasterProductImageThumbnailImagePath
    ) {
      // console.log("thisproducts.MasterProductImageThumbnailImagePath",this.products.MasterProductImageThumbnailImagePath)
      this.thumbnailErrormsg = 'Please Upload Thumbnail Image';
     //  console.log(this.thumbnailErrormsg);
    }


      if (this.MasterProductImageLargeImageNamePaths.length <= 1) {     
      this.largeErrormsg = 'Minimum 1 Image is required';
      // console.log(this.thumbnailErrormsg);
      this.errormsg = true;
    }




    if (this.errormsg === false && this.thumbnailErrormsg === '' && this.largeErrormsg === '') {
      var val = {
        ProductCategoryID: this.ProductCategoryID,
        ProductSubCategoryID: this.ProductSubCategoryID,
        TaxSlabID: this.TaxSlabID,
        MasterProductName: this.MasterProductName,
        MasterProductDescription: this.MasterProductDescription || '', // Allow empty description
        MasterProductPrice: this.MasterProductPrice,
        MasterProductImageThumbnailImagePath:
          this.MasterProductImageThumbnailImagePath,
        // MasterProductImageLargeImagePath: this.MasterProductImageLargeImagePath,
        MasterProductImageLargeImagePath: this.MasterProductImageLargeImagePaths.join(','),
        MasterProductUnit: this.MasterProductUnit,
        IsActive: this.IsActive,
        CreatedBy: this.UserRoleID,
      };
     //  console.log("vsl",val);

      this.service.addmasterproducts(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          closePopup('exampleModal');
          this.emitData.emit(false);

          var categoryID: number = JSON.parse(data['message'])[0]['identity'];

          const payload = {
            CaptionDetails: this.activeLanguages,
            MasterProductID: categoryID, // Captured Name & Description
          };

          this.service
            .addmasterProductsLanguage(payload)
            .subscribe((data_language) => {
             //  console.log(data_language);

              // if (data_language['status_code'] == 100) {
              //   showSuccessToast(JSON.parse(data_language['message']));
              //   console.log(JSON.parse(data_language['message']));

              // }
              // else {
              //   showSuccessToast('Some error occured, data not saved');
              // }
            });

          showSuccessToast(JSON.parse(data['message'])[0]['message']);
        } else if (data['status_code'] == 300) {
          showDangerToast(JSON.parse(data['message'])[0]['message']);
        } else if (data['status_code'] == 200) {
          showDangerToast(JSON.parse(data['message'])[0]['message']);
        } else {
          showDangerToast('Some error occured, data not saved');
        }
      });
    }
  }

  loadMasterNameList() {
    let val = {
      ProductCategoryID: this.ProductCategoryID,
      ProductSubCategoryID: this.ProductSubCategoryID,
      IsActive: true,
    };
   //  console.log("Murtaza val", val);
    this.service.getmasterproductsList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.MasterProductsList = JSON.parse(data['message']);

//         const imageString = this.MasterProductsList[0].MasterProductImageLargeImagePath;
// const imageArray = imageString ? imageString.split(',') : [];

// this.MasterProductImageLargeImageNamePaths = imageArray.map((img: string) => this.service.PhotoUrl + img
// );

      }
      if (data['status_code'] == 200) {
        this.MasterProductsList = JSON.parse(data['message']);
      }
    });
  }



  loadMasterPrice() {
    let val = { MasterProductID: this.MasterProductID, IsActive: true };
   //  console.log(val);
    this.service.getmasterproductsList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.MasterProductsList = JSON.parse(data['message']);
       //  console.log("qwertyui", data);
        this.ProductPrice = this.MasterProductsList[0].MasterProductPrice;
       //  console.log(" this.ProductPrice", this.ProductPrice);

      }
      if (data['status_code'] == 200) {
        this.MasterProductsList = JSON.parse(data['message']);
        // console.log("datatabyvijayyy", JSON.parse(data));

      }
    });
  }



  loadMasterImage() {
    this.showprice=true;

    this.loadMasterPrice();
    const val = { 
      MasterProductID: this.MasterProductID, 
      IsActive: true };
    this.service.getmasterproductsList(val).subscribe((data) => {
     //  console.log("loadMasterImage",data);
      if ([100, 200].includes(data?.status_code)) {
        const products = JSON.parse(data.message);
        // console.log("vijayprod",products);
        
        this.MasterProductImageThumbnailImagePath = products.length
          ? this.service.PhotoUrl + 'MasterProductImage/'+
            products[0].MasterProductImageThumbnailImagePath
          : null;
        this.updateSelectedProductName();
      }
    });
  }
  searchProduct() {
    this.showpricediscount=false;
   //  console.log("ProductCategoryID on search",this.ProductCategoryID);
   //  console.log("ProductSubCategoryID on search",this.ProductSubCategoryID);
   //  console.log("Searchtext on search",this.searchText);
   //  console.log("this.CompanyID",this.CompanyID);

    const val = {
      CompanyID:  this.CompanyID,
      ProductCategoryID: this.ProductCategoryID, 
      ProductSubCategoryID: this.ProductSubCategoryID,
      MasterProductName: this.searchTexts?.trim() || null,
      // IsActive: true 
    };

    this.service.getmasterproductsListforcompany(val).subscribe((data) => {
      if(data.status_code === 100){
        
                this.MasterProductsList = JSON.parse(data['message']);

      this.showprice=true;
      this.MasterProductsList = this.MasterProductsList; // Set response data to table
        setTimeout(() => {
    this.scrollToStep2();
  }, 100);
   
  }
else if (data['status_code'] === 200) {
      this.MasterProductsList = []; // Explicitly set empty list
            this.showprice=true;
                    setTimeout(() => {
    this.scrollToStep2();
  }, 100);

    } else {
      this.MasterProductsList = [];
      console.warn('Unhandled status code:', data['status_code']);
    }
});
  }
selectedProduct: any = null;
discount: number | null = null;
showpricediscount:boolean=false;
// selectproduct(data: any) {
//   this.showpricediscount=true;
//   this.selectedProduct=data;
 
// }
selectproduct(data: any) {
  // If already selected, unselect it
  if (this.selectedProductId === data.MasterProductID) {
    this.showpricediscount = false;
    this.selectedProduct = null;
    this.selectedProductId = null;
  } else {
    // New selection
    this.showpricediscount = true;
    this.selectedProduct = data;
    this.selectedProductId = data.MasterProductID;

    // Scroll to next step
    setTimeout(() => {
      this.scrollToStep3();
    }, 100);
  }
}

scrollToStep2() {
  if (this.step2Section) {
    this.step2Section.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
scrollToStep3() {
  if (this.step3Section) {
    this.step3Section.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}

  clearproductfields() {
    this.showprice=false;
    this.showpricediscount=false;
    this.MasterProductImageThumbnailImagePath = null;
    this.ProductCategoryID = 0;
    this.ProductSubCategoryID = 0;
    this.searchText = '';
    this.SelectedProductName = '';
    this.ProductPrice = null;
    this.MasterProductName = null;
    this.selectedProductName = '';
    this.SelectedProductName = '';
    this.filteredMasterProducts = [];
    this.MasterProductsList = [];
    this.loadMasterNameList();
    this.searchTexts ='';
  }

  updateSelectedProductName() {
    const selectedProduct = this.MasterProductsList.find(
      (x: { MasterProductID: any }) => x.MasterProductID == this.MasterProductID
    );
    this.SelectedProductName = selectedProduct
      ? selectedProduct.MasterProductName
      : '';
   //  console.log("this.SelectedProductName", this.SelectedProductName);

  }

  toggleCardDetails() {
    this.isCardClicked = true;
    // this.isCardClicked = !this.isCardClicked;
  }

  // filterMasterProducts() {
  //   this.filteredMasterProducts = this.MasterProductsList.filter(
  //     (product: { ProductCategoryID: any; ProductSubCategoryID: any }) => {
  //       if (this.ProductCategoryID && this.ProductSubCategoryID) {
  //         return (
  //           product.ProductCategoryID == this.ProductCategoryID &&
  //           product.ProductSubCategoryID == this.ProductSubCategoryID
  //         );
  //       } else if (this.ProductCategoryID) {
  //         return product.ProductCategoryID == this.ProductCategoryID;
  //       } else if (this.ProductSubCategoryID) {
  //         return product.ProductSubCategoryID == this.ProductSubCategoryID;
  //       }
  //       return true;
  //     }
  //   );
  //   if (this.searchText) {
  //     this.filteredMasterProducts = this.filteredMasterProducts.filter(
  //       (product) =>
  //         product.MasterProductName.toLowerCase().includes(
  //           this.searchText.toLowerCase()
  //         )
  //     );
  //   }
  // }

  filterMasterProducts() {
    let products = [...this.MasterProductsList]; // Shallow copy to avoid mutating original
   //  console.log("let products", products);
    let products_dummy = [];
    // Category/SubCategory filter
    if (this.ProductCategoryID && this.ProductSubCategoryID) {
     //  console.log("vijay1");

      products_dummy = products.filter(
        (product) =>
          product.ProductCategoryID == this.ProductCategoryID &&
          product.ProductSubCategoryID == this.ProductSubCategoryID
      );
     //  console.log("let category subcategory", this.ProductSubCategoryID, this.ProductCategoryID);
     //  console.log("let products222", products);
    } else if (this.ProductCategoryID) {
     //  console.log("vijay2");
      products_dummy = products.filter(
        (product) => product.ProductCategoryID == this.ProductCategoryID
      );
    } else if (this.ProductSubCategoryID) {
     //  console.log("vijay3");
      products_dummy = products.filter(
        (product) => product.ProductSubCategoryID == this.ProductSubCategoryID
      );
    }

    // Text filter
    if (this.searchText?.trim()) {
      products_dummy = products_dummy.filter((product) =>
        product.MasterProductName.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    this.filteredMasterProducts = products_dummy;
   //  console.log("this.filteredMasterProducts ", this.filteredMasterProducts);

  }


  onMasterProductFocus() {
    this.filterMasterProducts();
  }

  selectMasterProduct(product: any) {
    this.searchText = product.MasterProductName;
    this.MasterProductID = product.MasterProductID;
    this.showSuggestions = false;
  }

  hideSuggestions() {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }
selectedProductId: number | null = null;

  addCompanyProduct() {
    this.ProductName_errormsg = '';
    this.ProductPrice_errormsg = '';
    this.DiscountPrice_errormsg = '';
    this.ProductDiscount_errormsg = '';
    this.ProductDiscountPrice_errormsg = '';
    this.DiscountType_errormsg = '';
    this.Shop_ProductCategory_errormsg = '';
    this.Shop_ProductSubCategory_errormsg = '';
    this.errormsg = false;


 if (this.ProductCategoryID.toString().length === 0) {
      this.Shop_ProductCategory_errormsg = 'Please select product category';
      this.errormsg = true;
    }
    if (this.ProductSubCategoryID.toString().length === 0) {
      this.Shop_ProductSubCategory_errormsg = 'Please select product sub-category';
      this.errormsg = true;
    }


  // Discount validations
  if (this.DiscountType) {
    const discountValue = Number(this.discount);
    const productPrice = Number(this.ProductPrice);

    if (this.discount === null || this.discount === undefined || this.discount.toString().trim() === '') {
      this.ProductDiscount_errormsg = 'Please enter discount value';
      this.errormsg = true;
    } else if (this.DiscountType === 'V') {
      if (discountValue < 0) {
        this.ProductDiscount_errormsg = 'Discount value cannot be negative';
        this.errormsg = true;
      } else if (discountValue > productPrice) {
        this.ProductDiscount_errormsg = 'Discount cannot be greater than product price';
        this.errormsg = true;
      } else {
        this.ProductDiscount_errormsg = '';
      }
    } else {
      this.ProductDiscount_errormsg = '';
    }
  }

    // if (!this.MasterProductID || this.MasterProductID === 0) {
    //   this.Shop_ProductCategory_errormsg = 'Please select product category';
    //   this.errormsg = true;
    // }
    // else{
    //   this.Shop_ProductCategory_errormsg = '';
    // }

    // if (!this.MasterProductID || this.MasterProductID === 0) {
    //   this.Shop_ProductSubCategory_errormsg =
    //     'Please select product sub-category';
    //   this.errormsg = true;
    // }

    // if (this.MasterProductID === 0) {
    //   this.ProductName_errormsg = 'Please select product name';
    //   this.errormsg = true;
    // }

    // if (this.ProductPrice == 0) {
    //   this.ProductPrice_errormsg = 'Please select product price';
    //   this.errormsg = true;
    // }

    // if (!this.DiscountTypeList.some(discount => discount.value === this.DiscountType)) {
    //   this.DiscountType_errormsg = '* Please Select Discount Type';
    //   console.log(this.DiscountType);
    //   this.errormsg = true;
    // }

   //  console.log("this.DiscountType",this.DiscountType);
    
    if (this.DiscountType === 'V' && this.DiscountPrice > this.ProductPrice) {
      this.DiscountPrice_errormsg =
        "Discount Price can't be greater than Base Price";
      this.errormsg = true;
    }
    if (this.DiscountType === 'P' && this.DiscountPrice > 100) {
      this.DiscountPrice_errormsg =
        "Discount Percentage can't be greaater the 100%";
      this.errormsg = true;
    }
    if (this.DiscountType === 'V' && this.DiscountPrice < 0) {
      this.DiscountPrice_errormsg =
        "Discount price cannot be a negative value.";
      this.errormsg = true;
    }
    if (this.DiscountType === 'P' && this.DiscountPrice < 0) {
      this.DiscountPrice_errormsg =
        "Discount price cannot be a negative value."
      this.errormsg = true;
    }

    // if (this.errormsg === false && this.DiscountType)
    if (!this.errormsg) {
     //  console.log(this.CompanyID);

      var val = {
        MasterProductID: this.MasterProductID,
        CompanyID: this.CompanyID,
        ProductPrice: this.selectedProduct.MasterProductPrice,
        DiscountType: this.DiscountType,
        DiscountPrice: this.discount,
        IsActive: this.IsActive,
        CreatedBy: this.UserRoleID,
      };
     //  console.log("vijay", val);

      this.service.addcompanyproducts(val).subscribe((data) => {
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

  updateMasterproduct() {
   //  console.log("this.products",this.products);
    // Check if form is valid
    const isValid = this.activeLanguages.every((lang: any) =>
      lang.Name?.trim()
    );

    this.ProductCategory_errormsg = '';
    this.ProductSubCategory_errormsg = '';
    this.ProductName_errormsg = '';
    this.ProductDescription_errormsg = '';
    this.ProductPrice_errormsg = '';
    this.ProductWeight_errormsg = '';
    this.ProductGST_errormsg = '';
    this.errormsg = false;

    if (this.TaxSlabID.toString().length === 0) {
      this.ProductGST_errormsg = 'Please select product VAT';
      this.errormsg = true;
    }

    if (this.ProductCategoryID.toString().length === 0) {
      this.ProductCategory_errormsg = 'Please select product category';
      this.errormsg = true;
    }
    if (this.ProductSubCategoryID.toString().length === 0) {
      this.ProductSubCategory_errormsg = 'Please select product sub-category';
      this.errormsg = true;
    }
    if (this.MasterProductName.trim().length === 0) {
      this.ProductName_errormsg = '* Please enter product name';
      this.errormsg = true;
    }
    // if (this.MasterProductDescription.trim().length === 0) {
    //   this.ProductDescription_errormsg = '* Please enter product description';
    //   this.errormsg = true;
    // }
    if (this.MasterProductPrice.toString().length === 0) {
      this.ProductPrice_errormsg = 'Please enter product price';
      this.errormsg = true;
    }
    if (
      !this.MasterProductPrice ||
      this.MasterProductPrice.toString().trim() === ''
    ) {
      this.ProductPrice_errormsg = 'Please enter price';
      this.errormsg = true;
    } else if (
      !/^[1-9]\d*(\.\d+)?$/.test(this.MasterProductPrice.toString().trim())
    ) {
      this.ProductPrice_errormsg = 'Invalid price';
      this.errormsg = true;
    } else {
      this.ProductPrice_errormsg = '';
    }

    if (this.MasterProductUnit.toString().length === 0) {
      this.ProductWeight_errormsg = 'Please enter product weight';
      this.errormsg = true;
    }  


     

      if (  
     this.MasterProductImageLargeImageNamePaths.length<=0
    ) {     
      this.largeErrormsg = 'Minimum 1 Image is required';
     //  console.log(this.thumbnailErrormsg);
      this.errormsg = true;
    }

    if (this.errormsg === false && this.thumbnailErrormsg === '' && this.largeErrormsg === '') {
      var val = {
        MasterProductID: this.MasterProductID,
        MasterProductName: this.MasterProductName,
        MasterProductDescription: this.MasterProductDescription || '', 
        MasterProductPrice: this.MasterProductPrice,
        TaxSlabID: this.TaxSlabID,
        ProductCategoryID: this.ProductCategoryID,
        ProductSubCategoryID: this.ProductSubCategoryID,
        MasterProductImageThumbnailImagePath:
          this.MasterProductImageThumbnailImagePath,
          
        // MasterProductImageLargeImagePath: this.MasterProductImageLargeImagePath.join(','),
        MasterProductImageLargeImagePath: this.MasterProductImageLargeImageNamePaths.join(','),
        
        

        MasterProductUnit: this.MasterProductUnit,
        IsActive: this.IsActive,
        ModifiedBy: this.currentUser.UserID,
      };

      this.service.updatemasterproducts(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          const payload = {
            CaptionDetails: this.activeLanguages,
            MasterProductID: this.MasterProductID, // Captured Name & Description
          };

          this.service
            .addmasterProductsLanguage(payload)
            .subscribe((data_language) => { });
          showSuccessToast(JSON.parse(data['message'])[0]['message']);
          //Closing module popup using js function
          closePopup('exampleModal');

          //sending false value to ShowCompont to destroy this component
          this.emitData.emit(false);

          this.MasterProductID = 0;
          this.ProductCategoryID = 0;
          this.ProductSubCategoryID = 0;
          this.MasterProductName = '';
          this.MasterProductDescription = '';
          this.MasterProductPrice = 0;
          this.MasterProductImageThumbnailImagePath = '';
          this.MasterProductImageLargeImagePath = '';
          this.MasterProductUnit = '';
          this.activeLanguages = [];
          this.IsActive = false;
        } else if (data['status_code'] == 300) {
          showDangerToast(JSON.parse(data['message'])[0]['message']);
        } else {
          showDangerToast('Some error occured, data not saved');
        }
      });
    }
  }

  updateCompanyproduct() {
    this.ProductCategory_errormsg = '';
    this.ProductSubCategory_errormsg = '';
    this.ProductName_errormsg = '';
    this.ProductDescription_errormsg = '';
    this.ProductPrice_errormsg = '';
    this.ProductWeight_errormsg = '';
    this.ProductGST_errormsg = '';
    this.errormsg = false;

    if (this.DiscountType == 'V' && this.DiscountPrice > this.ProductPrice) {
      this.DiscountPrice_errormsg =
        "Discount Price can't be greater than Base Price";
      this.errormsg = true;
    }
    if (this.DiscountType === 'P' && this.DiscountPrice > 100) {
      this.DiscountPrice_errormsg =
        "Discount Percentage can't be greater the 100%";
      this.errormsg = true;
    }

    if (this.errormsg === false) {
      var val = {
        CompanyProductID: this.CompanyProductID,
        MasterProductID: this.MasterProductID,
        CompanyID: this.CompanyID,
        ProductPrice: this.ProductPrice,
        DiscountType: this.DiscountType,
        DiscountPrice: this.DiscountPrice,
        IsActive: this.IsActive,
        ModifiedBy: this.currentUser.UserID,
      };

      this.service.updatecompanyproducts(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          showSuccessToast(JSON.parse(data['message'])[0]['message']);

          //Closing module popup using js function
          closePopup('exampleModal');

          //sending false value to ShowCompont to destroy this component
          this.emitData.emit(false);

          (this.CompanyProductID = 0),
            (this.MasterProductID = 0),
            (this.ProductPrice = 0),
            (this.DiscountType = ''),
            (this.DiscountPrice = 0),
            (this.IsActive = false);
        } else if (data['status_code'] == 300) {
          showDangerToast(JSON.parse(data['message'])[0]['message']);
        } else {
          showDangerToast('Some error occured, data not saved');
        }
      });
    }
  }
  loadCompanyNameList() {
    let val = { CompanyProductID: this.CompanyProductID };
   //  console.log(val, 'func');

    this.service.getcompanyproductsList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.MasterProductsList = JSON.parse(data['message']);
       //  console.log(data, 'if');
      }
      if (data['status_code'] == 200) {
        this.MasterProductsList = JSON.parse(data['message']);
      }
    });
  }



 deleteLargeImage(index: number): void {
  this.MasterProductImageLargeImageNamePaths.splice(index, 1);
  this.MasterProductImageLargeImagePaths.splice(index, 1); // If you maintain a second array for full paths
 //  console.log('Updated MasterProductImageLargeImagePaths:', this.MasterProductImageLargeImagePaths);
}

  

isPercentageSelected: boolean = true; // set this based on user selection

onDiscountInput() {
  if (this.discount !== null && this.discount < 0) {
    this.discount = 0;
  }

  if (this.isPercentageSelected && this.discount !== null && this.discount > 100) {
    this.discount = 100;
  }
  
}


}



