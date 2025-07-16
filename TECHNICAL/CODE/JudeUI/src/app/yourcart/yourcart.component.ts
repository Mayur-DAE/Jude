import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare const decrementCartCount: any;
declare function showInfo(message: any): any;

@Component({
  selector: 'app-yourcart',
  templateUrl: './yourcart.component.html',
  styleUrls: ['./yourcart.component.css'],
})
export class YourcartComponent implements OnInit {
  constructor(
    private service: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params: Params) => {
      
      if (params['id'] != '') {
        // this.searchText = params['id'];
        // alert(this.searchText);
        this.refreshcartProductsList();
      }
    });
  }
  decrementCartCountDoIt = false;
  CartProductsList: any = [];
  CartID: any;
  CartProduct: any;
  ProductPrice: any;
  Quantity: any;
  carttotalamt: any;
  cartsavingamt: any;
  CartProductID: any;
  currentUser: any;
  currentUserID: any;
  ProductImageNamePath: any;
  length: any;
  finalamt: any;
  actualprice: any;
  // searchText = '';
  isCartEmpty = true;
  countrydata: any = [];
  currency: any;
  selectedLanguageId: string | null = '';
  ngOnInit(): void {
    this.CartID = localStorage.getItem('CartID');
    

    if (this.CartID != null) {
      this.isCartEmpty = false;
      this.refreshcartProductsList();
      this.currentUser = localStorage.getItem('currentUser');
      this.ProductImageNamePath = this.service.PhotoUrl+ 'MasterProductImage/';
      if (this.currentUser) {
        this.currentUser = JSON.parse(this.currentUser);
        this.currentUserID = this.currentUser.UserID;
      }
    } else {
      //this.isCartEmpty = false; // this is temporary
      this.isCartEmpty = true; // Need to use this 
    }
    this.selectedLanguageId = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : "1"; 
  }

  refreshcartProductsList() {
    this.CartID = localStorage.getItem('CartID');
    this.selectedLanguageId = localStorage.getItem('selectedLanguage') || "1";

    var val: any = { LanguageID: this.selectedLanguageId};
    if (this.CartID?.trim().length !== 0) {
      val.CartID = this.CartID;
    }
    

    this.service.getCartProducts(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.CartProductsList = JSON.parse(data['message']);
        
        this.length = this.CartProductsList.length;
        this.service.updateCartCount(this.length);
        
        this.currencySign();
        this.carttotal();
        this.cartsavingcal();
        this.cartsaving();

        
      }
    });  
  }
  decreaseNumber(item: any) {
    if (this.length == 1 && item.Quantity == 1) {
      this.deleteproduct(item.CartProductID);
      var val: any = {};
      val.CartID = this.CartID;
      this.service.deleteCart(val).subscribe((res) => {
        var res = res.toString();
        localStorage.removeItem('CartID');
        localStorage.removeItem('CompanyID');

        this.refreshcartProductsList();
        // this.resetPage();
        window.location.reload();
      });
    } else {
      if (item.Quantity == 1) {
        this.deleteproduct(item.CartProductID);
      } else {
        var val: any = {};
        val.CartProductID = item.CartProductID;
        if (item.Quantity?.toString().length !== 0) {
          val.Quantity = item.Quantity - 1;
        }
        this.service.updateCartProductsQuantity(val).subscribe((res) => {
          var res = res.toString();
          this.refreshcartProductsList();
        });
      }
    }
  }
  increaseNumber(item: any) {
if (item.Quantity >= 10) {
  // showInfo('Only 10 units of this product can be placed per order');
   showInfo('Max 10 quantity per product');
  return;
}

    var val: any = {};
    if (item.CartProductID?.toString().length !== 0) {
      val.CartProductID = item.CartProductID;
    }
    if (item.Quantity?.toString().length !== 0) {
      val.Quantity = item.Quantity + 1;
    }
    this.service.updateCartProductsQuantity(val).subscribe((res) => {
      var res = res.toString();
      this.refreshcartProductsList();
      this.carttotal();
    });
  }

  carttotal() {
    
    this.carttotalamt = this.CartProductsList.reduce(function (
      acc: any,
      val: any
    ) {
      

      return acc + val.ProductPrice * val.Quantity;
    },
      0);
  }

  cartsavingcal() {
    
    this.cartsavingamt = this.CartProductsList.reduce(function (
      acc: any,
      val: any
    ) {
      

      return acc + (val.ProductPrice - val.FinalPrice) * val.Quantity;
    },
      0);
  }

  cartsaving() {
    //this.cartsavingamt = this.carttotalamt - this.actualprice;
    this.finalamt = this.carttotalamt - this.cartsavingamt;
  }

  deleteproduct(CartProductID: any) {
    var val: any = {};
    val.CartProductID = CartProductID;
    val.CartID = this.CartID;
    this.service.deleteCartProducts(val).subscribe((res) => {
      var res = res.toString();
      this.decrementCartCountDoIt = true;
      if (this.decrementCartCountDoIt) {
        //decrementCartCount();
        this.decrementCartCountDoIt = false;
      }
      if (this.length == 1 ) {
        var value: any = {};
        value.CartID = this.CartID;        
        this.service.deleteCart(value).subscribe((res) => {
          var res = res.toString();
          localStorage.removeItem('CartID');
          localStorage.removeItem('CompanyID');
  
          this.refreshcartProductsList();
          // this.resetPage();
          window.location.reload();
        });
      } 
      this.refreshcartProductsList();
    });
  }

  checkout() {
    if (this.CartID == null) {
      alert('Your cart is empty');
    } else {
      if (this.currentUser == null) {

        this.router.navigate(['Login/' + 'shippingaddress']);
      } else {

        this.router.navigate(['/shippingaddress/' + this.currentUserID]);

      }
    }
  }

  goToComapny() {
    var CompanyID = localStorage.getItem('CompanyID');
    this.router.navigate(['shop/' + CompanyID]);
  }

  resetPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
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
