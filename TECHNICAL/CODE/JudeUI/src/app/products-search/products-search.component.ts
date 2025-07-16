import { Component, OnInit, Input, HostListener } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare function closePopup(id: any): any;
declare const bindShopsSlider: any;

@Component({
  selector: 'app-products-search',
  templateUrl: './products-search.component.html',
  styleUrls: ['./products-search.component.css'],
})
export class ProductsSearchComponent implements OnInit {
  constructor(private router: Router, private service: SharedService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      
      if (params['id'] != '') {
        this.searchText = params['id'];
        // alert(this.searchText);
        this.refreshProductList();
      }
    });
  }
  selectedMasterProductName: string = '';
  CompanyLogoImageNamePath: any;
  searchText = '';
  Lat = '0';
  Long = '0';

  searchDataList: any = [];
  companyRatings: { [key: number]: { avgRating: number; stars: string[] } } = {};
  MasterProductsOnCategoryRatings: { [companyID: number]: { avgRating: number, stars: string[] } } = {};
  iconClass: any = {
    0: 'bi bi-star',
    0.5: 'bi bi-star-half',
    1: 'bi bi-star-fill'
  };
  selectedLanguageId: string | null = '';
  productImageNamePath = '';
  isEmpty = true;
  SearchID: any;
  selectedDataItem: any = null;
  ProductInCompany: boolean = true;
  companyList: any = [];
  ProductSearchList: any = [];
  CompanySearchList: any = [];
  currentPage: any;
  itemsPerPage: number = 50;
  paginatedProducts: any[] = [];
  totalItems: any;
  CategoryshouldDoIt: boolean = true;
  countrydata: any = [];
  currency: any;
  isMobile: boolean = false;

  ngOnInit(): void {
    const lat = localStorage.getItem('latitude');
    const long = localStorage.getItem('longitude');
    this.selectedLanguageId = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : "1"; 
    // 


    if (lat) {
      this.Lat = lat;
    }
    if (long) {
      this.Long = long;
    }

    this.productImageNamePath = this.service.PhotoUrl;
    this.searchText = this.route.snapshot.params['id'];
    this.CompanyLogoImageNamePath = this.service.PhotoUrl + 'listing/';
    this.refreshProductList();
    this.checkScreenSize();
    // console.log(this.isMobile)
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
  

  refreshProductList() {
    if (this.searchText != '' && this.selectedLanguageId) {
      var val: any = {
        Search: this.searchText,
        Latitude: this.Lat,
        Longitude: this.Long,
        LanguageID: this.selectedLanguageId
      };
      

      this.service.getcompanyandprod(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          console.log("language", this.selectedLanguageId);
          this.searchDataList = JSON.parse(data['message']);
          this.fetchRatings(this.searchDataList);
          // 
          this.ProductSearchList = this.searchDataList.filter((item: { Category: string; }) => item.Category === "Product");
          
          this.CompanySearchList = this.searchDataList.filter((item: { Category: string; }) => item.Category === "Company");
          
          this.totalItems = this.ProductSearchList.length;
          this.setPage(1);


          this.isEmpty = false;
        } else {
          this.isEmpty = true;
        }
      });
    }
  }

  loadDefaultImage(event: Event) {
    (event.target as HTMLImageElement).src = this.service.PhotoUrl + "anonymous.png";
  }

  onselectName(SearchList?: any) {
    this.SearchID = SearchList['ID'];
    this.router.navigate(['shop/' + this.SearchID]);
  }

  openCompanyModal(dataItem: any): void {
    this.selectedMasterProductName = dataItem.Name;
    this.selectedDataItem = dataItem;
    
    localStorage.setItem("fitem",this.selectedDataItem.ID);
    var val: any = {
      MasterProductID: this.selectedDataItem.ID,
      IsActive: true,
      LanguageID: this.selectedLanguageId
    }
    this.service.getcompanyListforproductonsearch(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.ProductInCompany = true;
        this.companyList = JSON.parse(data['message']);
        this.fetchRatings(this.companyList);
        this.currencySign();
        
      }
      if (data['status_code'] == 200) {
        this.ProductInCompany = false;
      }
    })
  }
  closeModal() {
    this.selectedMasterProductName = '';
    closePopup('companyModal');
  }

  fetchRatings(companies: any[]) {
    companies.forEach((company: any) => {
      //console.log('Company:', company);

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
  
        // console.log('Fetched Ratings for CompanyID:', company.CompanyID, avgRating, stars);
  
        this.companyRatings[company.CompanyID] = {
          avgRating: avgRating,
          stars: stars,
        };
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

  setPage(page: number): void {
    this.currentPage = page;
    const start: number = (page - 1) * this.itemsPerPage;
    const end: number = start + Number(this.itemsPerPage);
    // 

    this.paginatedProducts = this.ProductSearchList.slice(start, end);
    // 

  }

  get totalPages(): number {
    // 

    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): number[] {
    // 

    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  bindCategoryCarouselts() {

    if (this.CategoryshouldDoIt) {
      // bindCategoryCarousel();
      setTimeout(() => {
        bindShopsSlider();
      }, 10);
      this.CategoryshouldDoIt = false;
    }
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
