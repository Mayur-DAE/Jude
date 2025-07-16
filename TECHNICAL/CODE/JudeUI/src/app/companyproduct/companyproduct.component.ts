import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';

declare const incrementCartCount: any;
declare const decrementCartCount: any;
declare function resetCartCount(): any;
declare function showSuccess(message: any): any;
declare function showError(message: any): any;
declare function closePopup(id: any): any;
declare function openPopup(id: any): any;
declare function showInfo(message: any): any;

@Component({
  selector: 'app-companyproduct',
  templateUrl: './companyproduct.component.html',
  styleUrls: ['./companyproduct.component.css'],
})
export class CompanyproductComponent implements OnInit {
  @Input() someInput: string = '';
  incrementCartCountDoIt = false;
  decrementCartCountDoIt = false;
  CompanyImageNamePath: string = '';

  constructor(
    private service: SharedService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private_http: HttpClient
  ) { }
  selectedTab: string = 'shop'; // Default active tab is 'Shop'

  companyname: any;
  BusinessTypeID: any;
  CompanyMobileNo1: any;
  CartProductsList: [] = [];
  ProductLargeimageNamePath: any;
  productList: any = [];
  companydata: any;
  companylist: any = [];
  CompanyID: any;
  UserID = 0;
  CartID: any;
  ProductID: any;
  ProductPrice: any;
  Quantity: any;
  length: any;
  selectedLanguageId: string | null = '';

  ProductDescName: any;
  ProductDescCompanyName: any;
  ProductDescCancelAmt: any;
  ProductDescamt: any;
  ProductDesDescription: any;
  ProductImageNamePath: any;
  uniqueValues: Set<string> = new Set<string>();
  uniquecategory: any = [];
  categoryList: any = [];
  CompanyProductNameSearch: string = '';
  productListWithoutFilter: any = [];
  paginatedProducts: any[] = [];
  itemsPerPage: number = 50;
  currentPage: any;
  totalItems: any;
  SortBy: any = 'Featured';
  selectedDataItem: any = null;
  ratingandreviewsList: any;
  lengthofrating: any;
 ratingandreviewsempty: any = 0; // or false
  CustomerCompanyRating: any = null;
  CustomerRatingDescription = '';
  currentUser: any;
  CustomerName: any;
  IsPublished: any = null;
  isReviewModalVisible: boolean = false;
  starError: boolean = false;
  textError: boolean = false;
  uniqueCategories: any = [];
  isReviewModalOpen: boolean = false;
  blankstar: boolean = false;
  reviewInfo: any = [];
  reviewPresent: boolean = false;
  reviewloop: any = [];
  reviewloop1: any = [];
  WebsiteURL: any;
  CompanyEmailid: any;
  FacbookID: any;
  YouTube: any;
  Twitter: any;
  Linkedin: any;
  WordPress: any;
  Pintrest: any;
  CompanyMobileNo2: any;
  companyreviewPresent: boolean = false;
  sumofcompanyrating: any;
  avgofcompanyrating: any;
  countrydata: any = [];
  currency: any;
  iconClass: any = {
    0: 'bi bi-star',
    0.5: 'bi bi-star-half',
    1: 'bi bi-star-fill'
  };

  stars: any[] = [0, 0, 0, 0, 0];
  newshopprod: any = [];
selectedImage: string | null = null;
 defaultImage!: string;
  ngOnInit(): void {

    
    this.CartID = localStorage.getItem('CartID');
    // 

    this.CompanyID = this.service.getCompanyID();

    // 

    this.refreshCompanydata().then((res) => this.refreshCompanyProduct());
    this.refreshcartProductsList();
    //this.refreshCompanyProduct();
    //this.refreshCompanydata();

    this.itemsPerPage = this.itemsPerPage;
    // this.setPage(this.currentPage);
    // 

    // 
    

    this.currentPage = 1;
 this.defaultImage = this.ProductImageNamePath + 'anonymous.png';

    this.ProductImageNamePath = this.service.PhotoUrl+ 'MasterProductImage/';
    this.CompanyImageNamePath = this.service.PhotoUrl + 'listing/';
    this.userInfo();
    this.companyReview();
    this.selectedLanguageId = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : "1";
  // Listen for modal close events
  this.listenForModalClose('reviewModal');
  this.listenForModalClose('aboutusModal');

  


  }

