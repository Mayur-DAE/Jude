import { Component, NgModule, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { SharedService } from '../shared.service';


declare const bindCategoryCarousel: any;
declare const bindPopularCarousel: any;
declare const bindPaidPopularCarousel: any;
declare const bindOffersCarousel: any;
declare const bindhomeslider: any;

declare const bindCategoriesSlider: any;
declare const bindPopularProducts: any;
declare function closePopup(id: any): any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  selectedMasterProductName: string = '';
  //selectedMasterProductImagePath: string = '';
  CategoryshouldDoIt = true;
  PopularshouldDoIt = true;
  PaidPopularshouldDoIt = true;
  OffersshouldDoIt = true;

  DefaultImage = 'assets/images/carousel/banner_3.jpg ';
  addresses: any = [];
  myInput: any;
  ProductCategory: any = [];
  PopularAroundYou: any = [];
  companyRatings: { [key: number]: { avgRating: number; stars: string[] } } = {};
  paidCompanyRatings: { [companyID: number]: { avgRating: number, stars: string[] } } = {};
  PaidPopularAroundYou: any = [];
  BestSellingProduct: any = [];
  photoPath: any;
  companyPhotoPath: any;
  LanguageID: any = '';
  selectedLanguageId: string | null = '';
  selectedDataItem: any = null;
  ProductInCompany: boolean = true;
  
  companyList: any = [];
  CompanyImagePath = '';
  countrydata: any = [];
  currency: any;
  currentDayField: string = '';
  isOpen = false;
  iconClass: any = {
    0: 'bi bi-star',
    0.5: 'bi bi-star-half',
    1: 'bi bi-star-fill'
  };
  isMobile: boolean = false;

  constructor(private service: SharedService) { }


  ngOnInit(): void {
    this.CompanyImagePath = this.service.PhotoUrl + 'listing/';
    this.selectedLanguageId = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : "1";
    this.refreshProductCategory();
    this.photoPath = this.service.PhotoUrl;
    this.refreshPopularAroundYou();
    this.refreshPaidPopularAroundYou();
    this.refreshBestSellingProducts();
    // bindhomeslider();
    // bindCategoriesSlider();
    bindPopularProducts();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.currentDayField = 'CompanyTime' + days[new Date().getDay()];
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    if (window.innerWidth < 992)
    {
      this.isMobile = true
    }
    else
    {
      this.isMobile = false
    }
  }



  getLocation() {
    this.service.getLocationService().then((resp) => {
      resp.lat, resp.lng;


      this.refreshPopularAroundYou();
      this.refreshPaidPopularAroundYou();
    });
  }

  onAddressType(value: any) {
    this.service.getAddresses(value).subscribe((addressResponse) => {
      this.addresses = addressResponse;
    });
  }

  getImgaePath(val: any): string {
    if (val == '' && val == undefined) {
      return 'assets/images/carousel/banner_3.jpg ';
    } else {
      return val;
    }
  }
  bindCategoryCarouselts() {
    if (this.CategoryshouldDoIt) {
      // bindCategoryCarousel();
      bindCategoriesSlider();
      this.CategoryshouldDoIt = false;
    }
  }

  bindPopularCarouselts() {
    if (this.PopularshouldDoIt) {
      bindPopularCarousel();
      this.PopularshouldDoIt = false;
    }
  }

  bindPaidPopularCarouselts() {
    if (this.PaidPopularshouldDoIt) {
      bindPaidPopularCarousel();
      this.PaidPopularshouldDoIt = false;
    }
  }

  bindOffersCarouselts() {
    if (this.OffersshouldDoIt) {
      bindOffersCarousel();
      this.OffersshouldDoIt = false;
    }
  }

  refreshProductCategory() {
    if (this.selectedLanguageId !== null) {
      const val = {
        IsActive: 1,
        LanguageID: this.selectedLanguageId
      };
      this.service.ProductCategoryListing(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          this.ProductCategory = JSON.parse(data['message']);

        }
      });
    }
  }

  refreshPopularAroundYou() {
    var val = {
      Lat: localStorage.getItem('latitude'),
      Long: localStorage.getItem('longitude'),
      LanguageID: this.selectedLanguageId
    };

    this.service.getPopularAroundYou(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.PopularAroundYou = JSON.parse(data['message']);
        this.fetchRatings(this.PopularAroundYou);
      }
    });
  }


  fetchRatings(companies: any[]) {
    companies.forEach((company: any) => {
      var val = {
        CompanyID: company.CompanyID,
        IsPublished: 1,
      };

      this.service.getratingandreviewsList(val).subscribe((data: any) => {
        let avgRating = 0.0;
        let stars = this.getStarClasses(avgRating);

        if (data['status_code'] == 100) {
          let ratingsList: any[] = JSON.parse(data['message']);
          if (ratingsList.length > 0) {
            let sumOfRatings: number = ratingsList.reduce((acc: number, val: any) => acc + val.CustomerCompanyRating, 0);
            avgRating = parseFloat((sumOfRatings / ratingsList.length).toFixed(1));
            stars = this.getStarClasses(avgRating);
          }
        }

        if (companies === this.PaidPopularAroundYou) {
          this.paidCompanyRatings[company.CompanyID] = {
            avgRating: avgRating,
            stars: stars,
          };
        } else {
          this.companyRatings[company.CompanyID] = {
            avgRating: avgRating,
            stars: stars,
          };
        }
      });
    });
  }

  getStarClasses(avgRating: number): string[] {
    let stars: string[] = ['bi bi-star', 'bi bi-star', 'bi bi-star', 'bi bi-star', 'bi bi-star'];
    let i = 0;

    while (avgRating >= 1) {
      stars[i] = 'bi bi-star-fill';
      i++;
      avgRating--;
    }

    if (avgRating >= 0.5) {
      stars[i] = 'bi bi-star-half';
    }

    return stars;
  }

  checkAvailability(timing: string): boolean {
    if (!timing) return false;

    const timeRange = timing.match(/(\d{1,2}(?::\d{2})?\s?(AM|PM))\s*-\s*(\d{1,2}(?::\d{2})?\s?(AM|PM))/i);
    if (!timeRange) return false;

    const openTime = this.convertTo24Hour(timeRange[1]);
    const closeTime = this.convertTo24Hour(timeRange[3]);

    if (openTime === null || closeTime === null) return false;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();


    return currentTime >= openTime && currentTime <= closeTime;
  }

  convertTo24Hour(time: string): number | null {
    const match = time.match(/(\d{1,2})(?::(\d{2}))?\s?(AM|PM)/i);
    if (!match) return null;

    let hours = parseInt(match[1], 10);
    let minutes = match[2] ? parseInt(match[2], 10) : 0;
    const period = match[3].toUpperCase();

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    return hours * 60 + minutes;
  }

  refreshPaidPopularAroundYou() {
    var val = {
      Lat: localStorage.getItem('latitude'),
      Long: localStorage.getItem('longitude'),
      LanguageID: this.selectedLanguageId
    };

    this.service.getPaidPopularAroundYou(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.PaidPopularAroundYou = JSON.parse(data['message']);
        this.fetchRatings(this.PaidPopularAroundYou);
      }
    });
  }

  loadDefaultImage(event: Event) {
    (event.target as HTMLImageElement).src = this.service.PhotoUrl + "anonymous.png";
  }

  refreshBestSellingProducts() {
    var val = {
      LanguageID: this.selectedLanguageId
    };
    this.service.getBestSellingProduct(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.BestSellingProduct = JSON.parse(data['message']);
      }
    });
  }

  openCompanyModal(dataItem: any): void {
    this.selectedMasterProductName = dataItem.MasterProductName;
    // this.selectedMasterProductImagePath = this.photoPath + dataItem.MasterProductImageThumbnailImagePath;
    this.selectedDataItem = dataItem;
    localStorage.setItem("fitem",this.selectedDataItem.MasterProductID);
    var val: any = {
      MasterProductID: this.selectedDataItem.MasterProductID,
      IsActive: true,
      LanguageID: this.selectedLanguageId
    }
    this.service.getcompanyListforproduct(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.currencySign();
        this.ProductInCompany = true;
        this.companyList = JSON.parse(data['message']);
        
      }
      if (data['status_code'] == 200) {
        this.ProductInCompany = false;
      }
    })
  }

  closeModal() {
    this.selectedMasterProductName = '';
    // this.selectedMasterProductImagePath = '';
    closePopup('companyModal');
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
    // dataItem.FinalValue = finalprice;
    return finalprice
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
