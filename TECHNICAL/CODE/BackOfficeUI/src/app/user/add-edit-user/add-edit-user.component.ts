import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function closePopup(id: any): any;

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
})
export class AddEditUserComponent implements OnInit {
  User_firstname_errormsg = '';
  User_middlename_errormsg = '';
  User_lastname_errormsg = '';
  User_DOB_errormsg = '';
  User_Email_errormsg = '';
  User_Mobilenumber_errormsg = '';
  User_username_errormsg = '';
  User_password_errormsg = '';
  User_shopname_errormsg ='';

  errormsg = false;
  ShopName: any;
  constructor(private service: SharedService) {}
  enteredSearchValue: any;
  isNameSelected: any;
  CompanyNameSearch: any;
  currentPasswordVisible: boolean = false;

  @Output() emitData = new EventEmitter<boolean>();

  @Input() user: any;
  UserID: any;
  CompanyID: any;
  CompanyName:any;
  UserTypeID: any;
  UserRoleID: any;
  UserRoleName:any
  Username: any;
  Password: any;
  FirstName: any;
  MiddleName: any;
  LastName: any;
  EmaiID: any;
  MobileNumber: any;
  ProfilePicturePath: any;
  DateOfBirth: any;
  IsActive: any;
  UserTypeList: any = [];
  UserRoleList: any = [];
  CompanyList: any = [];
  Passfield: any = false;
  minDate: string = new Date().toISOString().split('T')[0]; 
  maxDate: string = new Date().toISOString().split('T')[0]; 

  showDropdown: boolean = false; // Control dropdown visibility
  isDataLoaded: boolean = false; // Prevent multiple calls
  showShopName: boolean = false;
  


  ngOnInit(): void {
    this.UserID = this.user.UserID;
    this.FirstName = this.user.FirstName;
    this.MiddleName = this.user.MiddleName;
    this.LastName = this.user.LastName;
    this.EmaiID = this.user.EmaiID;
    this.MobileNumber = this.user.MobileNumber;
    this.ProfilePicturePath = this.user.ProfilePicturePath;
    this.DateOfBirth = this.user.DateOfBirth;
    this.Username = this.user.Username;
    this.Password = this.user.Password;
    this.Passfield = this.user.Passfield;
    this.UserTypeID = this.user.UserTypeID;
    this.UserRoleID = this.user.UserRoleID;
    this.UserRoleName=this.user.UserRoleName;
    this.CompanyID = this.user.CompanyID;
    this.IsActive = this.user.IsActive;
    
console.log(" this.CompanyID ", this.user );

    this.loadUserTypeList();
    this.loadUserRoleList();
    this.loadCompanyList();
    if(!this.user.UserID){
      this.isPassValidate=true
    }
    console.log("this.isPassValidate",this.isPassValidate);
  }

