import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';


declare function showSuccess(message: any): any;
declare function showInfo(message: any): any;
declare function showWarning(message: any): any;
declare function showError(message: any): any;

@Component({
  selector: 'app-channel-partner-sign-up',
  templateUrl: './channel-partner-sign-up.component.html',
  styleUrls: ['./channel-partner-sign-up.component.css'],
})
export class ChannelPartnerSignUpComponent implements OnInit {
  IsAccountCreated: boolean = false;
  BusinessTypeID: number = 0;
  BusinessTypeList: any;
  BusinessType_errormessage = '';
  CompanyID: any;

  FirstOtp: any;
  SecondOtp: any;
  Third: any;
  Four: any;
  Five: any;
  Six: any;

  Companyname = '';
  Companyname_errormessage = '';

  FirstName = '';
  FirstName_errormessage = '';

  MiddleName = '';
  MiddleName_errormessage = '';

  LastName = '';
  LastName_errormessage = '';

  EmailID = '';
  emailaddress_errormessage = '';

  MobileNumber = '';
  mobilenumber_errormessage = '';

  mobilenumber2 = '';
  mobilenumber2_errormessage = '';

  // GSTNumber = '';
  // GSTNumber_errormessage = '';

  // PanNumber = '';
  // PanNumber_errormessage = '';

  Password = '';
  password_errormessage = '';

  confirmpassword = '';
  confirmpassword_errormessage = '';

  agree = false;
  visible: any = true;
  changetype: any = true;
  showOtp = false;
  selectedLanguageId: string | null = '';
  errorMessage: string = '';
  passwordVisible = false;
  confirmPasswordVisible = false;
  passwordType = 'password';
  confirmPasswordType = 'password';
  constructor(private service: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.selectedLanguageId = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : "1"; 

    this.loadBusinessList();   
  }