  // onImageError(event: any) {
  //   event.target.src = this.defaultImage;
  // }

  listenForModalClose(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.selectedTab = 'shop'; // Reset tab to Shop when modal closes
      });
    }
  }

  userInfo() {
    this.currentUser = localStorage.getItem('currentUser');
    // 

    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      // 

      if (this.currentUser.LastName != null) {
        this.CustomerName =
          this.currentUser.FirstName + ' ' + this.currentUser.LastName;
        // 
      } else {
        this.CustomerName =
          this.currentUser.FirstName
        // 
      }
      this.UserID = this.currentUser.UserID;

    }
  }

  ngOnChanges() {
    this.CompanyID = this.service.getCompanyID();
    this.refreshCompanydata().then((res) => this.refreshCompanyProduct());
    // this.refreshcartProductsList();
  }

  // closePopup(id: string): void {
  //   const modalElement = document.getElementById(id);
  //   const backdropElement = document.querySelector('.modal-backdrop') as HTMLElement;
  //   if (modalElement) {
  //     modalElement.classList.remove('show');
  //     modalElement.style.display = 'none';

  //     modalElement.setAttribute('aria-hidden', 'true');
  //     modalElement.removeAttribute('aria-modal');
  //     modalElement.removeAttribute('role');
  //     document.body.classList.remove('modal-open');
  //   }
  //   if (backdropElement) {
  //     backdropElement.classList.remove('fade', 'show');
  //     backdropElement.style.display = 'none';
  //   }
  // }

  refreshCompanydata() {
    return new Promise((resolve: any, reject: any) => {
      this.selectedLanguageId = localStorage.getItem('selectedLanguage') || "1";

      if (this.CompanyID != 0) {
        var val: any = { CompanyID: this.CompanyID, LanguageID: this.selectedLanguageId };
        // 

        this.service.getCompanyName(val).subscribe((data) => {
          if (data['status_code'] == 100) {
            this.companydata = JSON.parse(data['message']);
            // 

            this.BusinessTypeID = this.companydata[0].BusinessTypeID;
            this.companyname = this.companydata[0].CompanyName;
            // 

            this.CompanyMobileNo1 = this.companydata[0].CompanyMobileNo1;
            this.CompanyMobileNo2 = this.companydata[0].CompanyMobileNo2;
            this.CompanyID = this.companydata[0].CompanyID;
            // 
            this.WebsiteURL = this.companydata[0].WebsiteURL;
            // 
            this.CompanyEmailid = this.companydata[0].CompanyEmailid;
            // 
            this.FacbookID = this.companydata[0].FacbookID;
            this.YouTube = this.companydata[0].YouTube;
            this.Twitter = this.companydata[0].Twitter;
            this.Linkedin = this.companydata[0].Linkedin;
            this.WordPress = this.companydata[0].WordPress;
            this.Pintrest = this.companydata[0].Pintrest;




            resolve();
          }
        });
      }
    });
  }

  getQuantity(ProductID: any): number {
    // 

    for (let i = 0; i < this.CartProductsList.length; i++) {
      //
      if (this.CartProductsList[i]['CompanyProductID'] == ProductID) {
        //

        return this.CartProductsList[i]['Quantity'];
      }
    }
    return 0;
  }

  refreshcartProductsList() {
    // this.CartProductsList = [];
    this.selectedLanguageId = localStorage.getItem('selectedLanguage') || "1";
    var val: any = {
      LanguageID: this.selectedLanguageId
    };
    val.CartID = localStorage.getItem('CartID');

    // 

    this.service.getCartProducts(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.CartProductsList = JSON.parse(data['message']);
        // 

        this.length = this.CartProductsList.length;
        // 
        // Update the cart count in the shared service
        this.service.updateCartCount(this.length);
        // 
      }
    });
  }

  refreshCompanyProduct() {
    if (this.selectedLanguageId !== null) {
      var val: any = {
        CompanyID: this.service.getCompanyID(),
        IsActive: true,
        LanguageID: this.selectedLanguageId
      };
      // if (this.CompanyID?.toString().length !== 0) {
      //   val.CompanyID = this.CompanyID;
      // }
      this.currencySign();
      this.service.getcompanyproductsListforshop(val).subscribe((data) => {
        // 
        // 

        if (data['status_code'] == 100) {
          this.productList = JSON.parse(data['message']);
          // this.productList = this.productList.map((product: { ProductPrice: number; }) => ({
          //   ...product,
          //   ProductPrice: parseFloat(product.ProductPrice.toFixed(2))
          // }));
          // console.log(this.productList);
          
          this.productListWithoutFilter = this.productList;          
          this.totalItems = this.productList.length;
          this.setPage(1);
          this.uniqueCategories = this.productList
            .map((product: { ProductCategoryShortName: any; }) => product.ProductCategoryShortName)
            .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);

          // 
        }
        if (data['status_code'] == 200) {
          // 

        }
      });
    }
  }