  loadUserTypeList() {
    let val = { IsActive: 1 };
    this.service.getUsertypeList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.UserTypeList = JSON.parse(data['message']);
      }
    });
  }

  loadUserRoleList() {
    this.service.getUserRoleList().subscribe((data: any) => {
      this.UserRoleList = data;
      this.checkUserRole();
    });
    
  }

  loadCompanyList() {
    const CompanyID=this.CompanyID
    let val = {CompanyID};

    // this.service.getCompanyList(val).subscribe((data: any) => {
    //   this.CompanyList = data;
    // });

    this.service.getCompanyList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.CompanyList = JSON.parse(data['message']);
        console.log("this.CompanyList",this.CompanyList[0].CompanyName);
        this.CompanyName=this.CompanyList[0].CompanyName
    this.CompanyNameSearch=this.CompanyName;

      }
    });
  }
  toggleCurrentPasswordVisibility() {
    this.currentPasswordVisible = !this.currentPasswordVisible;
  }

  touchedFields = {
    FirstName: false,
    MiddleName: false,
    LastName: false,
    EmaiID: false,
    MobileNumber: false,
    DateOfBirth: false,
    Username:false,
    Password:false,
  };

  spaceRegex = /\s/;
  nameRegex = /^[A-Za-z]+$/;
  mobileRegex = /^[0-9]+$/;

 
  isPassValidate= false
  // validateInputs(): boolean {
  //   let isValid = true;
  //   this.errormsg = false; // ✅ Reset error state at the beginning
  
  //   console.log('FirstName:', this.FirstName);
  //   console.log('LastName:', this.LastName);
  //   console.log('MobileNumber:', this.MobileNumber);
  //   console.log('EmaiID:', this.EmaiID);
  //   console.log('Username:', this.Username);
  //   console.log('Password:', this.Password);
  //   console.log('UserRoleID:', this.UserRoleID);
  
  //   if (!this.FirstName?.trim()) {
  //     this.User_firstname_errormsg = 'First Name is required';
  //     this.errormsg = true;
  //     isValid = false;
  //   } else if (this.spaceRegex.test(this.FirstName)) {
  //     this.User_firstname_errormsg = 'Spaces are not allowed';
  //     this.errormsg = true;
  //     isValid = false;
  //   } else if (!this.nameRegex.test(this.FirstName)) {
  //     this.User_firstname_errormsg = 'Only alphabets are allowed';
  //     this.errormsg = true;
  //     isValid = false;
  //   } else {
  //     this.User_firstname_errormsg = '';
  //   }
  
  //   if (!this.LastName?.trim()) {
  //     this.User_lastname_errormsg = 'Last Name is required';
  //     this.errormsg = true;
  //     isValid = false;
  //   } else if (this.spaceRegex.test(this.LastName)) {
  //     this.User_lastname_errormsg = 'Spaces are not allowed';
  //     this.errormsg = true;
  //     isValid = false;
  //   } else if (!this.nameRegex.test(this.LastName)) {
  //     this.User_lastname_errormsg = 'Only alphabets are allowed';
  //     this.errormsg = true;
  //     isValid = false;
  //   } else {
  //     this.User_lastname_errormsg = '';
  //   }
  
  //   if (!this.MobileNumber?.trim()) {
  //     this.User_Mobilenumber_errormsg = 'Please enter mobile no.';
  //     this.errormsg = true;
  //     isValid = false;
  //   } else if (!this.mobileRegex.test(this.MobileNumber)) {
  //     this.User_Mobilenumber_errormsg = 'Please enter numbers only';
  //     this.errormsg = true;
  //     isValid = false;
  //   } else {
  //     this.User_Mobilenumber_errormsg = ''; 
  //   }
  
  //   if (!this.EmaiID?.trim()) {
  //     this.User_Email_errormsg = 'Please enter email';
  //     this.errormsg = true;
  //     isValid = false;
  //   } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.EmaiID)) {
  //     this.User_Email_errormsg = 'Please enter a valid email';
  //     this.errormsg = true;
  //     isValid = false;
  //   } else {
  //     this.User_Email_errormsg = ''; 
  //   }
  
  //   if (!this.Username?.trim()) {
  //     this.User_username_errormsg = 'Please enter username';
  //     this.errormsg = true;
  //     isValid = false;
  //   } else {
  //     this.User_username_errormsg = ''; 
  //   }
  // if(this.isPassValidate){
  //   if (!this.Password?.trim()) {
  //     this.User_password_errormsg = 'Please enter password';
  //     this.errormsg = true;
  //     isValid = false;
  //   } else if (this.Password.length < 8 || this.Password.length > 16) {
  //     this.User_password_errormsg = 'Password must be between 8 to 16 characters long';
  //     this.errormsg = true;
  //     isValid = false;
  //   } else if (/\s/.test(this.Password)) {
  //     this.User_password_errormsg = 'Password should not contain spaces';
  //     this.errormsg = true;
  //     isValid = false;
  //   } else if (!/[A-Z]/.test(this.Password)) {
  //     this.User_password_errormsg = 'Password must contain at least one uppercase letter';
  //     this.errormsg = true;
  //     isValid = false;
  //   } else if (!/[a-z]/.test(this.Password)) {
  //     this.User_password_errormsg = 'Password must contain at least one lowercase letter';
  //     this.errormsg = true;
  //     isValid = false;
  //   } else if (!/[0-9]/.test(this.Password)) {
  //     this.User_password_errormsg = 'Password must contain at least one number';
  //     this.errormsg = true;
  //     isValid = false;
  //   } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.Password)) {
  //     this.User_password_errormsg = 'Password must contain at least one special character';
  //     this.errormsg = true;
  //     isValid = false;
  //   } else {
  //     this.User_password_errormsg = ''; 
  //   }
  // }
  //   if (this.UserRoleID == 2) {
  //     if (!this.CompanyNameSearch?.trim()) {
  //       this.User_shopname_errormsg = 'Shop Name is required for Vendors';
  //       this.errormsg = true;
  //       isValid = false;
  //     } else {
  //       this.User_shopname_errormsg = ''; 
  //     }
  //   }
  
  //   return isValid;
  // }

  validateInputs(): boolean {
  this.User_firstname_errormsg = '';
  this.User_lastname_errormsg = '';
  this.User_Email_errormsg = '';
  this.User_Mobilenumber_errormsg = '';
  this.User_username_errormsg = '';
  this.User_password_errormsg = '';
  this.User_DOB_errormsg = '';

  let valid = true;

  if (!this.FirstName?.trim()) {
    this.User_firstname_errormsg = 'First Name is required';
    valid = false;
  }

  if (!this.LastName?.trim()) {
    this.User_lastname_errormsg = 'Last Name is required';
    valid = false;
  }

  if (!this.EmaiID?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.EmaiID)) {
    this.User_Email_errormsg = 'Valid email is required';
    valid = false;
  }

  if (!this.MobileNumber?.trim() || !/^\d{10}$/.test(this.MobileNumber)) {
    this.User_Mobilenumber_errormsg = 'Valid 10-digit mobile number is required';
    valid = false;
  }

  if (!this.Username?.trim()) {
    this.User_username_errormsg = 'Username is required';
    valid = false;
  }

  // if (!this.Password?.trim() || this.Password.length < 8) {
  //   this.User_password_errormsg = 'Password must be at least 8 characters';
  //   valid = false;
  // }
    // Validate Password
  if (!this.Password || this.Password.trim().length === 0) {
    // this.password_errormessage = 'Password required';
    // return;
      this.User_password_errormsg = 'Password required';
    } else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(this.Password)) {

      this.User_password_errormsg = 'Password must be atleast 8 characters with an uppercase letter and special character.';
    } else {
      this.User_password_errormsg = '';
  }

  if (!this.DateOfBirth) {
    this.User_DOB_errormsg = 'Date of Birth is required';
    valid = false;
  }

  return valid;
}

  
  setAllTouched() {
  return {
    FirstName: true,
    LastName: true,
    MiddleName: true,
    EmaiID: true,
    MobileNumber: true,
    Username: true,
    Password: true,
    DateOfBirth: true
  };
}

  updateUser() {

    if (!this.validateInputs()) {
      return; 
    }

    var val = {
      UserID: this.UserID,
      CompanyID: this.CompanyID,
      UserTypeID: this.UserTypeID,
      UserRoleID: this.UserRoleID,
      Username: this.Username,
      // Password: this.Password,
      FirstName: this.FirstName,
      MiddleName: this.MiddleName,
      LastName: this.LastName,
      EmaiID: this.EmaiID,
      MobileNumber: this.MobileNumber,
      ProfilePicturePath: this.ProfilePicturePath,
      DateOfBirth: this.DateOfBirth,
      IsActive: this.IsActive,
      ModifiedBy: this.service.currentUserID,
    };
    console.log(val);

    this.service.updateUser(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
        

        //Closing module popup using js function
        closePopup('userModal');

        //sending false value to ShowCompont to destroy this component
        this.emitData.emit(false);
        this.UserID = 0;
        this.CompanyID = 0;
        this.UserTypeID = 0;
        this.UserRoleID = 0;
        this.Username = '';
        this.Password = '';
        this.FirstName = '';
        this.MiddleName = '';
        this.LastName = '';
        this.EmaiID = '';
        this.MobileNumber = '';
        this.ProfilePicturePath = '';
        this.DateOfBirth = '';
        this.IsActive = false;
      } else if (data['status_code'] == 300) {
        showDangerToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showDangerToast('Some error occured, data not saved');
      }
    });
  }

