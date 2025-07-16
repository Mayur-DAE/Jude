import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { VerificationComponent } from './verification/verification.component';
declare function closePopup(id: any):any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private servive: SharedService, private router: Router) {
    servive.isAuthenticated = false;
  }
  @ViewChild(VerificationComponent) verificationComponent!: VerificationComponent;
  resetVerificationInput() {
    if (this.verificationComponent) {
      this.verificationComponent.resetInput(); 
    }
  }

  ModalTitle: any;
  verification: boolean = true; 
  changetype: any = true;
  visible: any = true;
  errorMessage: string = '';

  UserList: any = [];

  userID: string = '';
  userPass: string = '';

  response: any = {};

  ngOnInit(): void {}

  replacer(i: any, val: any) {
    if (i === 'Password') {
      return undefined;
    } else {
      return val;
    }
  }
  viewpassword() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
 
  login() {
    if (!this.userID && !this.userPass) {
      alert("Please enter Username and Password");
      return;
    }

    if (!this.userID) {
      alert("Please enter Username");
      return;
    }

    if (!this.userPass) {
      alert("Please enter Password");
      return;
    }

    var val = { Username: this.userID, Password: this.userPass };
    this.servive.getLogin(val).subscribe((res) => {
      this.response = res;
      console.log("vijayreso", this.response);

      if (this.response['status_code'] == 100) {
        this.UserList = JSON.parse(this.response['message'])[0];
        console.log("this.UserList ", this.UserList);
        localStorage.setItem('Token', this.UserList.Token);
        localStorage.setItem(
          'BoUser',
          JSON.stringify(this.UserList, this.replacer)
        );
        this.router.navigate(['/Home']);
        this.servive.isAuthenticated = true;

        // // Force page reload to ensure scripts and styles are loaded
        // window.location.href = "/Home"; // Use full URL navigation
      } else if (this.response['status_code'] == 300) {
        alert(this.response['message']);
      }
      else {
        console.log(this.response);
        alert(this.response['message']);
      }
    });
  }

  closeModal(){
    closePopup('verificationModal');
  }
}
