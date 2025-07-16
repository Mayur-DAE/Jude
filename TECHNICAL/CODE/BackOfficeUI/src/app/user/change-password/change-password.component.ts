import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare function closePopup(id: any): any;
declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(private service: SharedService, private_http: HttpClient) {}

  CurrentPassword: string = '';
  NewPassword: string = '';
  currentPasswordVisible: boolean = false;
  newPasswordVisible: boolean = false;
  passwordError: string = '';  
  isPasswordValid: boolean = false;  
  currentUser: any;
  
  ngOnInit(): void {
    const userData = localStorage.getItem('BoUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  validatePassword() {
    const password = this.NewPassword.trim(); 

    if (password.length < 8 ) {
      this.passwordError = 'Password must contain 8 characters.';
      this.isPasswordValid = false;
      return;
    }

    if (/\s/.test(password)) {
      this.passwordError = 'Password should not contain spaces.';
      this.isPasswordValid = false;
      return;
    }

    if (!/[A-Z]/.test(password)) {
      this.passwordError = 'Password must contain at least one uppercase letter.';
      this.isPasswordValid = false;
      return;
    }

    // if (!/[a-z]/.test(password)) {
    //   this.passwordError = 'Password must contain at least one lowercase letter.';
    //   this.isPasswordValid = false;
    //   return;
    // }

    // if (!/\d/.test(password)) {
    //   this.passwordError = 'Password must contain at least one number.';
    //   this.isPasswordValid = false;
    //   return;
    // }

    if (!/[\W_]/.test(password)) {
      this.passwordError = 'Password must contain at least one special character.';
      this.isPasswordValid = false;
      return;
    }

    // If all conditions pass
    this.passwordError = '';  
    this.isPasswordValid = true;
  }

  toggleCurrentPasswordVisibility() {
    this.currentPasswordVisible = !this.currentPasswordVisible;
  }

  toggleNewPasswordVisibility() {
    this.newPasswordVisible = !this.newPasswordVisible;
  }

  savePassword() {
    if (!this.CurrentPassword) {
      showDangerToast('Please enter the current password.');
      return;
    }
  
    if (!this.NewPassword) {
      showDangerToast('Please enter the new password.');
      return;
    }

    if (!this.isPasswordValid) {
      showDangerToast(this.passwordError);
      return;
    }
    
    var val = {
      UserID: this.currentUser?.UserID,
      OldPassword: this.CurrentPassword,
      Password: this.NewPassword, 
    };

    // this.service.changePassword(val).subscribe((data) => {
    //   if (data['status_code'] == 100) {
    //     showSuccessToast(JSON.parse(data['message'])[0]['message']);
    //   } else {
    //     showDangerToast(JSON.parse(data['message'])[0]['message']);
    //   }
    // });
    this.service.changePassword(val).subscribe(
      (data) => {
        if (data && data.status_code == 100) {
          showSuccessToast(JSON.parse(data.message)[0].message);
          closePopup('exampleModal-4');
          this.CurrentPassword =" ";
          this.NewPassword=" ";
          this.isPasswordValid = false;
        } else {
          showDangerToast(data.message);
        }
      },
      (error) => {
        if (error.error && error.error.message) {
          showDangerToast(error.error.message);
        } else {
          showDangerToast("Something went wrong! Please try again.");
        }
        
      }
      
    );
  }

  closeModal(){
    closePopup('exampleModal-4');
    this.CurrentPassword ="";
    this.NewPassword="";
    this.passwordError = '';  
    this.isPasswordValid = false;
  }
  
}