addCartCompanyData:any;
  // addcart(item: any) {
  //   this.newshopprod=item;
  //   console.log(this.newshopprod,item,localStorage.getItem('CartID'));
  //        var val2 = {
  //       CompanyID: item.CompanyID
  //     };
  //     this.service.getCompanyList(val2).subscribe((res:any)=>{
  //       this.addCartCompanyData=JSON.parse(res['message'])
  //        console.log("companydatabyvijay",this.addCartCompanyData);
  //     })
  //   if (localStorage.getItem('CartID') === null) {

  //     var val = {
  //       UserID: this.UserID,
  //       CompanyID: item.CompanyID,
  //     };
  
  //     this.service.addCart(val).subscribe((data) => {
  //       if (data['status_code'] == 100) {
  //         this.CartID = JSON.parse(data['message'])[0]['identity'];
  //         localStorage.setItem('CartID', this.CartID);
  //         localStorage.setItem('CompanyID', item.CompanyID);

  //         this.addproduct(item);

  //         //alert(JSON.parse(data['message'])[0]['message']);
  //       } else if (data['status_code'] == 300) {
  //         alert(JSON.parse(data['message'])[0]['message']);
  //       } else {
  //         alert('Some error occured, data not saved');
  //       }
  //     });
  //   } else {
  //     if (localStorage.getItem('CompanyID') == item.CompanyID) {
  //       // 

  //       let quantity = this.getQuantity(item.CompanyProductID);
  //       // console.log(quantity, 'quantity')
  //       if (quantity == 0) {
  //         ;

  //         this.addproduct(item);
  //         this.refreshCompanyProduct();
  //         this.refreshcartProductsList();
  //       } else {
  //         let CartProductID;
  //         for (let i = 0; i < this.CartProductsList.length; i++) {
  //           if (this.CartProductsList[i]['CompanyProductID'] == item.CompanyProductID) {
  //             CartProductID = this.CartProductsList[i]['CartProductID'];
  //           }
  //         }
  //         // 

  //         this.increaseNumber(item, quantity, CartProductID);
  //       }
  //     } else {
  //       openPopup('ClearCartModal');
  //       // if (
  //       //   confirm(
  //       //     'Your cart contain other shop products. Do you want to remove ? '
  //       //   )
  //       // ) {
  //       //   localStorage.removeItem('CartID');
  //       //   localStorage.removeItem('rzp_device_id');
  //       //   localStorage.removeItem('CompanyID');
  //       //   localStorage.removeItem('CartTotalamt');
  //         //resetCartCount();
  //       // }
  //     }
  //   }
  // }




// addcart(item: any) {
//   this.newshopprod = item;
//   console.log(this.newshopprod, item, localStorage.getItem('CartID'));

//   const val2 = { CompanyID: item.CompanyID };

//   this.service.getCompanyList(val2).subscribe((res: any) => {
//     this.addCartCompanyData = JSON.parse(res['message']);
//     console.log("companydatabyvijay", this.addCartCompanyData);

//     const company = this.addCartCompanyData[0];

//     // ✅ 1. Get current weekday
//     const today = new Date();
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const currentDay = days[today.getDay()];

