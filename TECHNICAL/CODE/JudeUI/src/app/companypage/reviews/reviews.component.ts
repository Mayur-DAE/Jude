import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
declare function showSuccess(message: any): any;
declare function showError(message: any): any;
declare function closePopup(id: any): any;
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  @Output() emitData = new EventEmitter<boolean>();
  constructor(private service: SharedService, private_http: HttpClient) {}

  ModalTitle: any;
  review: any;
  AddReviewComp: any;
  ReviewList: any = [];

  CompanyName: any;
  a: any;

  currentUser: any;
  name: any;
  CompanyID: any;
  CustomerName: any;
  CompanyLogoPath: any;

  @Input()
  companyList: any;
  CompanyLogoImageNamePath: any;
  UserID: any;

  CustomerCompanyRating: any;
  CustomerRatingHeader: any;
  CustomerRatingDescription = '';

  ngOnInit(): void {
    //
    this.CompanyID = this.companyList[0].CompanyID;
    this.CompanyLogoPath = this.companyList[0].CompanyLogoPath;
    this.CompanyLogoImageNamePath = this.service.PhotoUrl + 'listing/';
    // 
    this.CompanyName = this.companyList[0].CompanyName;
    //
    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      this.CustomerName =
        this.currentUser.FirstName + ' ' + this.currentUser.LastName;
      this.UserID = this.currentUser.UserID;
    }
  }
  // addReview() {
  //   this.currentUser = sessionStorage.getItem('currentUser');
  //   if (this.currentUser) {
  //     this.currentUser = JSON.parse(this.currentUser);
  //     this.CustomerName = this.currentUser.FirstName + ' ' + this.currentUser.LastName;
  //     this.UserID = this.currentUser.UserID
  //     // 
  //   }
  //   var val = {
  //     CompanyID: this.CompanyID,
  //     UserID: this.UserID,
  //     CustomerName: this.CustomerName,
  //     CustomerCompanyRating: this.CustomerCompanyRating,
  //     CustomerRatingHeader: '',
  //     CustomerRatingDescription: this.CustomerRatingDescription

  //   };
  //   // console.log(this)
  //   // this.service.addReview(val).subscribe(res=>{
  //   // var result = res.toString();

  //   // this.refreshRevList();
  //   this.service.addReview(val).subscribe(data => {
  //     if (data["status_code"] == 100) {

  //       showSuccess('Added Successfully');
  //       closePopup('exampleModal');
  //       this.emitData.emit(false);
  //     }
  //     else {
  //       showError('Error ');
  //     }
  //   });
  //   // console.log(val)
  // }

  addReview() {
    // alert(this.UserID)
    if (this.UserID == undefined) {
      showError('Please login');
    } else {
      this.currentUser = localStorage.getItem('currentUser');
      if (this.currentUser == undefined) {
        this.currentUser = JSON.parse(this.currentUser);
        this.CustomerName =
          this.currentUser.FirstName + ' ' + this.currentUser.LastName;
        this.UserID = this.currentUser.UserID;
      }
      var val = {
        CompanyID: this.CompanyID,
        UserID: this.UserID,
        CustomerName: this.CustomerName,
        CustomerCompanyRating: this.CustomerCompanyRating,
        CustomerRatingHeader: '',
        CustomerRatingDescription: this.CustomerRatingDescription,
      };
      // console.log(this)
      // this.service.addReview(val).subscribe(res=>{
      // var result = res.toString();
      // this.refreshRevList();
      this.service.addReview(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          showSuccess('Added Successfully');
          closePopup('exampleModal');
          this.emitData.emit(false);
        } else {
          showError('Error');
        }
      });
    }
    // console.log(val)
  }

  // refreshRevList() {
  //   var val: any; { }
  //   this.service.getratingandreviewsList(val).subscribe(data => {
  //     this.ReviewList = JSON.parse(data['message']);
  //   });
  // }
  // refreshCompanyList() {
  //   let val  = {CompanyID: this.CompanyID}
  //   this.service.getCompanyList(val).subscribe((data) => {
  //     if (data['status_code'] == 100) {
  //       this.companyList = JSON.parse(data['message']);
  //      this.CompanyName = this.companyList.CompanyName;
  //      
  //     }

  //   });
  // }
  refreshRevList() {
    let val = {};
    this.service.getratingandreviewsList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.ReviewList = JSON.parse(data['message']);
      }
    });
  }

  starOneClick() {
    this.CustomerCompanyRating = 5;
  }

  starTwoClick() {
    this.CustomerCompanyRating = 4;
  }

  starThreeClick() {
    this.CustomerCompanyRating = 3;
  }

  starFourClick() {
    this.CustomerCompanyRating = 2;
  }

  starFiveClick() {
    this.CustomerCompanyRating = 1;
  }
}