//   addUser() {
//     // this.User_firstname_errormsg = '';
//     // if (this.FirstName.trim().length === 0) {
//     //   this.User_firstname_errormsg = 'please enter  first name';
//     //   this.errormsg = true;
//     // }
//     // this.User_middlename_errormsg = '';
//     // if (this.MiddleName.trim().length === 0) {
//     //   this.User_middlename_errormsg = 'please enter middle name';
//     //   this.errormsg = true;
//     // }
//     // this.User_lastname_errormsg = '';
//     // if (this.LastName.trim().length === 0) {
//     //   this.User_lastname_errormsg = 'please enter last name';
//     //   this.errormsg = true;
//     // }
//     // this.User_DOB_errormsg = '';
//     // if (this.MiddleName.trim().length === 0) {
//     //   this.User_DOB_errormsg = 'please enter Date Of Birth';
//     //   this.errormsg = true;
//     // }
//     // this.User_Email_errormsg = '';
//     // if (this.MiddleName.trim().length === 0) {
//     //   this.User_Email_errormsg = 'please enter Email';
//     //   this.errormsg = true;
//     // }
//     // this.User_Mobilenumber_errormsg = '';
//     // if (this.MiddleName.trim().length === 0) {
//     //   this.User_Mobilenumber_errormsg = 'please enter Mobile Number';
//     //   this.errormsg = true;
//     // }
//     // this.User_username_errormsg = '';
//     // if (this.MiddleName.trim().length === 0) {
//     //   this.User_username_errormsg = 'please enter User name';
//     //   this.errormsg = true;
//     // }
//     // this.User_password_errormsg = '';
//     // if (this.MiddleName.trim().length === 0) {
//     //   this.User_password_errormsg = 'please enter password';
//     //   this.errormsg = true;
//     // } 
// console.log("validation of password",this.isPassValidate);