//     // ✅ 2. Get company time slot for today
//     const timeSlot = company["CompanyTime" + currentDay]; // e.g., "2 PM - 4 PM"
//     if (!timeSlot || timeSlot.trim() === "") {
//       alert("Shop is closed today.");
//       return;
//     }

//     // ✅ 3. Parse opening and closing time
//     const [start, end] = timeSlot.split(" - ").map((t: string) => t.trim());
//     const now = today.getHours() + today.getMinutes() / 60;
//     const convertTo24 = (time: string): number => {
//       const [hour, modifier] = time.split(" ");
//       let h = parseInt(hour);
//       if (modifier.toUpperCase() === "PM" && h !== 12) h += 12;
//       if (modifier.toUpperCase() === "AM" && h === 12) h = 0;
//       return h;
//     };

//     const startHour = convertTo24(start);
//     const endHour = convertTo24(end);

//     // ✅ 4. Check if shop is open
//     if (now < startHour || now > endHour) {
//       // alert("Shop is currently closed.");
//       openPopup('ShopClosedModal');
//       // setTimeout(() => {
//       //   closePopup('ShopClosedModal')
//       // }, 5000);
//       return;
//     }

//     // ✅ 5. Continue as before if shop is open
//     if (localStorage.getItem('CartID') === null) {
//       const val = { UserID: this.UserID, CompanyID: item.CompanyID };

//       this.service.addCart(val).subscribe((data) => {
//         if (data['status_code'] == 100) {
//           this.CartID = JSON.parse(data['message'])[0]['identity'];
//           localStorage.setItem('CartID', this.CartID);
//           localStorage.setItem('CompanyID', item.CompanyID);
//           this.addproduct(item);
//         } else if (data['status_code'] == 300) {
//           alert(JSON.parse(data['message'])[0]['message']);
//         } else {
//           alert('Some error occurred, data not saved');
//         }
//       });
//     } else {
//       if (localStorage.getItem('CompanyID') == item.CompanyID) {
//         let quantity = this.getQuantity(item.CompanyProductID);
//         if (quantity == 0) {
//           this.addproduct(item);
//           this.refreshCompanyProduct();
//           this.refreshcartProductsList();
//         } else {
//           let CartProductID;
//           for (let i = 0; i < this.CartProductsList.length; i++) {
//             if (this.CartProductsList[i]['CompanyProductID'] == item.CompanyProductID) {
//               CartProductID = this.CartProductsList[i]['CartProductID'];
//             }
//           }
//           this.increaseNumber(item, quantity, CartProductID);
//         }
//       } else {
//         openPopup('ClearCartModal');
//       }
//     }
//   });
// }

