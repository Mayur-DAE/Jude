import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
declare function showSuccess(message: any): any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  FirstName = '';
  FirstName_errormessage = '';

  LastName = '';
  LastName_errormessage = '';

  EmailID = '';
  emailaddress_errormessage = '';

  MobileNumber = '';
  mobilenumber_errormessage = '';

  Message = '';
  message_errormessage = '';
  constructor( private sharedservice: SharedService,) { }

  ngOnInit(): void {
  }
  validateForm(): boolean {
    let isFormValid = true;
  
    const trimmedFirstName = this.FirstName?.trim() || '';
    const trimmedLastName = this.LastName?.trim() || '';
    const trimmedEmail = this.EmailID?.trim() || '';
    const trimmedMobileNumber = this.MobileNumber?.trim() || '';
    const trimmedMessage = this.Message?.trim() || '';

    // Clear previous error messages
    this.FirstName_errormessage = '';
    this.LastName_errormessage = '';
    this.emailaddress_errormessage = '';
    this.mobilenumber_errormessage = '';
    this.message_errormessage = '';
    // Validate First Name
    if (trimmedFirstName.length === 0) {
      this.FirstName_errormessage = 'Please enter your first name';
      isFormValid = false;
    } else if (!/^(?! )[a-zA-Z]+( [a-zA-Z]+)*$/.test(trimmedFirstName)) {
      this.FirstName_errormessage = 'Invalid format. Only alphabets allowed, with no extra spaces';
      isFormValid = false;
    }
  
    // Validate Last Name
    if (trimmedLastName.length === 0) {
      this.LastName_errormessage = 'Please enter your last name';
      isFormValid = false;
    } else if (!/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(trimmedLastName)) {
      this.LastName_errormessage = 'Invalid format. Only alphabets allowed, with no extra spaces';
      isFormValid = false;
    }
  
    // Validate Email
    if (trimmedEmail.length === 0) {
      this.emailaddress_errormessage = 'Please enter your email address';
      isFormValid = false;
    } else if (!/^\S+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
      this.emailaddress_errormessage = 'Invalid email format. No spaces allowed';
      isFormValid = false;
    }
  
    // Validate Mobile Number
    if (trimmedMobileNumber.length === 0) {
      this.mobilenumber_errormessage = 'Please enter mobile number';
      isFormValid = false;
    } else if (!/^[0-9]+$/.test(trimmedMobileNumber)) {
      this.mobilenumber_errormessage = 'Invalid format.';
      isFormValid = false;
    } else if (trimmedMobileNumber.length !== 10) {
      this.mobilenumber_errormessage = 'Mobile number must contain 10 digits';
      isFormValid = false;
    }
    if (trimmedMessage.length === 0) {
      this.message_errormessage = 'Please enter message';
      isFormValid = false;
    }
    return isFormValid;
  }
  
  // Call validateForm() before submission
  Submit() {
    if (this.validateForm()) {
      
    let val = {
      FirstName: this.FirstName,
      LastName: this.LastName,
      EmailID: this.EmailID,
      MobileNumber: this.MobileNumber,
      Message: this.Message,
    };
  
    this.sharedservice.insertenquiry(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccess(JSON.parse(data['message'])[0]['message']);
          // Reset form fields
          this.FirstName = '';
          this.LastName = '';
          this.EmailID = '';
          this.MobileNumber = '';
          this.Message = '';
  
          // Clear error messages
          this.FirstName_errormessage = '';
          this.LastName_errormessage = '';
          this.emailaddress_errormessage = '';
          this.mobilenumber_errormessage = '';
          this.message_errormessage = '';
      } else {
        console.error('Some error occurred, data not saved');
      }
    });
  }
}
}
