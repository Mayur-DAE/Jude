import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';
import { TranslateService } from "@ngx-translate/core";
import { LoadingService } from './Loader/loading.service';
declare var bootstrap: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loading$;
  CartID: any;
  CartProductID: any;
  CartCount = 0;
  title = 'Jude';
  productCategories: any[] = [];
  productSubCategories: any[] = [];
  filteredProductSubCategories: any[] = [];
  selectedCategoryID: number | null = null;
  CompanyProductNameSearch: any;
  isNameSelected: any;
  SearchList: any;
  SearchID: any;
  showList: any = true;
  photoPath: any;
  currentUser: any;
  languages: any = [];
  LanguageId: any = [];
  selectedLanguage: any = localStorage.getItem('selectedLanguageCaption') ? localStorage.getItem('selectedLanguageCaption') : "English";
  //selectedLanguage: any ="English";
  selectedLanguageCode: any;
  selectedLanguageCaption: any;
  selectedLanguageId: string | null = '';
  location: any;
  constructor(private loader: LoadingService, private router: Router, public sharedService: SharedService, private translate: TranslateService) {
    this.getCount();
    translate.setDefaultLang('en-US');
    translate.use('en-US');
    this.loading$ = this.loader.loading$;
  }

  ngOnInit(): void {
    // SplashScreen.hide();
    // SplashScreen.show();
    // this.splashScreen();
    // 
    this.selectedLanguageCode = localStorage.getItem('selectedLanguageCode') ? localStorage.getItem('selectedLanguageCode') : "en-US";
    this.translate.use(this.selectedLanguageCode ? this.selectedLanguageCode : "en-US");
    // 
    this.currentUser = localStorage.getItem('currentUser');
    this.selectedLanguageId = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : "1";

    if (localStorage.getItem('latitude') === null) {
      localStorage.setItem('latitude', '0.00');
    }
    if (localStorage.getItem('longitude') === null) {
      localStorage.setItem('longitude', '0.00');
    }
    this.photoPath = this.sharedService.PhotoUrl;
    this.getProductCategoryData();
    this.getProductSubCategoryData();
    // this.getProductSubCategoryData(this.productCategories[0]?.ProductCategoryID);
    this.sharedService.cartCount$.subscribe((count) => {
      this.CartCount = count;
      // 
    });

    this.getCount();
    this.getLocation();
    this.fetchLanguages();
    this.findAddress();
  }
  closeOffcanvas() {
    const offcanvasElement = document.getElementById('navbar-default');
    if (offcanvasElement) {
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
      offcanvasInstance.hide();
    }
  }

  public selectLanguage(data: any): void {
    localStorage.setItem('selectedLanguage', data.LanguageId);
    localStorage.setItem('selectedLanguageCode', data.Languagecode);
    localStorage.setItem('selectedLanguageCaption', data.LanguageCaption);
    window.location.reload();
  }

  getProductCategoryData(): void {
    var val: any = {
      IsActive: 1,
      LanguageID: this.selectedLanguageId
    };
    this.sharedService.ProductCategoryListing(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.productCategories = JSON.parse(data['message']);
      }
    });
  }

  fetchLanguages(): void {

    this.sharedService.getlanguage({}).subscribe(
      (data) => {
        if (data['status_code'] == 100) {
          this.languages = JSON.parse(data['message']);
        }
      },
      (error) => {
        console.error('Error fetching languages:', error);
      }
    );
  }

  getProductSubCategoryData(): void {
    var val: any = {
      IsActive: 1,
      // ProductCategoryID: categoryID,
      LanguageID: this.selectedLanguageId
    };
    this.sharedService.ProductSubCategoryListing(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.productSubCategories = JSON.parse(data['message']);
      }
    });
  }

  onCategoryHover(categoryID: number): void {
    this.selectedCategoryID = categoryID;
    this.filteredProductSubCategories = this.productSubCategories.filter(subCategory => subCategory.ProductCategoryID === categoryID);
    // this.productSubCategories = [];
    // this.getProductSubCategoryData(categoryID);
  }

  onButtonClick(): void {
    this.getProductCategoryData();

  }

  loadDefaultImage(event: Event) {
    (event.target as HTMLImageElement).src = this.sharedService.PhotoUrl + "anonymous.png";
  }

  getLocation() {
    if (localStorage.getItem('latitude') && localStorage.getItem('longitude')) {
    } else {
      this.sharedService.getLocationService().then((resp) => {
        resp.lat, resp.lng;

        localStorage.setItem('latitude', resp.lat);
        localStorage.setItem('longitude', resp.lng);
      });
    }
  }

  yourCart() {
    this.CartID = localStorage.getItem('CartID');
    this.router.navigateByUrl('/Yourcart/' + this.CartID);
  }
  enteredSearchValue: string = '';

  @Output()
  searchTextchanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchTextchanged() {
    this.searchTextchanged.emit(this.enteredSearchValue);
  }

  onCompanyProductNameType() {
    this.showList = true;
    var val: any = {
      IsActive: 1,
    };
    if (this.CompanyProductNameSearch.trim() === '') {
      this.isNameSelected = false;
      this.SearchList = [];
    } else {
      val.SearchCompanyOrProduct = this.CompanyProductNameSearch;
      this.sharedService.getCompanyOrProductDistinct(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          this.SearchList = JSON.parse(data['message']);
        }
      });
    }
  }
  onSelectName(SearchList?: any) {
    this.SearchList = [];
    this.isNameSelected = true;
    this.CompanyProductNameSearch = SearchList['Name'];
    if (SearchList['Category'] == 'Company') {
      this.SearchID = SearchList['ID'];
      this.router.navigate(['shop/' + this.SearchID]);
    } else {
      this.router.navigate(['ProductsSearch/' + this.CompanyProductNameSearch]);
    }
  }
  openLoginComponent() {
    this.router.navigate(['Login/' + 'Home']);
  }

  getCount() {
    this.CartID = localStorage.getItem('CartID');
    this.selectedLanguageId = localStorage.getItem('selectedLanguage') || "1";

    if (this.CartID != null) {
      var val: any = { CartID: this.CartID, LanguageID: this.selectedLanguageId };
      this.sharedService.getCartProducts(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          var CartProductsList = JSON.parse(data['message']);
          this.CartCount = CartProductsList.length;
          // 
          this.sharedService.updateCartCount(this.CartCount);
        }
      });
    }
    else {
      this.sharedService.updateCartCount(0);
    }
  }

  searchClicked() {
    if (this.CompanyProductNameSearch != '') {
      this.SearchList = [];
      this.isNameSelected = true;
      this.showList = false;
      this.router.navigate(['ProductsSearch/' + this.CompanyProductNameSearch]);

      // this.SearchList = [];
    }
  }

  footer() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  onAddressSelected(address: string) {
    this.location = address;
    
  }

  findAddress() {
    const latStr = localStorage.getItem('latitude') ?? '0.00';
    const lngStr = localStorage.getItem('longitude') ?? '0.00';
    if (latStr !== '0.00' && lngStr !== '0.00') {
      const lat = parseFloat(latStr);
      const lng = parseFloat(lngStr);
      this.sharedService.getAddressFromCoordinates(lat, lng).subscribe(
        (response: any) => {
          this.location = response.formattedAddress;
          
          


        }
        // ,

        //   (error) => {
        //     console.error('Error fetching address:', error);
        //   }
      );
    }
  }
}