//     if (!this.validateInputs()) {
//       return; 
//     }
  
//       // this.errormsg = false;
//       var val = {
//         CompanyID: this.CompanyID,
//         UserTypeID: this.UserTypeID,
//         UserRoleID: this.UserRoleID,
//         Username: this.Username,
//         Password: this.Password,
//         FirstName: this.FirstName,
//         MiddleName: this.MiddleName,
//         LastName: this.LastName,
//         EmaiID: this.EmaiID,
//         MobileNumber: this.MobileNumber,
//         ProfilePicturePath: this.ProfilePicturePath,
//         DateOfBirth: this.DateOfBirth,
//         IsActive: this.IsActive,
//         CreatedBy: this.service.currentUserID,
//       };
//       console.log(val);
//       this.service.addUser(val).subscribe((data) => {
//         if (data['status_code'] == 100) {
//           closePopup('userModal');
//           this.emitData.emit(false);
//           showSuccessToast(JSON.parse(data['message'])[0]['message']);
//         } else if (data['status_code'] == 300) {
//           showDangerToast(JSON.parse(data['message'])[0]['message']);
//         } else {
//           showDangerToast('Some error occured, data not saved');
//         }
//       });
//       console.log('disabled',this.validateInputs(),316);
//           console.log(val);
//   }

addUser() {
  console.log("validation of password", this.isPassValidate);

  // Call validation and block submission if invalid
  if (!this.validateInputs()) {
    return; // Stop here if validation fails
  }

  // Construct payload
  const val = {
    CompanyID: this.CompanyID,
    UserTypeID: this.UserTypeID,
    UserRoleID: this.UserRoleID,
    Username: this.Username,
    Password: this.Password,
    FirstName: this.FirstName,
    MiddleName: this.MiddleName,
    LastName: this.LastName,
    EmaiID: this.EmaiID,
    MobileNumber: this.MobileNumber,
    ProfilePicturePath: this.ProfilePicturePath,
    DateOfBirth: this.DateOfBirth,
    IsActive: this.IsActive,
    CreatedBy: this.service.currentUserID,
  };

  console.log("User Payload:", val);

  this.service.addUser(val).subscribe((data) => {
    if (data['status_code'] === 100) {
      closePopup('userModal');
      this.emitData.emit(false);
      showSuccessToast(JSON.parse(data['message'])[0]['message']);
    } else if (data['status_code'] === 300) {
      showDangerToast(JSON.parse(data['message'])[0]['message']);
    } else {
      showDangerToast('Some error occurred, data not saved');
    }
  });
}


  onCompanyNameType() {
    if (!this.CompanyNameSearch?.trim()) {
      // When input is cleared, show full company list
      this.fetchFullCompanyList();
      return;
    }
  
    let val: any = { CompanyName: this.CompanyNameSearch };
  
    this.service.getCompanyList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.CompanyList = JSON.parse(data['message']);
        this.CompanyID=this.CompanyList[0].CompanyID;
        console.log(" this.CompanyList", this.CompanyList[0].CompanyID);
        
        this.showDropdown = true; // Show list when searching
      }
    });
  }
  
  onFocusInput() {
    if (!this.CompanyNameSearch?.trim()) {
      // If input is empty, fetch the full list on focus
      this.fetchFullCompanyList();
    } else {
      this.showDropdown = true; // Show list if already loaded
    }
  }
  
  onSelectName(CompanyList?: any) {
    this.CompanyNameSearch = CompanyList?.CompanyName;
    this.CompanyID = CompanyList?.CompanyID;
    this.showDropdown = false; // Hide list after selection
  }
  
  onBlurInput() {
    setTimeout(() => {
      this.showDropdown = false; // Hide dropdown when clicking outside
    }, 200);
  }
  
  fetchFullCompanyList() {
    this.service.getCompanyList({}).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.CompanyList = JSON.parse(data['message']);
        this.showDropdown = true; // Show full list when input is cleared
        this.isDataLoaded = true;
      }
    });
  }



checkUserRole() {
  const selectedRole = this.UserRoleList.find(
    (role: { UserRoleID: any; }) => role.UserRoleID == this.UserRoleID
  );

  this.showShopName = selectedRole?.UserRoleName.toLowerCase() === 'vendor';
}

  
}