addcart(item: any) {
  this.newshopprod = item;

  const val2 = { CompanyID: item.CompanyID };

  this.service.getCompanyList(val2).subscribe((res: any) => {
    this.addCartCompanyData = JSON.parse(res['message']);
    const company = this.addCartCompanyData[0];

    const today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = days[today.getDay()];
    let timeSlot = company["CompanyTime" + currentDay];

    // ✅ Handle missing or empty time
    if (!timeSlot || timeSlot.trim() === "") {
      openPopup('ShopClosedModal');
      return;
    }

    // ✅ Normalize and space out time values (e.g. "2PM - 10PM" => "2 PM - 10 PM")
    timeSlot = timeSlot.replace(/(\d)(AM|PM)/gi, "$1 $2"); // Inserts space before AM/PM
    timeSlot = timeSlot.replace(/\s*-\s*/g, " - "); // Normalizes dash spacing

    const [startRaw, endRaw] = timeSlot.split(" - ").map((t: string) => t.trim().toLowerCase());

    // ✅ Handle closed timings
    if (startRaw === "closed" || endRaw === "closed") {
      openPopup('ShopClosedModal');
      return;
    }

    const convertTo24 = (time: string): number => {
      const parts = time.toUpperCase().split(" ");
      if (parts.length !== 2) return -1;

      let [hourStr, modifier] = parts;
      let hour = parseInt(hourStr);
      if (isNaN(hour)) return -1;

      if (modifier === "PM" && hour !== 12) hour += 12;
      if (modifier === "AM" && hour === 12) hour = 0;

      return hour;
    };

    const startHour = convertTo24(startRaw);
    const endHour = convertTo24(endRaw);
    const now = today.getHours() + today.getMinutes() / 60;

    // ✅ Final time range check
    if (startHour === -1 || endHour === -1 || now < startHour || now > endHour) {
      openPopup('ShopClosedModal');
      return;
    }

    // ✅ Proceed with cart logic
    if (localStorage.getItem('CartID') === null) {
      const val = { UserID: this.UserID, CompanyID: item.CompanyID };

      this.service.addCart(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          this.CartID = JSON.parse(data['message'])[0]['identity'];
          localStorage.setItem('CartID', this.CartID);
          localStorage.setItem('CompanyID', item.CompanyID);
          this.addproduct(item);
        } else if (data['status_code'] == 300) {
          alert(JSON.parse(data['message'])[0]['message']);
        } else {
          alert('Some error occurred, data not saved');
        }
      });
    } else {
      if (localStorage.getItem('CompanyID') == item.CompanyID) {
        let quantity = this.getQuantity(item.CompanyProductID);
        if (quantity == 0) {
          this.addproduct(item);
          this.refreshCompanyProduct();
          this.refreshcartProductsList();
        } else {
          let CartProductID;
          for (let i = 0; i < this.CartProductsList.length; i++) {
            if (this.CartProductsList[i]['CompanyProductID'] == item.CompanyProductID) {
              CartProductID = this.CartProductsList[i]['CartProductID'];
            }
          }
          this.increaseNumber(item, quantity, CartProductID);
        }
      } else {
        openPopup('ClearCartModal');
      }
    }
  });
}





  clearcart(){
    closePopup('ClearCartModal');

      const cartID = this.CartID;
      const val: any = { CartID: cartID };

      this.service.deleteCartProducts(val).subscribe((res1) => {

        this.service.deleteCart(val).subscribe((res2) => {

          localStorage.removeItem('CartID');
          localStorage.removeItem('CompanyID');
          localStorage.removeItem('CartTotalamt');
          localStorage.removeItem('rzp_device_id');
          this.addcart(this.newshopprod);
        });
      });
      
  }

  subcart(item: any) {
    let quantity = this.getQuantity(item.CompanyProductID);
    let CartProductID;
    for (let i = 0; i < this.CartProductsList.length; i++) {
      if (this.CartProductsList[i]['CompanyProductID'] == item.CompanyProductID) {
        CartProductID = this.CartProductsList[i]['CartProductID'];
      }
    }

    this.decreaseNumber(item, quantity, CartProductID);
  }

  addproduct(item: any) {
    var val = {
      CartID: this.CartID,
      CompanyID: item.CompanyID,
      ProductID: item.CompanyProductID,
      ProductPrice: item.FinalValue,
      Quantity: 1,
      // UserID: this.UserID,
    };


    this.service.addCartProducts(val).subscribe((data) => {

      if (data['status_code'] == 100) {
        showSuccess('Product Added Successfully');
        // alert(JSON.parse(data['message'])[0]['message']);
        this.refreshCompanyProduct();
        this.refreshcartProductsList();

        this.incrementCartCountDoIt = true;
        if (this.incrementCartCountDoIt) {
          //incrementCartCount();
          this.incrementCartCountDoIt = false;
        }
      } else if (data['status_code'] == 300) {
        alert(JSON.parse(data['message'])[0]['message']);
      } else {
        alert('Some error occured, data not saved');
      }
    });
  }

  increaseNumber(item: any, qua: any, CartProductID: any) {
  if (qua >= 10) {
    // showInfo('Only 10 units of this product can be placed per order');
        showInfo('Max 10 quantity per item');

    return;
  }
    var val: any = {};
    val.CartProductID = CartProductID;
    if (qua?.toString().length !== 0) {
      val.Quantity = qua + 1;
    }

    this.service.updateCartProductsQuantity(val).subscribe((res) => {

      var res = res.toString();


      this.refreshCompanyProduct();
      this.refreshcartProductsList();
    });
  }

  decreaseNumber(item: any, qua: any, CartProductID: any) {
    if (this.length == 1 && qua == 1) {
      this.deleteproduct(CartProductID);
      var val: any = {};
      val.CartID = this.CartID;
      this.service.deleteCart(val).subscribe((res) => {
        var res = res.toString();
        localStorage.removeItem('CartID');
        localStorage.removeItem('CompanyID');
        this.refreshCompanyProduct();
        this.refreshcartProductsList();
        // this.resetPage();
        window.location.reload();
      });
    } else {
      if (qua == 1) {
        this.deleteproduct(CartProductID);
      } else {
        var val: any = {};
        val.CartProductID = CartProductID;
        if (qua?.toString().length !== 0) {
          val.Quantity = qua - 1;
        }
        this.service.updateCartProductsQuantity(val).subscribe((res) => {
          var res = res.toString();
          this.refreshcartProductsList();
        });
      }
    }
  }
  deleteproduct(CartProductID: any) {
    var val: any = {};
    val.CartProductID = CartProductID;
    val.CartID = this.CartID;
    this.service.deleteCartProducts(val).subscribe((res) => {
      this.decrementCartCountDoIt = true;

      if (this.decrementCartCountDoIt) {
        //decrementCartCount();
        this.decrementCartCountDoIt = false;
      }
      var res = res.toString();
      this.refreshCompanyProduct();
      this.refreshcartProductsList();
    });
  }

  ProductDescription(item: any) {
    this.ProductDescName = item.ProductName;
    this.ProductDescCompanyName = item.CompanyName;
    this.ProductDescCancelAmt = item.ProductDiscountPrice;
    this.ProductDescamt = item.ProductDiscountPrice;
    this.ProductDesDescription = item.ProductDescription;

    this.refreshCompanyProduct();
  }
  resetPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.activatedRoute });
  }

  lowToHigh() {
    this.productList.sort(function (a: any, b: any) {
      return a.ProductDiscountPrice - b.ProductDiscountPrice;
    });
  }

  HighTolow() {
    this.productList.sort(function (a: any, b: any) {
      return b.ProductDiscountPrice - a.ProductDiscountPrice;
    });
  }

  Newest() {
    this.productList.sort(function (a: any, b: any) {
      return b.ProductID - a.ProductID;
    });
  }

  calculateFinalPrice(dataItem: any): number {
    var finalprice: any;
    if (dataItem.DiscountType === 'P') {
      finalprice = dataItem.ProductPrice - (dataItem.ProductPrice * dataItem.DiscountPrice / 100);
    } else if (dataItem.DiscountType === 'V') {
      finalprice = dataItem.ProductPrice - dataItem.DiscountPrice;
    } else {
      finalprice = dataItem.ProductPrice;
    }
    finalprice = parseFloat(finalprice.toFixed(2));
    dataItem.FinalValue = finalprice;
    return finalprice
  }

  isUnique(value: string) {
    if (value !== undefined) {
      if (this.uniqueValues.has(value)) {
      } else {
        this.uniqueValues.add(value);
      }
    }
  }


  filterName() {
    var CompanyProductNameSearch = this.CompanyProductNameSearch;
    this.productList = this.productListWithoutFilter.filter(function (el: any) {
      return el.MasterProductName.toString().toLowerCase().includes(
        CompanyProductNameSearch.toString().trim().toLowerCase()
      )
    })
    this.totalItems = this.productList.length;
    this.totalPages;
    // 

    this.pages;
    // 
    this.setPage(1);
    // 
  }

  setPage(page: number): void {    
    this.currentPage = page;
    const start: number = (page - 1) * this.itemsPerPage;
    const end: number = start + Number(this.itemsPerPage);
    this.paginatedProducts = this.productList.slice(start, end);
  
    var fitem = localStorage.getItem("fitem");

    if(fitem)
    {
      const specialProductIndex = this.paginatedProducts.findIndex(product => product.MasterProductID == fitem);
      
      
      if (specialProductIndex > -1) {
        const specialProduct = this.paginatedProducts[specialProductIndex];
        
        this.paginatedProducts = [specialProduct, ...this.paginatedProducts.filter(product => product.MasterProductID != fitem)];
      }
   }
  }

  get totalPages(): number {
    //

    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): number[] {
    //

    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  sortProd() {
    // 
    this.currentPage = 1;
    switch (this.SortBy) {
      case 'Low to High':
        this.productList.sort((a: { FinalValue: number; }, b: { FinalValue: number; }) => a.FinalValue - b.FinalValue);
        // 
        this.setPage(1);
        break;
      case 'High to Low':
        this.productList.sort((a: { FinalValue: number; }, b: { FinalValue: number; }) => b.FinalValue - a.FinalValue);
        // 
        this.setPage(1);
        break;
      case 'Release Date':
        // this.productList.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
      case 'Avg. Rating':
        // this.productList.sort((a, b) => b.avgRating - a.avgRating);
        break;
      case 'Featured':
        // Handle 'Featured' or any other default sort logic here
        break;
    }
  }

  openQuickViewModal(dataItem: any): void {
    this.selectedDataItem = dataItem;
    // console.log("this.selected",this.selectedDataItem);

  }

  // @ViewChild('reviewModal', { static: false }) reviewPopup: ElementRef | undefined;

  refreshratingandreviewsList() {
    // if (this.reviewPopup) {
    //   const modalElement = this.reviewPopup.nativeElement;
    //   modalElement.classList.add('show');
    //   modalElement.style.display = 'block';
    //   document.body.classList.add('modal-open');
    // }
    this.isReviewModalOpen = true;
    // 

    var val: any = {
      CompanyID: this.CompanyID,
      IsPublished: 1,
    };
    this.service.getratingandreviewsList(val).subscribe((data) => {
      // 
      if (data['status_code'] == 100) {
        this.ratingandreviewsList = JSON.parse(data['message']);
        // 
  console.log("this.ratingandreviewsListvijayonrclick",this.ratingandreviewsList);

        this.lengthofrating = this.ratingandreviewsList.length;
        // this.avgtotal();
        this.reviewInfo = this.ratingandreviewsList.find((review: { UserID: number; }) => review.UserID === this.UserID);
        if (this.reviewInfo) {
          this.reviewPresent = true;
          this.reviewloop = Array(this.reviewInfo.CustomerCompanyRating).fill(0).map((x, i) => i + 1);
          var remianingstar = 5 - this.reviewInfo.CustomerCompanyRating;
          this.reviewloop1 = Array(remianingstar).fill(0).map((x, i) => i + 1);
        }

      }
      if (data['status_code'] == 200) {
      
        this.ratingandreviewsempty = 0;
         console.log("this.ratingandreviewsListvijau22",this.ratingandreviewsList);
      }
    });





  }

  setRating(rating: number) {
    this.CustomerCompanyRating = rating;
    // 

  }

  addReview() {
    // alert(this.UserID)
    this.blankstar = true

    this.starError = false;
    this.textError = false;
    if (this.CustomerCompanyRating === null) {
      this.starError = true;
      // 
    }
    const blankspaceRegex= /^\s*$/;
    // console.log(blankspaceRegex.test(this.CustomerRatingDescription));
    
    if (blankspaceRegex.test(this.CustomerRatingDescription)) {
      this.textError = true;
      // 
    }
    if (this.CustomerCompanyRating !== null && !blankspaceRegex.test(this.CustomerRatingDescription)) {
      if (this.UserID == 0) {
        showError('Please Login');
      } else {
        this.currentUser = localStorage.getItem('currentUser');
        if (this.currentUser) {
          this.currentUser = JSON.parse(this.currentUser);
          // 

          if (this.currentUser.LastName != null) {
            this.CustomerName =
              this.currentUser.FirstName + ' ' + this.currentUser.LastName;
            // 
          } else {
            this.CustomerName =
              this.currentUser.FirstName
            // 
          }
          this.UserID = this.currentUser.UserID;
        }
        // 

        var val = {
          CompanyID: this.CompanyID,
          UserID: this.UserID,
          CustomerName: this.CustomerName,
          CustomerCompanyRating: this.CustomerCompanyRating,
          CustomerRatingHeader: '',
          CustomerRatingDescription: this.CustomerRatingDescription,
          IsPublished: false,
        };
        // console.log(this)
        // this.service.addReview(val).subscribe(res=>{
        // var result = res.toString();
        // this.refreshRevList();
        this.service.addReview(val).subscribe((data) => {
          // 

          if (data['status_code'] == 100) {
            showSuccess('Review Added Successfully');
            closePopup('reviewModal');
            //alert('Review Added Successfully');

            this.CustomerCompanyRating = null;
            this.CustomerRatingDescription = '';
            this.starError = false;
            this.textError = false;

            this.isReviewModalOpen = false;


          } else {
            showError('Error ');
          }
        });
      }

    }

    // console.log(val)
  }

  refreshaboutusList() {

    var val: any = {};

    val.CompanyID = this.CompanyID;

    this.service.getCompanyList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.companylist = JSON.parse(data['message']);
        // 
      }
    });
  }
