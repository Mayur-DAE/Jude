import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function closePopup(id: any): any;
@Component({
  selector: 'app-add-edit-offers',
  templateUrl: './add-edit-offers.component.html',
  styleUrls: ['./add-edit-offers.component.css'],
})
export class AddEditOffersComponent implements OnInit {
  @Output() emitData = new EventEmitter<boolean>();
  Offer_name_errormsg = '';
  Offer_CompanyName_errormsg = '';
  OfferDescription_errormsg = '';
  OfferStartDate_errormsg = '';
  OfferEndDate_errormsg = '';
  OfferDiscount_errormsg = '';
  OfferDiscountType_errormsg = '';
  errormsg = false;
  currentDate: string = "";
  minDate: string = "";
  dateErrorMessage: string = "";
  discountErrorMessage: string = '';
  constructor(private service: SharedService, private_http: HttpClient) {
    this.setCurrentDate();
  }
  @Input() offer: any;
  @Input() isEditMode: boolean = false; // Receive edit mode status
  OfferID: any;
  OfferName: any;
  CompanyName: any;
  OfferDescription: any;
  OfferStartDate: any;
  OfferEndDate: any;
  OfferDiscount: number | null = null;
  OfferDiscountType: string = 'percentage';
  CreatedBy: any;
  ModifiedBy: any;
  CompanyList: any;
  CompanyID: any;


  touchedFields = {
    OfferName: false,
  }

  setCurrentDate() {
    const today = new Date();
    this.currentDate = today.toISOString().split("T")[0]; 
  }

  updateEndDateMin() {
    if (!this.OfferStartDate) {
      this.dateErrorMessage = "Please select the start date first";
      this.OfferEndDate = ""; 
    } else {
      this.dateErrorMessage = ""; 
      this.minDate = this.OfferStartDate; 
    }

  }
  validateInputs(): boolean {
    let isValid = true;
  
    // if (!this.OfferName?.trim()) {
    //   this.Offer_name_errormsg = 'Offer Name is required';
    //   isValid = false;
    // } else {
    //   this.Offer_name_errormsg = '';
    // }
  
    const discountValue = Number(this.OfferDiscount);
    if (this.OfferDiscountType === 'percentage') {
      if (discountValue > 100 || discountValue < 0) {
        this.discountErrorMessage = 'Discount must be between 0 and 100';
        isValid = false;
      } else {
        this.discountErrorMessage = '';
      }
    } else if (this.OfferDiscountType === 'value') {
      if (discountValue < 0) {
        this.discountErrorMessage = 'Discount cannot be negative';
        isValid = false;
      } else {
        this.discountErrorMessage = '';
      }
    }
  
    return isValid;
  }
  

  ngOnInit(): void {
    this.OfferID = this.offer.OfferID;
    this.OfferName = this.offer.OfferName;
    this.CompanyName = this.offer.CompanyName;
    (this.OfferDescription = this.offer.OfferDescription),
      (this.OfferStartDate = this.offer.OfferStartDate);
    this.OfferEndDate = this.offer.OfferEndDate;
    this.OfferDiscount = this.offer.OfferDiscount;
    this.OfferDiscountType = this.offer.OfferDiscountType;
    
    this.CompanyID = this.offer.CompanyID;
    this.loadCompanyList();
  }

  loadCompanyList() {
    let currentUser = localStorage.getItem('BoUser');
  
    if (currentUser) {
      let user = JSON.parse(currentUser);
      let val: any = {};
  
      // If the user is not an Admin, filter companies based on their assigned CompanyID
      if (user.CompanyID && user.CompanyID !== 1) { 
        val.CompanyID = user.CompanyID;
      }
  
      this.service.GetCompany(val).subscribe((data) => {
        if (data["status_code"] == 100) {
          this.CompanyList = JSON.parse(data["message"]);
          
          // If the user is a ShopOwner, set the default selected company
          if (user.CompanyID && user.CompanyID !== 1) {
            this.CompanyID = user.CompanyID;
          }
        } else {
          this.CompanyList = [];
          console.log("No companies available.");
        }
      });
    }
  }
  
