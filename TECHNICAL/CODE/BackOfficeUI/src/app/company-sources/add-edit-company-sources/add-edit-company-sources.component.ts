import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function closePopup(id: any): any;

@Component({
  selector: 'app-add-edit-company-sources',
  templateUrl: './add-edit-company-sources.component.html',
  styleUrls: ['./add-edit-company-sources.component.css']
})
export class AddEditCompanySourcesComponent implements OnInit {
  Companysource_errormsg="";
  errormsg = false;
  @Output() emitData = new EventEmitter<boolean>();

  constructor(private service: SharedService, private_http: HttpClient) { }
  @Input()
  compsource: any;
  CompanySourceID: any;
  CompanySource: any;
  IsActive: any;
  ModifiedBy: any;
  currentUser: any;
  currentUserID: any;


  ngOnInit(): void {
    this.onUserRoles();
    this.CompanySourceID = this.compsource.CompanySourceID;
    this.CompanySource = this.compsource.CompanySource;
    this.IsActive = this.compsource.IsActive;
  }
  onUserRoles() {
    this.currentUser = localStorage.getItem('BoUser');
    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      this.currentUserID = this.currentUser.currentUserID;


    }
  }
  addCompanySource() {
    this.Companysource_errormsg = "";
    if (this.CompanySource.trim().length === 0) {
      this.Companysource_errormsg = "Please enter source";
      this.errormsg = true;
    }
    else {
      this.errormsg = false;
    var val = {
      CompanySourceID: this.CompanySourceID,
      CompanySource: this.CompanySource,
      IsActive: this.IsActive,
      CreatedBy: this.currentUserID
    };

    this.service.AddCompanySource(val).subscribe(data => {
      if (data["status_code"] == 100) {
       
        //Closing module popup using js function
        closePopup('addEditModalCompanySource');

        //sending false value to ShowCompont to destroy this component 
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
  }
  updateCompanySource() {
    // Validation: Check if input is empty
    if (!this.CompanySource || this.CompanySource.trim() === '') {
      this.Companysource_errormsg = 'Shop Source Name is required';
      this.errormsg = true;
      return; // Stop execution if validation fails
    } else {
      this.Companysource_errormsg = ''; // Clear error if input is valid
      this.errormsg = false;
    }
  
    var val = {
      CompanySourceID: this.CompanySourceID,
      CompanySource: this.CompanySource,
      IsActive: this.IsActive,
      ModifiedBy: this.currentUserID
    };
  
    this.service.UpdateCompanySource(val).subscribe(data => {
      if (data["status_code"] == 100) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
  
        // Closing module popup using js function
        closePopup('addEditModalCompanySource');
  
        // Sending false value to ShowComponent to destroy this component 
        this.emitData.emit(false);
  
        // Reset fields after success
        this.CompanySourceID = 0;
        this.CompanySource = '';
        this.IsActive = false;
        this.ModifiedBy = 0;
        this.Companysource_errormsg = ''; // Clear error on success
        this.errormsg = false;
      }
      else if (data["status_code"] == 300) {
        showDangerToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showDangerToast("Some error occurred, data not saved");
      }
    });
  }

 
validateCompanySource() {
  if (!this.CompanySource || this.CompanySource.trim() === '') {
    this.Companysource_errormsg = "Shop Source Name is required";
  } else {
    this.Companysource_errormsg = "";
  }
}
}
