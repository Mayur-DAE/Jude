import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function closePopup(id: any): any;

@Component({
  selector: 'app-company-address',
  templateUrl: './company-address.component.html',
  styleUrls: ['./company-address.component.css']
})
export class CompanyAddressComponent implements OnInit {
  @Output() emitData = new EventEmitter<boolean>();
  constructor(private service: SharedService, private_http: HttpClient) { }
  company: any;
  CompanyAddressID: any;
  
  Address1: any;
  Address2: any;
  CityID: any;
  StateID: any;
  Zip: any;
  Landmark: any;
  Latitude: any;
  Longitude: any;
  CityList: any;
  StateList: any;
  CityName: any;
  IsDefault:any;
  companyaddressList: any = [];
  
  @Input()
  CompanyID: any;
  IsActive: any;
  
  ngOnInit(): void {
    this.loadCityListList();
    this.loadStateList();
    this.refreshCompanyAddresssList();
    
  }
  loadCityListList() {
    let val = {}
    this.service.getCityList(val).subscribe(data => {
      if (data["status_code"] == 100) {
        this.CityList = JSON.parse(data["message"]);
      }
    });
  }
  loadStateList() {
    let val = {}
    this.service.getStatesList(val).subscribe(data => {
      if (data["status_code"] == 100) {
        this.StateList = JSON.parse(data["message"]);
      }
    });
  }
  refreshCompanyAddresssList() {
    if(this.CompanyID!=0){
      let val = {CompanyID:this.CompanyID}
    this.service.getCompanyAddress(val).subscribe(data => {
      if (data["status_code"] == 100) {
        this.companyaddressList = JSON.parse(data["message"]);
        this.CompanyAddressID = this.companyaddressList[0].CompanyAddressID
        this.Address1 = this.companyaddressList[0].Address1
        this.Address2 = this.companyaddressList[0].Address2
        this.CityID = this.companyaddressList[0].CityID
        this.StateID = this.companyaddressList[0].StateID
        this.Zip = this.companyaddressList[0].Zip
        this.Landmark = this.companyaddressList[0].Landmark
        this.Latitude = this.companyaddressList[0].Latitude
        this.Longitude = this.companyaddressList[0].Longitude
        // console.log(this.companyaddressList)
        // console.log(this.Address1);
      }
    })
    }
    
  }
  addCompanyaddress() {
    var val = {
      Address1: this.Address1,
      Address2: this.Address2,
      CityID: this.CityID,
      StateID: this.StateID,
      CountryID: 58,
      Zip: this.Zip,
      Landmark: this.Landmark,
      Latitude: this.Latitude,
      Longitude: this.Longitude,
      IsDefault:0,
      IsActive:0,
      CreatedBy: this.service.currentUserID

    };
    this.service.addCompanyAddress(val).subscribe(data => {
      if (data["status_code"] == 100) {
        closePopup('exampleModal');
        this.emitData.emit(false);
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else if (data["status_code"] == 300) {
        showDangerToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showDangerToast("Some error occured, data not saved");
      }
    });
  }
  updateCompanyaddress() {
    var val = {
      CompanyAddressID: this.CompanyAddressID,
      CompanyID: this.CompanyID,
      Address1: this.Address1,
      Address2: this.Address2,
      CityID: this.CityID,
      StateID: this.StateID,
      CountryID:78,
      Zip: this.Zip,
      Landmark: this.Landmark,
      Latitude: this.Latitude,
      Longitude: this.Longitude,
      IsDefault:1,
      IsActive:1,
      ModifiedBy: this.service.currentUserID
    }
    this.service.updateCompanyAddress(val).subscribe(data => {
      if (data["status_code"] == 100) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
        closePopup('exampleModal');
        this.emitData.emit(false);
        this.CompanyAddressID = 0;
        this.CompanyID = 0;
        this.Address1 = '';
        this.Address2 = '';
        this.CityID = 0;
        this.StateID = 0;
        this.Zip = '';
        this.Landmark = '';
        this.Latitude = '';
        this.Longitude = '';
      }
      else if (data["status_code"] == 300) {
        showDangerToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showDangerToast("Some error occured, data not saved");
      }
    });
  }
}


