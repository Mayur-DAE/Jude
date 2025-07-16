import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-searchflow',
  templateUrl: './searchflow.component.html',
  styleUrls: ['./searchflow.component.css'],
})
export class SearchflowComponent implements OnInit {
  constructor(private service: SharedService, private_http: HttpClient) { }

  @Input()
  CompanyLogoImageNamePath: any;

  searchText: string = '';
  fileToUpload: File | null = null;
  companyList: any = [];
  LanguageID: any = '';
  selectedLanguageId: string | null = '';
  currentDayField: string = '';
  companyRatings: { [key: number]: { avgRating: number; stars: string[] } } = {};

  ngOnInit(): void {
    this.selectedLanguageId = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : "1";
    this.refreshCompanyList();
    this.CompanyLogoImageNamePath = this.service.PhotoUrl;
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.currentDayField = 'CompanyTime' + days[new Date().getDay()];

  }

  refreshCompanyList() {
    if (this.selectedLanguageId !== null) {
      const val = {
        LanguageID: this.selectedLanguageId
      };
      this.service.CompanyListing(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          this.companyList = JSON.parse(data['message']);
          this.fetchCompanyRatings(this.companyList);
        }
      });
    }
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
  
    // 
    // 
    // 
  
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


  fetchCompanyRatings(companies: any[]) {
    companies.forEach((company: any) => {
      const val = {
        CompanyID: company.CompanyID,
        IsPublished: 1,
      };

      this.service.getratingandreviewsList(val).subscribe((data: any) => {
        let avgRating = 0.0;
        let stars = this.getStarClasses(avgRating);

        if (data['status_code'] == 100) {
          const ratingsList: any[] = JSON.parse(data['message']);
          if (ratingsList.length > 0) {
            const sumOfRatings: number = ratingsList.reduce((acc: number, val: any) => acc + val.CustomerCompanyRating, 0);
            avgRating = parseFloat((sumOfRatings / ratingsList.length).toFixed(1));
            stars = this.getStarClasses(avgRating);
          }
        }

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

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }

  loadDefaultImage(event: Event) {
    (event.target as HTMLImageElement).src = this.service.PhotoUrl + "anonymous.png";
  }
}
