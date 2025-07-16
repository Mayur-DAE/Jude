import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

declare function showError(message: any): any;
declare function showSuccess(message: any): any;
@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
})
export class VerificationComponent implements OnInit {
  FirstOtp: any;
  SecondOtp: any;
  Third: any;
  Four: any;
  Five: any;
  Six: any;
  UserList: any = [];
  UserID: any;
  visible: any = true;
  changetype: any = true;
  MobileNumber: any;
  mobilenumber_errorMsg = '';
  Verification = true;
  Success = false;
  abc = false;
  returnPath = '';
  Password = '';
  password_errormessage = '';
  confirmpassword = '';
  confirmpassword_errormessage = '';
  errorMessage: string = '';
  passwordVisible = false;
  confirmPasswordVisible = false;
  passwordType = 'password';
  confirmPasswordType = 'password';
  constructor(
    private service: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.returnPath = this.route.snapshot.params['id'];
  }
  sendOtp() {
    this.service.sendOTP(this.MobileNumber);
    this.Verification = false;
    this.Success = false;
    this.abc = true;
  }

  verifyOtp() {
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
        this.Verification = false;
        this.Success = true;
        this.abc = false;
        showSuccess('OTP validated Successfully');
      } else {
        showError('The OTP entered is incorrect.');
      }
    });
  }

  validateForm(): boolean {
    let isFormValidate = true;

    this.mobilenumber_errorMsg = '';
  
    if (!this.MobileNumber) {
      // 
      this.mobilenumber_errorMsg = 'Please enter mobile number';
      return false;
    }
    const trimmedMobileNumber = this.MobileNumber.trim();
    // 
    if (trimmedMobileNumber.length === 0) {
      isFormValidate = false;
      this.mobilenumber_errorMsg = 'Please enter mobile number';
    } 
    else if (!/^[0-9]+$/.test(this.MobileNumber)) {
      isFormValidate = false;
      this.mobilenumber_errorMsg = 'Invalid format';
    } 
    else if (this.MobileNumber.length !== 10) {
      isFormValidate = false;
      this.mobilenumber_errorMsg = 'Mobile number must contain 10 digits';
    }
    // if (this.Password.trim().length === 0) {
    //   this.password_errormessage = 'Password required';
    //   isFormValidate = false;
    // }
    // if (this.confirmpassword.trim().length === 0) {
    //   this.confirmpassword_errormessage = 'Confirm your password';
    //   isFormValidate = false;
    // }

    // if (this.Password !== this.confirmpassword) {
    //   this.confirmpassword_errormessage =
    //     'Please Check,Password is not matching';
    //   isFormValidate = false;
    // }
    return isFormValidate;
  }

  getuser() {
    if (this.validateForm()){
      var val: any = { MobileNumber: this.MobileNumber };
    // 
    this.service.getUserList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.UserList = JSON.parse(data['message']);
        // 
        this.sendOtp();
      } else if (data['status_code'] == 200) {
        showError(JSON.parse(data['message'])[0]['message']);
      }
    });
  }
  }


  UpdatePassword() {
    this.password_errormessage = '';
  this.confirmpassword_errormessage = '';

  // Validate Password
  if (!this.Password || this.Password.trim().length === 0) {
    // this.password_errormessage = 'Password required';
    // return;
      this.password_errormessage = 'Password required';
    } else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(this.Password)) {

      this.password_errormessage = 'Password must be atleast 8 characters with an uppercase letter and special character.';
    } else {
      this.password_errormessage = '';
  }

  // Validate Confirm Password
  if (!this.confirmpassword || this.confirmpassword.trim().length === 0) {
    this.confirmpassword_errormessage = 'Confirm your password';
    return;
  }

  // Check if Password and Confirm Password Match
  if (this.Password !== this.confirmpassword) {
    this.confirmpassword_errormessage = 'Please check, password is not matching';
    return;
  }

    if (this.validateForm()) {
      let val = {
        UserID: this.UserList[0].UserID,
        Password: this.Password,
        confirmpassword: this.confirmpassword,
        MOdifiedBy: 1,
      };
      
      this.service.updateUser(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          this.router.navigate(['/']);
          showSuccess(JSON.parse(data['message'])[0]['message']);
          this.UserID = 0;
          this.Password = '';
          this.Verification = false;
          this.Success = true;
          this.abc = false;
          this.router.navigate(['/Login/Home/']);
        } else if (data['status_code'] == 200) {
          showError(JSON.parse(data['message'])[0]['message']);
        }
      });
    }
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