    addOffers() {
        this.errormsg = false; // 🔁 Reset error flag at the start


      this.Offer_name_errormsg = '';
      if (this.OfferName.trim().length === 0) {
        this.Offer_name_errormsg = 'Please enter name';
        this.errormsg = true;
      }

      this.Offer_CompanyName_errormsg = '';
      if (!this.CompanyID) {
        this.Offer_CompanyName_errormsg = 'Please select a shop name';
        this.errormsg = true;
      }
      
      this.OfferDescription_errormsg = '';
      if (this.OfferDescription.trim().length === 0) {
        this.OfferDescription_errormsg = 'Please enter description';
        this.errormsg = true;
      }

      this.OfferStartDate_errormsg = '';
      if (this.OfferStartDate.trim().length === 0) {
        this.OfferStartDate_errormsg = 'Please select start date';
        this.errormsg = true;
      }
      
      this.OfferEndDate_errormsg = '';
      if (this.OfferEndDate.trim().length === 0) {
        this.OfferEndDate_errormsg = 'Please select end date';
        this.errormsg = true;
      }
      const discountValue = Number(this.OfferDiscount);
      let isValid = true;

      this.OfferDiscount_errormsg = '';
      if (!this.OfferDiscountType || !this.OfferDiscount) {
        if (!this.OfferDiscountType) {
          this.OfferDiscountType_errormsg = 'Please select discount type';
          this.errormsg = true;

        }
        else {
    this.OfferDiscountType_errormsg = ''; // ✅ clear error when field is valid
  }
        if (!this.OfferDiscount) {
          this.OfferDiscount_errormsg = 'Please enter discount';
          this.errormsg = true;

        }
        else {
    this.OfferDiscount_errormsg = ''; // ✅ clear error when field is valid
  }
        // this.errormsg = true;
        return;
      }

      if (!this.OfferDiscount) {
        
        this.OfferDiscount_errormsg = 'Please enter discount ';
        this.errormsg = true;
        return;
      }
     else if (this.OfferDiscountType === 'percentage') {
        if (discountValue > 100 || discountValue < 0) {
          this.OfferDiscount_errormsg = 'Discount must be between 1 and 100';
          isValid = false;
        } else {
          this.OfferDiscount_errormsg = '';
        }
      } else if (this.OfferDiscountType === 'value') {
        if (discountValue < 0) {
          this.OfferDiscount_errormsg = 'Discount cannot be negative';
          isValid = false;
        } else {
          this.OfferDiscount_errormsg = '';
        }
      }
    

      this.OfferDiscountType_errormsg = '';
      if (!this.OfferDiscountType) {
        this.OfferDiscountType_errormsg = 'Please select discount type';
        this.errormsg = true;
        return;
      }
 
        if(this.OfferEndDate < this.OfferStartDate){
        this.dateErrorMessage = "End Date must be greater than start date"
        this.OfferEndDate=''
        return
      }
      if ( !this.validateInputs()) {
        return;
      }
    

      var val = {
        CompanyID: this.CompanyID,
        OfferName: this.OfferName,
        CompanyName: this.CompanyID,
        OfferDescription: this.OfferDescription,
        OfferStartDate: this.OfferStartDate,
        OfferEndDate: this.OfferEndDate,
        OfferDiscount: this.OfferDiscount || 0,
        OfferDiscountType: this.OfferDiscountType,
        CreatedBy:this.service.currentUserID || 0,
      };
      this.service.AddOffers(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          closePopup('offersModal');
            //sending false value to ShowCompont to destroy this component
            this.emitData.emit(false);

          showSuccessToast(JSON.parse(data['message'])[0]['message']);
        } else if (data['status_code'] == 300) {
          showDangerToast(JSON.parse(data['message'])[0]['message']);
        } else {
          showDangerToast('Some error occured, data not saved');
        }
      });
    }
updateOffers() {
  this.errormsg = false;
  this.dateErrorMessage = '';

  // Date validation
  if (this.OfferEndDate < this.OfferStartDate) {
    this.dateErrorMessage = "End Date must be greater than start date";
    this.OfferEndDate = '';
    this.errormsg = true;
  }

  // Offer Name
  this.Offer_name_errormsg = '';
  if (this.OfferName.trim().length === 0) {
    this.Offer_name_errormsg = 'Please enter name';
    this.errormsg = true;
  }

  // Company Name
  this.Offer_CompanyName_errormsg = '';
  if (!this.CompanyID) {
    this.Offer_CompanyName_errormsg = 'Please select a shop name';
    this.errormsg = true;
  }

  // Description
  this.OfferDescription_errormsg = '';
  if (this.OfferDescription.trim().length === 0) {
    this.OfferDescription_errormsg = 'Please enter description';
    this.errormsg = true;
  }

  // Start Date
  this.OfferStartDate_errormsg = '';
  if (!this.OfferStartDate || this.OfferStartDate.trim().length === 0) {
    this.OfferStartDate_errormsg = 'Please select start date';
    this.errormsg = true;
  }

  // End Date
  this.OfferEndDate_errormsg = '';
  if (!this.OfferEndDate || this.OfferEndDate.trim().length === 0) {
    this.OfferEndDate_errormsg = 'Please select end date';
    this.errormsg = true;
  }

  // Discount Type
  this.OfferDiscountType_errormsg = '';
  if (!this.OfferDiscountType) {
    this.OfferDiscountType_errormsg = 'Please select discount type';
    this.errormsg = true;
  }

  // Discount
  const discountValue = Number(this.OfferDiscount);
  this.OfferDiscount_errormsg = '';
  if (this.OfferDiscount == null || this.OfferDiscount.toString().trim() === '') {
    this.OfferDiscount_errormsg = 'Please enter discount';
    this.errormsg = true;
  } else if (this.OfferDiscountType === 'percentage') {
    if (discountValue < 0 || discountValue > 100) {
      this.OfferDiscount_errormsg = 'Discount must be between 0 and 100';
      this.errormsg = true;
    }
  } else if (this.OfferDiscountType === 'value') {
    if (discountValue < 0) {
      this.OfferDiscount_errormsg = 'Discount cannot be negative';
      this.errormsg = true;
    }
  }

  // Prevent update if any validation failed
  if (this.errormsg || !this.validateInputs()) {
    return; // 🛑 Stop execution
  }

  // All good: Proceed to update
  const val = {
    OfferID: this.OfferID,
    OfferName: this.OfferName,
    CompanyID: this.CompanyID,
    CompanyName: this.CompanyID,
    OfferDescription: this.OfferDescription,
    OfferStartDate: this.OfferStartDate,
    OfferEndDate: this.OfferEndDate,
    OfferDiscount: this.OfferDiscount ?? 0,
    OfferDiscountType: this.OfferDiscountType,
    ModifiedBy: this.service.currentUserID || 0
  };

  this.service.UpdateOffers(val).subscribe((data) => {
    if (data['status_code'] == 100) {
      showSuccessToast(JSON.parse(data['message'])[0]['message']);
      closePopup('offersModal');
      this.emitData.emit(false);

      // Reset fields
      this.OfferID = 0;
      this.OfferName = '';
      this.CompanyID = '';
      this.CompanyName = '';
      this.OfferDescription = '';
      this.OfferStartDate = '';
      this.OfferEndDate = '';
      this.OfferDiscount = null;
      this.OfferDiscountType = '';
      this.ModifiedBy = 0;

    } else if (data['status_code'] == 300) {
      showDangerToast(JSON.parse(data['message'])[0]['message']);
    } else {
      showDangerToast('Some error occurred, data not saved');
    }
  });
}



