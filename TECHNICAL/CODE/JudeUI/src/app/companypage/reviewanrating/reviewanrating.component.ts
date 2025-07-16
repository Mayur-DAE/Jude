import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-reviewanrating',
  templateUrl: './reviewanrating.component.html',
  styleUrls: ['./reviewanrating.component.css'],
})
export class ReviewanratingComponent implements OnInit {
  show = 'CustomerCompanyRating==5';
  readMore = false;
  constructor(
    private service: SharedService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ratingandreviewsList: any;
  ratingandreviewsempty: any;
  lengthofrating: any;
  sumofrating: any;
  avgofrating: any;

  ModalTitle: any;
  ActivateAddEditReviewComponent: boolean = false;
  review: any;
  currentUser: any;
  CustomerName: any;
  companyList: any = [];
  CompanyName: any;

  @Input()
  CompanyID: any;

  iconClass: any = {
    0: 'far fa-star',
    0.5: 'fas fa-star-half-alt AB',
    1: 'fas fa-star AB',
    color: 'yellow',
  };

  stars: any[] = [0, 0, 0, 0, 0]; //five empty star

  ngOnChanges() {
    this.fillStars();
  }

  ngOnInit(): void {
    this.refreshCompanyList();
    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser) {
      this.CustomerName =
        this.currentUser.FirstName + ' ' + this.currentUser.LastName;
    }
    this.refreshratingandreviewsList();
  }
  emittedDataByChild(data: boolean) {
    this.ActivateAddEditReviewComponent = data;
    if (!data) {
      this.refreshratingandreviewsList();
    }
  }
  refreshCompanyList() {
    let val = { CompanyID: this.CompanyID };
    this.service.getCompanyList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.companyList = JSON.parse(data['message']);
        this.CompanyName = this.companyList.CompanyName;
        //  
      }
    });
  }
  refreshratingandreviewsList() {
    var val: any = {
      CompanyID: this.CompanyID,
      IsPublished: 1,
    };
    this.service.getratingandreviewsList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.ratingandreviewsList = JSON.parse(data['message']);
        this.lengthofrating = this.ratingandreviewsList.length;
        this.avgtotal();
      }
      if (data['status_code'] == 200) {
        this.ratingandreviewsempty = 0;
      }
    });
  }
  addClick() {
    // if (this.currentUser == null) {
    //   //alert('Please Login First');
    //   this.router.navigate(['Login/']);
    // } else {
    this.review = {
      CompanyID: 0,
    };
    this.ModalTitle = 'Add review';
    this.ActivateAddEditReviewComponent = true;
    // }
  }
  closeClick() {
    this.ActivateAddEditReviewComponent = false;
    this.refreshratingandreviewsList();
  }
  avgtotal() {
    this.sumofrating = this.ratingandreviewsList?.reduce(function (
      acc: any,
      val: any
    ) {
      return acc + val.CustomerCompanyRating;
    },
    0);
    this.avgofrating = this.sumofrating / this.lengthofrating;

    var starsToFill = Math.round(this.avgofrating * 2) / 2; //round to nearest 0.5

    var i = 0;
    while (starsToFill > 0.5) {
      this.stars[i] = 1;
      i++;
      starsToFill--;
    }
    if (starsToFill === 0.5) {
      this.stars[i] = 0.5;
    }
  }
  fillStars() {}
}
