import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function closePopup(id: any): any;
// declare function bindDataTable(id: any): any;
// declare function clearDataTable(): any;
declare function excelExport(id: any, name: string): any;

interface Users{
  SrNo : string;
  FirstName:string;
  LastName: string;
  UserType:string;
  EmaiID: string;
  MobileNumber:number;
  IsActive:boolean;
}

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css'],
})
export class ShowUserComponent implements OnInit {
  ConfirmPassword: any;
  NewPassword: any;
  memberList: any = [];
  ModalTitle: any;
  ActivateAddEditfaq: boolean = false;
  user: any;
  IsApproved: any;
  bindDataTableDoIt = true;
  FirstName = '';
  LastName = '';
  Email = '';
  IsActive: any = true;
  UserID: any;
  changetype: any = true;
  visible: any = true;
  confirmPasswordVisible: boolean = false;
  newPasswordVisible: boolean = false;
  passwordMismatch: boolean = false;
  firstNameError: string = '';
  lastNameError: string = '';
  User_password_errormsg: string ='';
  User_confirmPassword_errormsg:string ='';
  isPasswordValid: boolean = true;
  currentPage = 1;
  itemsPerPage = 5;

  // @Output() emitData = new EventEmitter<boolean>();
  ngOnInit(): void {
    // this.refresMemberList();
    this.search();
  }

  validatePasswords() {

    this.User_password_errormsg = '';
    this.passwordMismatch = false;
    this.isPasswordValid = true;

    const passwordRegex = {
      // length: /^.{8,16}$/, 
      // space: /\s/,
      // uppercase: /[A-Z]/, 
      // lowercase: /[a-z]/, 
      // number: /[0-9]/, 
      // specialChar: /[!@#$%^&*(),.?":{}|<>]/ 
      length: /^.{8,}$/, // At least 8 characters
      space: /\s/, // Still valid if you want to disallow spaces
      uppercase: /[A-Z]/, // At least one uppercase
      specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/ // At least one special character

    };
  
    if (!passwordRegex.length.test(this.NewPassword)) {
      this.User_password_errormsg = 'Password must contain minimum 8!';
      this.isPasswordValid = false;
    } else if (passwordRegex.space.test(this.NewPassword)) {
      this.User_password_errormsg = 'Password should not contain spaces!';
      this.isPasswordValid = false;
    } else if (!passwordRegex.uppercase.test(this.NewPassword)) {
      this.User_password_errormsg = 'Password must contain at least one uppercase letter!';
      this.isPasswordValid = false;
    }
    //  else if (!passwordRegex.lowercase.test(this.NewPassword)) {
    //   this.User_password_errormsg = 'Password must contain at least one lowercase letter!';
    //   this.isPasswordValid = false;
    // } else if (!passwordRegex.number.test(this.NewPassword)) {
    //   this.User_password_errormsg = 'Password must contain at least one number!';
    //   this.isPasswordValid = false;
    // } 
    else if (!passwordRegex.specialChar.test(this.NewPassword)) {
      this.User_password_errormsg = 'Password must contain at least one special character!';
      this.isPasswordValid = false;
    }
  
  
    if (this.isPasswordValid) {
      if (this.ConfirmPassword && this.NewPassword !== this.ConfirmPassword) {
    this.passwordMismatch = true;
    this.User_confirmPassword_errormsg = 'Passwords do not match!';
  } else {
    this.passwordMismatch = false;
    this.User_confirmPassword_errormsg = '';
  }
    }
  }
  

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  toggleNewPasswordVisibility() {
    this.newPasswordVisible = !this.newPasswordVisible;
  }

  constructor(private service: SharedService) {}

  emittedDataByChild(data: boolean) {
    this.ActivateAddEditfaq = data;
    if (!data) {
      this.refresMemberList();
      this.search();
    }
  }

  viewpassword() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  changepassword(item: any) {
    this.UserID = item.UserID;
    this.ModalTitle = 'Change Password';
    // alert(this.UserID)
  }

