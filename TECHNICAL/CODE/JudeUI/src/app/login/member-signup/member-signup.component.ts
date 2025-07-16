import { Component, OnInit, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare function showSuccess(message: any): any;
declare function showInfo(message: any): any;
declare function showWarning(message: any): any;
declare function showError(message: any): any;
declare var google: any;

@Component({
  selector: 'app-member-signup',
  templateUrl: './member-signup.component.html',
  styleUrls: ['./member-signup.component.css'],
})
export class MemberSignupComponent implements OnInit {
  @Output() emitData = new EventEmitter<boolean>();

  FirstName = '';
  fname_errorMsg = '';
  FnameClass = false;

  MiddleName = '';
  // mname_errorMsg = '';

  LastName = '';
  lname_errorMsg = '';

  EmaiID = '';
  emailaddress_errorMsg = '';

  MobileNumber = '';
  mobilenumber_errorMsg = '';

  mobilenumber2 = '';
  mobilenumber2_errorMsg = '';

  Password = '';
  password_errorMsg = '';

  confirmpassword = '';
  confirmpassword_errorMsg = '';

  agree = '';
  // visible: any = true;
  // changetype: any = true;
  passwordVisible = false;
  confirmPasswordVisible = false;
  passwordType = 'password';
  confirmPasswordType = 'password';
  
  constructor(private service: SharedService, private router: Router, private ngZone: NgZone) {}
  UserList: any = [];

  @Input()
  ngOnInit(): void {
    this.refreshMemberList();

    google.accounts.id.initialize({
      client_id: '1018549584519-ui0ganpom1at0rba0903ft1c97g80pm8.apps.googleusercontent.com',
      callback: (resp: any) => {
        
        // this.handleLogin(resp);
        this.ngZone.run(() => {
          this.handleSignup(resp);
        });
      }
    })

    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      // shape: 'pill',
      text: "signup_with",


    })
  }

  private decodeToken(token: any) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleSignup(response: any) {
    if (response) {
      const payLoad = this.decodeToken(response.credential)
      
      
      var val = {
        FirstName: payLoad.given_name,
        MiddleName: undefined,
        LastName: payLoad.family_name,
        EmaiID: payLoad.email,
        MobileNumber: undefined,
        Password: undefined,
        CompanyID: undefined,
        UserTypeID: 5,
        UserRoleID: 2,
        Username: payLoad.email,
        ProfilePicturePath: payLoad.picture,
        DateOfBirth: undefined,
        IsActive: 1,
        CreatedBy: undefined,
        CreatedDate: undefined,
        GoogleID: payLoad.jti
      };
      
      this.service.addGoogleMember(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          showSuccess('Account Created Successfully');
          this.router.navigate(['Login/' + 'Home']);
        } else if (data['status_code'] == 200) {
          showError(JSON.parse(data['message'])[0]['message']);
        } else {
          showError('Some error occured, data not saved');
        }
      });
    }
  }

  Signup() {
    if (this.validateForm()) {
      var val = {
        FirstName: this.FirstName,
        MiddleName: this.MiddleName,
        LastName: this.LastName,
        EmaiID: this.EmaiID,
        MobileNumber: this.MobileNumber,
        Password: this.confirmpassword,
        CompanyID: undefined,
        UserTypeID: 5,
        UserRoleID: 2,
        Username: this.EmaiID,
        ProfilePicturePath: undefined,
        DateOfBirth: undefined,
        IsActive: 1,
        CreatedBy: undefined,
        CreatedDate: undefined,
      };
      this.service.addMember(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          showSuccess('Account Created Successfully');
          this.router.navigate(['Login/' + 'Home']);
        } else if (data['status_code'] == 300) {
          showError(JSON.parse(data['message'])[0]['message']);
        } else {
          showError('Some error occured, data not saved');
        }
      });
    }
  }
  refreshMemberList() {
    let val = {};
    this.service.getUserList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.UserList = JSON.parse(data['message']);
      }
    });
  }
  validateForm(): boolean {
    let isFormValidate = true;
    this.FnameClass = false;
    this.fname_errorMsg = '';
    // this.mname_errorMsg = '';
    this.lname_errorMsg = '';
    this.emailaddress_errorMsg = '';
    this.mobilenumber_errorMsg = '';
    this.mobilenumber2_errorMsg = '';
    this.password_errorMsg = '';
    this.confirmpassword_errorMsg = '';

    const trimmedFirstName = this.FirstName.trim();
    const trimmedLastName = this.LastName.trim();
    const trimmedEmail = this.EmaiID.trim();
    const trimmedMobileNumber1 = this.MobileNumber.trim();
    const trimmedMobileNumber2 = this.mobilenumber2.trim();

    if (trimmedFirstName.length === 0) {
      isFormValidate = false;
      this.fname_errorMsg = 'Please enter your first name';
      this.FnameClass = true;
    }
    else if (!/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(trimmedFirstName)) {
      isFormValidate = false;
      this.fname_errorMsg = 'Invalid format. Only alphabets allowed, with no extra spaces';
      this.FnameClass = true;
    }


    // if (this.MiddleName.trim().length === 0) {
    //   isFormValidate = false;
    //   this.mname_errorMsg = 'Please enter your middle name';
    // }
    if (trimmedLastName.length === 0) {
      isFormValidate = false;
      this.lname_errorMsg = 'Please enter your last name';
    }
    else if (!/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(trimmedLastName)) {
      isFormValidate = false;
      this.lname_errorMsg = 'Invalid format. Only alphabets allowed, with no extra spaces';
    }

    if (trimmedEmail.length === 0) {
      isFormValidate = false;
      this.emailaddress_errorMsg = 'Please enter your email address';
    }
    else if (!/^\S+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
      isFormValidate = false;
      this.emailaddress_errorMsg = 'Invalid email format. No spaces allowed';
    }

    if (trimmedMobileNumber1.length === 0) {
      isFormValidate = false;
      this.mobilenumber_errorMsg = 'Please enter mobile number';
    }
    else if (!/^[0-9]+$/.test(trimmedMobileNumber1)) {
      isFormValidate = false;
      this.mobilenumber_errorMsg = 'Invalid format';
    }
    // Ensure exactly 10 digits
    else if (this.MobileNumber.length !== 10) {
      isFormValidate = false;
      this.mobilenumber_errorMsg = 'Mobile number must contain 10 digits';
    }


    if (trimmedMobileNumber2.length === 0) {
      isFormValidate = false;
      this.mobilenumber2_errorMsg = 'Please enter whatsapp number';
    }
    else if (!/^[0-9]+$/.test(trimmedMobileNumber2)) {
      isFormValidate = false;
      this.mobilenumber2_errorMsg = 'Invalid format';
    }
    // Ensure exactly 10 digits
    else if (this.mobilenumber2.length !== 10) {
      isFormValidate = false;
      this.mobilenumber2_errorMsg = 'Mobile number must contain 10 digits.';
    }


    // if (this.Password.trim().length === 0) {
    //   isFormValidate = false;
    //   this.password_errorMsg = 'Password required';
    // }
    if (this.Password.trim().length === 0) {
      isFormValidate = false;
      this.password_errorMsg = 'Password required';
    } else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(this.Password)) {
      isFormValidate = false;
      this.password_errorMsg = 'Password must be atleast 8 characters with an uppercase letter and special character';
    } else {
      this.password_errorMsg = '';
    }

    if (this.confirmpassword.trim().length === 0) {
      isFormValidate = false;
      this.confirmpassword_errorMsg = 'Confirm your password';
    }
    if (this.Password !== this.confirmpassword) {
      isFormValidate = false;
      this.confirmpassword_errorMsg = 'Password not matching';
      return isFormValidate;
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
}
