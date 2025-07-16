import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';



declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function closePopup(id: any): any;

@Component({
  selector: 'app-add-edit-businesstypes',
  templateUrl: './add-edit-businesstypes.component.html',
  styleUrls: ['./add-edit-businesstypes.component.css']
})

export class AddEditBusinesstypesComponent implements OnInit {
  businessName_errormsg = "";
  errormsg = false;
  currentUser: any;
  currentUserID: any;
  ModifiedBy: any;
  // businessForm = new FormGroup({
  //   businesstypename : new FormControl('',[Validators.required]),
  // })

  @Output() emitData = new EventEmitter<boolean>();
  constructor(private service: SharedService, private_http: HttpClient) { }

  @Input() buinesstype: any;
  BusinessTypeID: any;
  BusinessTypeName: any;
  IsActive: any;

  activeLanguages: any = [];
  formSubmitted: boolean = false;
  ngOnInit(): void {
    this.onUserRoles();
    this.BusinessTypeID = this.buinesstype.BusinessTypeID;
    this.BusinessTypeName = this.buinesstype.BusinessTypeName;
    this.IsActive = this.buinesstype.IsActive;
    this.getLanguage();
  }
  getLanguage() {
    this.service.getLanguage(null).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.activeLanguages = JSON.parse(data['message']);
        this.getBusinessTypeLanguage();
      } else {
        showSuccessToast('Some error occured');
      }
    });
  }

  getBusinessTypeLanguage() {
    if (this.BusinessTypeID != 0) {
      this.service.getbusinessTypesLanguage({ "BusinessTypeID": this.BusinessTypeID }).subscribe((data) => {
        if (data['status_code'] == 100) {
          var categoryLanguage = JSON.parse(data['message']);

          this.activeLanguages.forEach((lang: any) => {
            const categoryLang = categoryLanguage.find(
              (catLang: any) => catLang.LanguageID === lang.LanguageId
            );
            if (categoryLang) {
              lang.Name = categoryLang.BusinessTypeName;
            }
          });
        }
      })
    }
  }

  onUserRoles() {
    this.currentUser = localStorage.getItem('BoUser');
    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      this.currentUserID = this.currentUser.currentUserID;


    }
  }
  // AddBusinessTypeName() {
  //     // Check if form is valid
  //     const isValid = this.activeLanguages.every(
  //       (lang:any) => lang.Name?.trim() 
  //     ); 
  //   this.businessName_errormsg = "";
  //   if (this.BusinessTypeName.trim().length === 0) {
  //     this.businessName_errormsg = "Please enter business name";
  //     this.errormsg = true;
  //   }

  //   else {
  //     this.errormsg = false;
  //     var val = {
  //       BusinessTypeID: this.BusinessTypeID,
  //       BusinessTypeName: this.BusinessTypeName,
  //       CreatedBy: this.currentUserID,
  //       IsActive: this.IsActive
  //     }
  //     this.service.AddBusinessTypeName(val).subscribe(data => {

  //       if (data["status_code"] == 100) {
  //         //Closing module popup using js function
  //         closePopup('exampleModal');
  //         //sending false value to ShowCompont to destroy this component 
  //         this.emitData.emit(false);

  //         var categoryID :number = JSON.parse(data['message'])[0]['identity'];

  //         const payload = {
  //             CaptionDetails: this.activeLanguages,
  //             BusinessTypeID:  categoryID// Captured Name & Description
  //           };
  //           this.service.addbusinessTypesLanguage(payload).subscribe((data_language) =>{

  //             if(data_language['status_code'] == 100){
  //               showSuccessToast(JSON.parse(data_language['message']));
  //             }
  //             else{
  //               showSuccessToast('Some error occured, data not saved');
  //             }

  //           })
  //           // showSuccessToast(JSON.parse(data['message'])[0]['message']);


  //         showSuccessToast(JSON.parse(data["message"])[0]["message"]);
  //       }
  //       else if (data["status_code"] == 300) {
  //         showDangerToast(JSON.parse(data["message"])[0]["message"]);
  //       }
  //       else {
  //         showDangerToast("Some error occured, data not saved");
  //       }
  //     });
  //   }

  // }

  AddBusinessTypeName() {
    const isValidLanguages = this.activeLanguages.every((lang: any) => lang.Name?.trim());
    this.businessName_errormsg = "";

    if (this.BusinessTypeName.trim().length === 0) {
      this.businessName_errormsg = "Please enter business name";
      this.errormsg = true;
      return;
    }

    if (!isValidLanguages) {
      showDangerToast("Please enter language name for all selected languages");
      return;
    }

    this.errormsg = false;

    const val = {
      BusinessTypeID: this.BusinessTypeID,
      BusinessTypeName: this.BusinessTypeName,
      CreatedBy: this.currentUserID,
      IsActive: this.IsActive
    };

    this.service.AddBusinessTypeName(val).subscribe(data => {
      if (data["status_code"] == 100) {
        const businessTypeParsed = JSON.parse(data["message"]);
        const categoryID: number = businessTypeParsed[0]["identity"];
        const businessTypeMsg = businessTypeParsed[0]["message"] || "Business type saved";

        const payload = {
          CaptionDetails: this.activeLanguages,
          BusinessTypeID: categoryID
        };

        this.service.addbusinessTypesLanguage(payload).subscribe((data_language) => {
          if (data_language["status_code"] == 100) {
            closePopup("exampleModal");
            this.emitData.emit(false);

            // Safely handle language message
            let languageMsg = "Language data saved";
            try {
              const parsedLangMsg = JSON.parse(data_language["message"]);
              languageMsg = parsedLangMsg[0]?.message || languageMsg;
            } catch (e) {
              // fallback if parsing fails
            }

            showSuccessToast(`${businessTypeMsg} & ${languageMsg}`);
          } else {
            showDangerToast("Language save failed. Data not saved completely.");
          }
        });

      } else if (data["status_code"] == 300) {
        showDangerToast(JSON.parse(data["message"])[0]["message"]);
      } else {
        showDangerToast("Business type creation failed.");
      }
    });
  }



  UpdateBusinessTypeName() {

    // Check if form is valid
    const isValid = this.activeLanguages.every(
      (lang: any) => lang.Name?.trim()
    );

    var val = {
      BusinessTypeID: this.BusinessTypeID,
      BusinessTypeName: this.BusinessTypeName,
      IsActive: this.IsActive,
      ModifiedBy: this.currentUserID
    }
    this.service.UpdateBusinessTypeName(val).subscribe(data => {
      if (data["status_code"] == 100) {
        const payload = {
          CaptionDetails: this.activeLanguages,
          BusinessTypeID: this.BusinessTypeID// Captured Name & Description
        };

        this.service.addbusinessTypesLanguage(payload).subscribe((data_language) => {

          // if(data_language['status_code'] == 100){
          //   showSuccessToast(JSON.parse(data_language['message']));
          // }
          // else{
          //   showSuccessToast('Some error occured, data not saved');
          // }

        })
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);

        //Closing module popup using js function
        closePopup('exampleModal');

        //sending false value to ShowCompont to destroy this component 
        this.emitData.emit(false);
        // showSuccessToast('Update Successfully');
        this.BusinessTypeID = 0;
        this.BusinessTypeName = '';
        this.IsActive = false;
        this.ModifiedBy = 0;
        this.activeLanguages = [];
      }
      else if (data["status_code"] == 300) {
        showDangerToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showDangerToast("Some error occured, data not saved");
      }
    });
  }

  isFieldInvalid(value: string): boolean {
    return this.formSubmitted && !value?.trim();
  }
}