  savePassword() {
    if (this.NewPassword == this.ConfirmPassword) {
      let val = {
        UserID: this.UserID,
        Password: this.ConfirmPassword,
        ModifiedBy: 1,
      };
      console.log(val);
      this.service.updateUser(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          showSuccessToast(JSON.parse(data['message'])[0]['message']);
          //Closing module popup using js function
          closePopup('userModal1');

          this.UserID = 0;
          this.ConfirmPassword = '';
          this.NewPassword = '';
        } else if (data['status_code'] == 300) {
          showDangerToast(JSON.parse(data['message'])[0]['message']);
        } else {
          showDangerToast('Some error occured, data not saved');
        }
      });
    } else {
      alert('Check the password');
    }
  }
  addClick() {
    this.user = {
      UserID: 0,
      FirstName: '',
      MiddleName: '',
      LastName: '',
      EmaiID: '',
      DateOfBirth: '',
      MobileNumber: '',
      Username: '',
      Password: '',
      Passfield: true,
      IsActive: true,
    };
    this.ModalTitle = 'Add User';
    this.ActivateAddEditfaq = true;
  }

  closeClick() {
    this.ActivateAddEditfaq = false;
    //this.refresMemberList();
    this.search();
    

  }
  closeClick1() {
    this.NewPassword= '';
    this.ConfirmPassword= '';
     this.User_confirmPassword_errormsg = '';
     this.User_password_errormsg = '';
  }

  editClick(item: any) {
    this.user = item;
    this.ModalTitle = 'Edit User';
    this.ActivateAddEditfaq = true;
  }

  refresMemberList() {
    let val = {};
    this.service.getUsersList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.memberList = JSON.parse(data['message']);
      }
    });
  }

  activeClick(item: any) {
    var val = {
      UserID: item.UserID,
      ModifiedBy: this.service.currentUserID,
    };

    this.service.setUserInactive(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast("User Inactivated Successfully");
      } else if (data['status_code'] == 300) {
        showDangerToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showDangerToast('Some error occured, data not saved');
      }
      // this.refresMemberList();
      this.search();
    });
  }

  inactiveClick(item: any) {
    var val = {
      UserID: item.UserID,
      ModifiedBy: this.service.currentUserID,
    };

    this.service.setUserActive(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast("User Activated Successfully");
      } else if (data['status_code'] == 300) {
        showDangerToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showDangerToast('Some error occured, data not saved');
      }

      // this.refresMemberList();
      this.search();
    });
  }

  bindDataTable() {
    // if (this.bindDataTableDoIt) {
    //  // bindDataTable('user-listing');
    //   this.bindDataTableDoIt = false;
    // }
  }

  clearDataTablejs() {
    // if(this.bindDataTableDoIt){
    //   bindDataTable('user-listing');
    //   this.bindDataTableDoIt = false;
    // }
    // clearDataTable();
  }
  clearFilters() {
    this.FirstName = '';
    this.LastName = '';
    this.Email = '';
    this.IsActive = true; // Set default state
    this.firstNameError = '';
    this.lastNameError = '';
    // this.clearDataTablejs();

    // Fetch all data
    this.search(true);
  }
  
  search(isReset: boolean = false) {
    this.currentPage = 1;
    this.clearDataTablejs();
    this.memberList = [];
    this.bindDataTableDoIt = true;
  
    var val: any = {};
  
    // if (!isReset) { // Run validation only when not resetting filters
      if (this.FirstName?.trim().length !== 0) {
        const nameRegex = /^[A-Za-z\s]+$/; // Allows spaces
        if (!nameRegex.test(this.FirstName)) {
          this.firstNameError = "Only alphabets are allowed!";
        } else {
          this.firstNameError = "";
          val.FirstName = this.FirstName.trim();
        }
      }
  
      if (this.LastName?.trim().length !== 0) {
        const nameRegex = /^[A-Za-z\s]+$/; // Allows spaces
        if (!nameRegex.test(this.LastName)) {
          this.lastNameError = "Only alphabets are allowed!";
        } else {
          this.lastNameError = "";
          val.LastName = this.LastName.trim();
        }
      }
  
      if (this.Email?.trim().length !== 0) {
        val.EmaiID = this.Email.trim();
      }
  
      
    // }
    if (typeof this.IsActive !== "undefined") {
      val.IsActive = this.IsActive;
      console.log("val.IsActive ",val.IsActive );
      
    }
  
    console.log("Filter Values: ", val);
  
    if (!this.firstNameError && !this.lastNameError) {
      this.service.getUsersList(val).subscribe((data) => {
        if (data["status_code"] == 100) {
          this.memberList = JSON.parse(data["message"]);
        }
        console.log("Updated Member List: ", this.memberList);
      });
    }
  }
  


  
  // exportToExcel() {
  //   excelExport('show-user', 'User');
  //   console.log(this.memberList);
  // }

  exportToExcel(): void {
    let htmlContent = `
      <table border="1">
        <thead>
          <tr>
            <th><b>Sr No</b></th>
            <th><b>Name</b></th>
            <th><b>Type</b></th>
            <th><b>Email</b></th>
            <th><b>Mobile Number</b></th>
            <th><b>Status</b></th>
          </tr>
        </thead>
        <tbody>
    `;
  
    this.memberList.forEach((user: Users, index: number) => {
      const fullName = `${user.FirstName} ${user.LastName}`;
      const status = user.IsActive ? "Active" : "Inactive";
  
      htmlContent += `
        <tr>
          <td>${index + 1}</td>  <!-- Dynamic Sr No -->
          <td>${fullName}</td>
          <td>${user.UserType}</td>
          <td>${user.EmaiID}</td>
          <td>${user.MobileNumber}</td>
          <td>${status}</td>
        </tr>
      `;
    });
  
    htmlContent += `</tbody></table>`;
  
    let blob = new Blob([htmlContent], { type: "application/vnd.ms-excel" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "Users.xls";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  
  get paginatedMember() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.memberList.slice(start, start + this.itemsPerPage);
  }
  
  get totalPages() {
    return Math.ceil(this.memberList.length / this.itemsPerPage);
  }
  
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }
  
  min(a: number, b: number) {
    return Math.min(a, b);
  }
  
  getMiddlePages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    
    if (total <= 5) return Array.from({ length: total - 2 }, (_, i) => i + 2);
  
    if (current <= 3) return [2, 3, 4,5];
    if (current >= total - 2) return [total - 3, total - 2, total - 1];
  
    return [current - 1, current, current + 1];
  }
  
  onItemsPerPageChange(event: Event) {
    this.itemsPerPage = +(event.target as HTMLSelectElement).value;
    this.currentPage = 1;
  }
   
  
}
