import { Component, OnInit, Input, HostListener } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ActivatedRoute, Params } from '@angular/router';

declare function closePopup(id: any): any;

@Component({
  selector: 'app-products-search-by-category',
  templateUrl: './products-search-by-category.component.html',
  styleUrls: ['./products-search-by-category.component.css'],
})
export class ProductsSearchByCategoryComponent implements OnInit {
  constructor(private service: SharedService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      if (params['id'] != '') {
        this.searchID = params['id'];
        this.refreshProductList();
      }
    });
  }
  selectedMasterProductName: string = '';
  MasterProductsOnCategoryList: any = [];
  companyRatings: { [key: number]: { avgRating: number; stars: string[] } } = {};
  MasterProductsOnCategoryRatings: { [companyID: number]: { avgRating: number, stars: string[] } } = {};
  iconClass: any = {
    0: 'bi bi-star',
    0.5: 'bi bi-star-half',
    1: 'bi bi-star-fill'
  };
  isEmpty = false;
  searchID = '';
  categoryID = '';
  productList: any = [];
  productImageNamePath = '';
  CompanyImagePath = '';
  selectedDataItem: any = null;
  companyList: any = [];
  currentPage: any;
  itemsPerPage: number = 50;
  paginatedProducts: any[] = [];
  totalItems: any;
  ProductInCompany: boolean = true;
  countrydata: any = [];
  currency: any;
  selectedLanguageId: string | null = '';
  isMobile: boolean = false;

  ngOnInit(): void {
    this.productImageNamePath = this.service.PhotoUrl;
    this.CompanyImagePath = this.service.PhotoUrl + 'listing/';
    this.searchID = this.route.snapshot.params['id'];
    this.categoryID = this.route.snapshot.queryParams['categoryId'] || null; 
    this.itemsPerPage = this.itemsPerPage;
    this.selectedLanguageId = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : "1"; 
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
    if (this.searchID && this.selectedLanguageId) {
      let val: any = {
        IsActive: true,
        LanguageID: this.selectedLanguageId
      };
  
      if (this.categoryID) {
        val.ProductSubCategoryID = this.searchID;
      } else {
        val.ProductCategoryID = this.searchID;
      }
      this.service.getmasterproductsoncategoryList(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          this.productList = JSON.parse(data['message']);
          this.totalItems = this.productList.length;
          this.fetchRatings(this.productList);
          this.currencySign();
          this.setPage(1);
          
          this.isEmpty = false;
        } else {
          this.isEmpty = true;
        }
      });
    }
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

  loadDefaultImage(event: Event) {
    (event.target as HTMLImageElement).src = this.service.PhotoUrl + "anonymous.png";
  }

  openCompanyModal(dataItem: any): void {
    this.selectedMasterProductName = dataItem.MasterProductName;
    this.selectedDataItem = dataItem;
    
    localStorage.setItem("fitem",this.selectedDataItem.MasterProductID);
    var val: any = {
      MasterProductID: this.selectedDataItem.MasterProductID,
      IsActive: true,
      LanguageID: this.selectedLanguageId
    }
    this.service.getcompanyListforproduct(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.ProductInCompany = true;
        this.companyList = JSON.parse(data['message']);
        // console.log('Comapny List',this.companyList);
        this.fetchRatings(this.companyList);
      }
      if (data['status_code'] == 200) {
        this.ProductInCompany = false;
      }
    })
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

  closeModal() {
    this.selectedMasterProductName = '';
    closePopup('companyModal');
  }


  setPage(page: number): void {
    this.currentPage = page;
    const start: number = (page - 1) * this.itemsPerPage;
    const end: number = start + Number(this.itemsPerPage);
    // 

    this.paginatedProducts = this.productList.slice(start, end);
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