//   updateOffers() {
//     if(this.OfferEndDate < this.OfferStartDate){
//       this.dateErrorMessage = "End Date must be greater than start date"
//       this.OfferEndDate=''
//       return
//     }
//           if (!this.OfferDiscountType || !this.OfferDiscount) {
//         if (!this.OfferDiscountType) {
//           this.OfferDiscountType_errormsg = 'Please select discount type';
//           this.errormsg = true;
//         return;

//         }
//         else {
//     this.OfferDiscountType_errormsg = ''; // ✅ clear error when field is valid
//   }
//         if (!this.OfferDiscount) {
//           this.OfferDiscount_errormsg = 'Please enter discount';
//           this.errormsg = true;
//         return;

//         }
//         else {
//     this.OfferDiscount_errormsg = ''; // ✅ clear error when field is valid
//   }
//         // this.errormsg = true;
//       }
//     if (!this.validateInputs()) {
//       return; 
//     } 
    

//   var val = {
//     OfferID: this.OfferID,
//     OfferName: this.OfferName,
//     CompanyID: this.CompanyID,
//     CompanyName: this.CompanyID,
//     OfferDescription: this.OfferDescription,
//     OfferStartDate: this.OfferStartDate,
//     OfferEndDate: this.OfferEndDate,
//     OfferDiscount: this.OfferDiscount ?? 0,
//     OfferDiscountType: this.OfferDiscountType,
//     ModifiedBy: 1,
//   };

//   this.service.UpdateOffers(val).subscribe((data) => {
//     if (data['status_code'] == 100) {
//       showSuccessToast(JSON.parse(data['message'])[0]['message']);
//       closePopup('offersModal');
//       this.emitData.emit(false);

//       this.OfferID = 0;
//       this.OfferName = '';
//       this.CompanyID = '';
//       this.CompanyName = '';
//       this.OfferDescription = '';
//       this.OfferStartDate = '';
//       this.OfferEndDate = '';
//       this.OfferDiscount = null;
//       this.OfferDiscountType = '';
//       this.ModifiedBy = 0;
//     } else if (data['status_code'] == 300) {
//       showDangerToast(JSON.parse(data['message'])[0]['message']);
//     } else {
//       showDangerToast('Some error occurred, data not saved');
//     }
//   });
// }

  validateDiscount() {
    let discountValue = Number(this.OfferDiscount);
console.log("discountValue",discountValue);

    if (this.OfferDiscountType === 'percentage') {
        if (discountValue > 100) {
            this.discountErrorMessage = "Percentage should not be more than 100";
            this.OfferDiscount = 100; // Restrict to 100
        } else if (discountValue < 0) {
            this.discountErrorMessage = "Percentage cannot be negative";
            this.OfferDiscount = 0; // Restrict to min 0
        } else {
            this.discountErrorMessage = ""; // Clear error if valid
        }
    } else if (this.OfferDiscountType === 'value') {
        if (discountValue < 0) {
            this.discountErrorMessage = "Value discount cannot be negative";
            this.OfferDiscount = 0;
        } else {
            this.discountErrorMessage = ""; // Clear error for valid input
        }
    }
}
}