selectedCategory: string = '';
  selectCategory(category: string) {
    this.selectedCategory=category;
    console.log("vijayyyy",this.selectedCategory);
    
    this.productList = this.productListWithoutFilter.filter(function (el: any) {
      return el.ProductCategoryShortName.toString().toLowerCase().includes(
        category.toString().trim().toLowerCase()
      )
    })
    this.totalItems = this.productList.length;
    this.totalPages;
    // 

    this.pages;
    // 
    this.setPage(1);
    // 
  }

  companyReview() {
    var val: any = {
      CompanyID: this.CompanyID,
      IsPublished: 1,
    };
    this.service.getratingandreviewsList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.ratingandreviewsList = JSON.parse(data['message']);
        console.log("this.ratingandreviewsListvijay",this.ratingandreviewsList);
        
        this.lengthofrating = this.ratingandreviewsList.length;
        // 
        if (this.lengthofrating >= 1) {
          this.companyreviewPresent = true;
          this.sumofcompanyrating = this.ratingandreviewsList?.reduce(function (
            acc: any,
            val: any
          ) {
            return acc + val.CustomerCompanyRating;
          },
            0);

          // 
          // this.avgofcompanyrating = this.sumofcompanyrating / this.lengthofrating;
          this.avgofcompanyrating = parseFloat((this.sumofcompanyrating / this.lengthofrating).toFixed(1));
          // this.avgofcompanyrating = 4.6;
          // 
          // var starsToFill = Math.round(this.avgofcompanyrating * 2) / 2;
          var starsToFill = this.avgofcompanyrating;
          // 
          var i = 0;
          while (starsToFill >= 1) {
            this.stars[i] = 1;
            i++;
            starsToFill--;
          }
          if (starsToFill >= 0.5) {
            this.stars[i] = 0.5;
          }
          // 


        } else {
          this.companyreviewPresent = false;
        }

      }
    });
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

  loadDefaultImage(event: Event) {
    (event.target as HTMLImageElement).src = this.service.PhotoUrl + "anonymous.png";
  }


   getFilteredImages(): string[] {
    if (!this.selectedDataItem?.MasterProductImageLargeImagePath) return [];
    return this.selectedDataItem.MasterProductImageLargeImagePath
      .split(',')
      .map((i: string) => i.trim())
      .filter((i: any) => i); // removes empty strings
  }

  // Helper to get full image URL or fallback
  getImageUrl(imgPath: string | null | undefined): string {
    if (!imgPath) {
      return 'assets/images/anonymous.png'; // fallback image
    }
    return this.ProductImageNamePath + imgPath;

  }

  // Image error fallback
  // onImageError(event: Event) {
  //   (event.target as HTMLImageElement).src = 'assets/images/anonymous.png';
  // }
// backgroundPosition = 'center';
// zoom(event: MouseEvent) {
//   const target = event.target as HTMLElement;
//   const rect = target.getBoundingClientRect();
//   const x = ((event.clientX - rect.left) / rect.width) * 100;
//   const y = ((event.clientY - rect.top) / rect.height) * 100;
//   this.backgroundPosition = `${x}% ${y}%`;
// }
// resetZoom() {
//   this.backgroundPosition = 'center';
// }

zoomPosition = 'center';
zooming = false;

zoom(event: MouseEvent) {
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  this.zoomPosition = `${x}% ${y}%`;
  this.zooming = true;
}

resetZoom() {
  this.zooming = false;
  this.zoomPosition = 'center';
}



}