  loadBusinessList() {
    let val = {
      LanguageID: this.selectedLanguageId
    };
    this.service.BusinessTypeListing(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.BusinessTypeList = JSON.parse(data['message']);
      }
    });
  }

  Signup() {
    this.Companyname_errormessage = '';
    this.FirstName_errormessage = '';
    this.MiddleName_errormessage = '';
    this.LastName_errormessage = '';
    this.LastName_errormessage = '';
    this.emailaddress_errormessage = '';
    this.mobilenumber_errormessage = '';
    this.mobilenumber2_errormessage = '';
    this.password_errormessage = '';
    this.confirmpassword_errormessage = '';
    // this.GSTNumber_errormessage = '';
    // this.PanNumber_errormessage = '';
    this.BusinessType_errormessage = '';

    if (this.validateForm()) {
      var val = {
        CompanyEmailid: this.EmailID,
        CompanyMobileNo1: this.MobileNumber,
      };
      this.service.ValidateCompany(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          this.showOtp = true;
          this.service.sendOTP(this.MobileNumber);
        } else if (data['status_code'] == 300) {
          showError(JSON.parse(data['message'])[0]['message']);
          this.showOtp = false;
        } else {
          alert('Some error occured, data not saved');
          this.showOtp = false;
        }
      });
    }
  }

  verifyOtop() {
    let status = 'Error';
    this.errorMessage = '';
    if (!this.FirstOtp || !this.SecondOtp || !this.Third || !this.Four || !this.Five || !this.Six) {
      this.errorMessage = 'Please enter all OTP digits.';
      return;
    }
    let otp =
      this.FirstOtp.toString() +
      this.SecondOtp.toString() +
      this.Third.toString() +
      this.Four.toString() +
      this.Five.toString() +
      this.Six.toString();

    this.service.verifyOTP(this.MobileNumber, otp).subscribe((data) => {
      status = data.Status;

      if (status == 'Success') {
        this.addCompany();
      } else {
        showError('The OTP entered is incorrect.');
      }
    });
  }

  addCompany() {
    var currentDate = formatDate(new Date(), 'MM-dd-yyyy', 'en-US');
    var date = new Date();
    var newDate = new Date(date.setMonth(date.getMonth() + 1));
    var expireyDate = formatDate(newDate, 'MM-dd-yyyy', 'en-US');
    var val = {
      BusinessTypeID: this.BusinessTypeID,
      CompanyName: this.Companyname,
      CompanyContactName:
        this.FirstName + ' ' + this.MiddleName + ' ' + this.LastName,
      CompanyEmailid: this.EmailID,
      CompanyMobileNo1: this.MobileNumber,
      CompanyMobileNo2: this.mobilenumber2,
      // CompanyGSTNumber: this.GSTNumber,
      // CompanyPANNumber: this.PanNumber,
      CompanyJoiningDate: currentDate,
      CompanyMemberShipExpiryDate: expireyDate,
      IsActive: 0,
      CreatedBy: 1,
      CompanyMemberShipTypeID: 2,
      CompanySourceID: 4,
      CompanyDescription: '',
      CompanyMSMENumber: '',
      CompanyPanCardImagePath: 'anonymous.png',
      CompanyGSTImagePath: 'anonymous.png',
      CompanyMSMEImagePath: 'anonymous.png',
      CompanyLogoPath: 'anonymous.png',
      CompanyBannerPath: 'anonymous.png',
      CompanyCancelledChequePath: 'anonymous.png',
      WebsiteURL: '',
      FacbookID: '',
      Twitter: '',
      Linkedin: '',
      Instagram: '',
      WordPress: '',
      Pintrest: '',
      YouTube: '',
      CompanyTimeMonday: '',
      CompanyTimeTuesday: '',
      CompanyTimeWednesday: '',
      CompanyTimeThursday: '',
      CompanyTimeFriday: '',
      CompanyTimeSaturday: '',
      CompanyTimeSunday: '',
    };

    this.service.AddCompany(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.CompanyID = JSON.parse(data['message'])[0]['identity'];
        this.addUser();
      } else if (data['status_code'] == 300) {
        showError(JSON.parse(data['message'])[0]['message']);
        // alert(JSON.parse(data['message'])[0]['message']);
        this.IsAccountCreated = false;
        this.showOtp = false;
      } else {
        alert('Some error occured, data not saved');
        this.IsAccountCreated = false;
        this.showOtp = false;
      }
    });
  }

  addUser() {
    let val = {
      CompanyID: this.CompanyID,
      UserTypeID: 3,
      UserRoleID: 2,
      Username: this.EmailID,
      Password: this.Password,
      FirstName: this.FirstName,
      MiddleName: this.MiddleName,
      LastName: this.LastName,
      EmaiID: this.EmailID,
      MobileNumber: this.MobileNumber,
      ProfilePicturePath: '',
      IsActive: 1,
      CreatedBy: 1,
    };

    this.service.AddUser(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        //alert(JSON.parse(data['message'])[0]['message']);
        var fullname = this.FirstName + ' ' + this.LastName;
        this.service.AORegistrationGreeting(this.MobileNumber, fullname);
        let whatappval = {
          type: 'buttonTemplate',
          templateId: 'business_message_welcome_new_aol',
          templateLanguage: 'en',
          namespace: '95ff4944_d726_464f_8363_64d127c7fea7',
          templateArgs: [fullname],
          sender_phone: '91' + this.MobileNumber,
        };
        this.service.sendWhatsappSMS(whatappval).subscribe((data) => {
          
        });
        this.IsAccountCreated = true;
        this.showOtp = false;

        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      } else if (data['status_code'] == 300) {
        showWarning('Email already exists');
        this.IsAccountCreated = false;
        this.showOtp = false;
      } else {
        showError('Some error occured, data not saved');
        this.IsAccountCreated = false;
        this.showOtp = false;
      }
    });
  }

  validateForm(): boolean {
    let isFormValidate = true;
    const trimmedFirstName = this.FirstName.trim();
    const trimmedLastName = this.LastName.trim();
    const trimmedMiddleName = this.MiddleName.trim();

    const trimmedEmail = this.EmailID.trim();
    const trimmedMobileNumber1 = this.MobileNumber.trim();
    const trimmedMobileNumber2 = this.mobilenumber2.trim();
    
    if (this.Companyname.trim().length === 0) {
      this.Companyname_errormessage = 'Please enter shop name';
      isFormValidate = false;
    }
    if (trimmedFirstName.length === 0) {
      this.FirstName_errormessage = 'Please enter your first name';
      isFormValidate = false;
    }
    else if (!/^(?! )[a-zA-Z]+( [a-zA-Z]+)*$/.test(trimmedFirstName)) {
      isFormValidate = false;
      this.FirstName_errormessage = 'Invalid format. Only alphabets allowed, with no extra spaces';
    }

    // if (this.MiddleName.trim().length === 0) {
    //   this.MiddleName_errormessage = '*Please enter your middle name';
    //   isFormValidate = false;
    // }
    if ( this.MiddleName.trim().length > 0 && !/^(?! )[a-zA-Z]+( [a-zA-Z]+)*$/.test(trimmedMiddleName) ) {
      isFormValidate = false;
      this.MiddleName_errormessage = 'Invalid format. Only alphabets allowed, with no extra spaces';
    }
    if (trimmedLastName.length === 0) {
      this.LastName_errormessage = 'Please enter your last name';
      isFormValidate = false;
    }
    else if (!/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(trimmedLastName)) {
      isFormValidate = false;
      this.LastName_errormessage = 'Invalid format. Only alphabets allowed, with no extra spaces';
    }

    if (this.EmailID.trim().length === 0) {
      this.emailaddress_errormessage = 'Please enter email address';
      isFormValidate = false;
    }
    else if (!/^\S+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
      isFormValidate = false;
      this.emailaddress_errormessage = 'Invalid email format. No spaces allowed';
    }

    if (this.MobileNumber.trim().length === 0) {
      this.mobilenumber_errormessage = 'Please enter mobile number';
      isFormValidate = false;
    }
    else if (!/^[0-9]+$/.test(trimmedMobileNumber1)) {
      isFormValidate = false;
      this.mobilenumber_errormessage = 'Invalid format';
    } 
    // Ensure exactly 10 digits
    else if (this.MobileNumber.length !== 10) {
      isFormValidate = false;
      this.mobilenumber_errormessage = 'Mobile number must contain 10 digits';
    }
    if (trimmedMobileNumber2.length > 0) {
      if (!/^[0-9]+$/.test(trimmedMobileNumber2)) {
        isFormValidate = false;
        this.mobilenumber2_errormessage = 'Invalid format';
      } else if (trimmedMobileNumber2.length !== 10) {
        isFormValidate = false;
        this.mobilenumber2_errormessage = 'Mobile number must contain 10 digits';
      }
    }
    // if (this.GSTNumber.trim().length === 0) {
    //   this.GSTNumber_errormessage = 'Please enter GST number';
    //   isFormValidate = false;
    // }
    // if (this.PanNumber.trim().length === 0) {
    //   this.PanNumber_errormessage = 'Please enter PAN number';
    //   isFormValidate = false;
    // }
    // if (this.Password.trim().length === 0) {
    //   this.password_errormessage = 'Password required';
    //   isFormValidate = false;
    // }
    if (this.Password.trim().length === 0) {
      isFormValidate = false;
      this.password_errormessage = 'Password required';
    } else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(this.Password)) {
      isFormValidate = false;
      this.password_errormessage = 'Password must be atleast 8 characters with an uppercase letter and special character';
    } else {
      this.password_errormessage = '';
    }
    if (this.confirmpassword.trim().length === 0) {
      this.confirmpassword_errormessage = 'Confirm your password';
      isFormValidate = false;
    }

    if (this.Password !== this.confirmpassword) {
      this.confirmpassword_errormessage =
        'Password is not matching';
      isFormValidate = false;
    }

    if (this.BusinessTypeID == 0) {
      this.BusinessType_errormessage = 'Please select business type';
      isFormValidate = false;
    }

    if (!this.agree) {
      isFormValidate = false;
      showWarning('Accept terms and conditions');
    }

    return isFormValidate;
  }
  viewpassword(field: string) {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
      this.passwordType = this.passwordVisible ? 'text' : 'password';
    } else if (field === 'confirmPassword') {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
      this.confirmPasswordType = this.confirmPasswordVisible ? 'text' : 'password';
    }
  }

  OpenDashboard(){
    const url = this.service.boUrl;
    window.open(url, '_blank'); 
    // this.router.navigateByUrl(this.service.boUrl);
  }
}
