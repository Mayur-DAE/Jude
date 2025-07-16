import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef  } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function closePopup(id: any): any;

@Component({
  selector: 'app-add-edit-productcategory',
  templateUrl: './add-edit-productcategory.component.html',
  styleUrls: ['./add-edit-productcategory.component.css'],
})

export class AddEditProductcategoryComponent implements OnInit {  

  @ViewChild('thumbnailFileInput') thumbnailFileInput!: ElementRef ;
  @ViewChild('largePhotoFileInput') largePhotoFileInput!: ElementRef ;

  Name_errormsg = '';
  ProductCategoryDescription_errormsg = '';
  bln_error_user = false;
  bln_error_description = false;
  @Output() emitData = new EventEmitter<boolean>();

  @Input()
  productcategory: any;
  ProductCategoryID: any;
  ProductCategoryShortName: any;
  ProductCategoryDescription: any;
  ProductCategoryThumbNailPhotoPath: any;
  ProductCategoryLargePhotoPath: any;
  ProductCategoryThumbNailPhotoNamePath: any;
  ProductCategoryLargePhotoNamePath: any;
  IsActive: any;
  ActivateAddEditProductcategoryComp: boolean = false;
  currentUser: any;
  currentUserID: any;
  categoryForm: FormGroup;
  activeLanguages: any = [];
  formSubmitted: boolean = false;
  thumbnailErrormsg = '';
  thumbnailError: boolean = true;

  
  constructor(private service: SharedService, private_http: HttpClient,private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      categoryName: [''],
      languageDetails: this.fb.array([]),
    });
  }

  ngOnInit(): void 
  {
    this.onUserRoles();
    this.ProductCategoryID = this.productcategory.ProductCategoryID;
    this.ProductCategoryShortName = this.productcategory.ProductCategoryShortName;
    this.ProductCategoryDescription = this.productcategory.ProductCategoryDescription;
    this.ProductCategoryLargePhotoPath = this.productcategory.ProductCategoryLargePhotoPath;
    this.ProductCategoryLargePhotoNamePath = this.productcategory.ProductCategoryLargePhotoNamePath;
    this.ProductCategoryLargePhotoNamePath = this.service.PhotoUrl+'ProductCategory/' + this.productcategory.ProductCategoryLargePhotoPath;
    this.ProductCategoryThumbNailPhotoPath = this.productcategory.ProductCategoryThumbNailPhotoPath;
    this.ProductCategoryThumbNailPhotoNamePath = this.productcategory.ProductCategoryThumbNailPhotoNamePath;
    this.ProductCategoryThumbNailPhotoNamePath = this.service.PhotoUrl+'ProductCategory/' + this.productcategory.ProductCategoryThumbNailPhotoPath;
    this.IsActive = this.productcategory.IsActive;
    
    this.getLanguage();
    
  }

  getLanguage(){    
    this.service.getLanguage(null).subscribe((data) => {
      if (data['status_code'] == 100) {               
        this.activeLanguages = JSON.parse(data['message']);    
        this.getProductCategoryLanguage();       
      } else {
        showSuccessToast('Some error occured');
      }
    });
  }

  getProductCategoryLanguage(){ 
      if(this.ProductCategoryID != 0)
      {      
        this.service.getCategoryLanguage({"ProductCategoryID" : this.ProductCategoryID}).subscribe((data)=>{
          if (data['status_code'] == 100) {     
            var categoryLanguage = JSON.parse(data['message']);
                      
            this.activeLanguages.forEach( (lang:any) => {
              const categoryLang = categoryLanguage.find(
                (catLang:any) => catLang.LanguageID === lang.LanguageId
              );
              if (categoryLang) {
                lang.Name = categoryLang.ProductCategoryShortName;
                lang.Description = categoryLang.ProductCategoryDescription;
              }
            });            
          } 
        })
      }
    
  }

  isFieldInvalid(value: string): boolean {
    return this.formSubmitted && !value?.trim();
  }
 
  onUserRoles() {
    this.currentUser = localStorage.getItem('BoUser');
    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      this.currentUserID = this.currentUser.currentUserID;
    }
  }

  addProductcategory() {

    this.formSubmitted = true; 

    // Check if form is valid
    const isValid = this.activeLanguages.every(
      (lang:any) => lang.Name?.trim() && lang.Description?.trim()
    );  

    this.Name_errormsg = '';
    if (this.ProductCategoryShortName.trim().length === 0) 
    {
      this.Name_errormsg = 'Please enter category name';
      this.bln_error_user = true;      
    }
    this.ProductCategoryDescription_errormsg = '';

    if (this.ProductCategoryDescription.trim().length === 0) 
    {
      this.ProductCategoryDescription_errormsg = 'Please enter category description';
      this.bln_error_description = true;      
    } 

    if(!isValid)
    {
        return;
    }


    if(isValid && this.ProductCategoryShortName.trim().length != 0 &&  this.ProductCategoryDescription.trim().length != 0) 
    {
      this.bln_error_user = false;
      this.bln_error_description = false;

      var val = {
        ProductCategoryShortName: this.ProductCategoryShortName,
        ProductCategoryDescription: this.ProductCategoryDescription,
        ProductCategoryLargePhotoPath: this.ProductCategoryLargePhotoPath,
        ProductCategoryThumbNailPhotoPath: this.ProductCategoryThumbNailPhotoPath,
        IsActive: this.IsActive,
        CreatedBy: this.currentUserID,
      };
      
      this.service.addProductcategory(val).subscribe((data) => {
    
        if (data['status_code'] == 100) {
          closePopup('exampleModal');
          //sending false value to ShowCompont to destroy this component
          this.emitData.emit(false);
          
          var categoryID :number = JSON.parse(data['message'])[0]['identity'];

          const payload = {
              CaptionDetails: this.activeLanguages,
              ProductCategoryID:  categoryID// Captured Name & Description
            };

          this.service.addCategoryLanguage(payload).subscribe((data_language) =>{

            if(data_language['status_code'] == 100){
              showSuccessToast(JSON.parse(data_language['message']));
            }
            else{
              showSuccessToast('Some error occured, data not saved');
            }

          })
          // showSuccessToast(JSON.parse(data['message'])[0]['message']);

        } else if (data['status_code'] == 300) {
          showSuccessToast(JSON.parse(data['message'])[0]['message']);
        } else {
          showSuccessToast('Some error occured, data not saved');
        }
      });
    }
  }

  updateProductcategory() {

    this.formSubmitted = true; 

    // Check if form is valid
    const isValid = this.activeLanguages.every(
      (lang:any) => lang.Name?.trim() && lang.Description?.trim()
    );  

    this.Name_errormsg = '';
    if (this.ProductCategoryShortName.trim().length === 0) 
    {
      this.Name_errormsg = 'Please enter category name';
      this.bln_error_user = true;      
    }
    this.ProductCategoryDescription_errormsg = '';

    if (this.ProductCategoryDescription.trim().length === 0) 
    {
      this.ProductCategoryDescription_errormsg = 'Please enter category description';
      this.bln_error_description = true;      
    }   
    if(!isValid || this.ProductCategoryShortName.trim().length == 0 || this.ProductCategoryDescription.trim().length == 0)
    {
        return;
    }
    else 
    {
    this.bln_error_user = false;
    this.bln_error_description = false;
    this.formSubmitted = true; 

    // Check if form is valid
    const isValid = this.activeLanguages.every(
      (lang:any) => lang.Name?.trim() && lang.Description?.trim()
    );  

    var val = {
      ProductCategoryID: this.ProductCategoryID,
      ProductCategoryShortName: this.ProductCategoryShortName,
      ProductCategoryDescription: this.ProductCategoryDescription,
      ProductCategoryLargePhotoPath: this.ProductCategoryLargePhotoPath,
      ProductCategoryThumbNailPhotoPath: this.ProductCategoryThumbNailPhotoPath,
      IsActive: this.IsActive,
      ModifiedBy: this.currentUserID,
    };
    this.service.updateProductcategory(val).subscribe((data) => {
      if (data['status_code'] == 100) {

        const payload = {
          CaptionDetails: this.activeLanguages,
          ProductCategoryID:  this.ProductCategoryID// Captured Name & Description
        };

      this.service.addCategoryLanguage(payload).subscribe((data_language) =>{

        // if(data_language['status_code'] == 100){
        //   showSuccessToast(JSON.parse(data_language['message']));
        // }
        // else{
        //   showSuccessToast('Some error occured, data not saved');
        // }

      })


        closePopup('exampleModal');
        //sending false value to ShowCompont to destroy this component
        this.emitData.emit(false);
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
        this.ProductCategoryID = 0;
        this.ProductCategoryShortName = '';
        this.ProductCategoryDescription = '';
        this.ProductCategoryLargePhotoPath = '';
        this.ProductCategoryThumbNailPhotoPath = '';
        this.IsActive = false;
        this.activeLanguages = [];
      } else if (data['status_code'] == 300) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
      } else {
        showSuccessToast('Some error occured, data not saved');
      }
    });
  }
  }

  uploadthumbnailphoto(event: File[]) {
    this.ProductCategoryThumbNailPhotoPath = this.productcategory.ProductCategoryThumbNailPhotoPath;
    this.ProductCategoryThumbNailPhotoNamePath = this.service.PhotoUrl + this.productcategory.ProductCategoryThumbNailPhotoPath;
    this.thumbnailErrormsg = '';
    this.thumbnailError = false;
  
    if (!event || event.length === 0) {
      this.thumbnailErrormsg = 'Please upload file';
      return;
    }
  
    var file = event[0];
  
    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
    if (!validImageTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, SVG).');
      return;
    }
  
    // Validate file size (max 5MB)
    const maxSizeInMB = 5;
    if (file.size > maxSizeInMB * 1024 * 1024) {
      alert(`File size should not exceed ${maxSizeInMB} MB.`);
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;
  
      img.onload = () => {
        console.log(img.width, img.height);
        if (img.width === 120 && img.height === 120) {
          this.thumbnailErrormsg = '';
          this.thumbnailError = false;
  
          // Show preview immediately
          this.ProductCategoryThumbNailPhotoNamePath = e.target.result;
  
          const fromData: FormData = new FormData();
          fromData.append('uploadedFile', file, file.name);
          const basepath = 'Photos/ProductCategory';
          fromData.append('basepath', basepath);
  
          this.service.uploadProductPhoto(fromData).subscribe((data: any) => {
            this.ProductCategoryThumbNailPhotoPath = data.toString();
  
            // Final image path after upload
            this.ProductCategoryThumbNailPhotoNamePath =
              this.service.PhotoUrl + 'ProductCategory/' + this.ProductCategoryThumbNailPhotoPath;
            console.log(this.ProductCategoryThumbNailPhotoNamePath);
          });
        } else {
          this.thumbnailErrormsg = 'Image dimensions must be 120x120 pixels.';
          this.thumbnailError = true;
        }
      };
  
      img.onerror = () => {
        this.thumbnailErrormsg = 'Invalid image file. Please try again.';
        this.thumbnailError = true;
      };
    };
  
    if (file !== undefined) {
      reader.readAsDataURL(file);
    }
  }
  
    
  uploadlargephoto(event: File[]) {
    var file = event[0];
    const fromData: FormData = new FormData();
    fromData.append('uploadedFile', file, file.name);
    const basepath = 'Photos/ProductCategory';
    fromData.append('basepath', basepath);
    
    this.service.uploadProductPhoto(fromData).subscribe((data: any) => {
      this.ProductCategoryLargePhotoPath = data.toString();
      this.ProductCategoryLargePhotoNamePath =
        this.service.PhotoUrl +'ProductCategory/' + this.ProductCategoryLargePhotoPath;
      // alert(this.ProductCategoryLargePhotoNamePath);
    });
  }

  loadDefaultImage(event: Event) {   
    (event.target as HTMLImageElement).src = this.service.PhotoUrl + "anonymous.png";
  }

  triggerThumbnailFileInput(): void {
    this.thumbnailFileInput.nativeElement.click(); // Programmatically trigger the file input click
  }

  triggerLargePhotoFileInput(): void {
    this.largePhotoFileInput.nativeElement.click(); // Programmatically trigger the file input click
  }
}
