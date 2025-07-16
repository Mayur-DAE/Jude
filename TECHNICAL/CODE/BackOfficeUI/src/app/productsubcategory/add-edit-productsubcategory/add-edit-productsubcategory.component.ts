import { Component, OnInit,Input,Output, EventEmitter} from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
declare function showSuccessToast(msg:any): any;
declare function showDangerToast(msg:any): any;
declare function closePopup(id:any):any;

@Component({
  selector: 'app-add-edit-productsubcategory',
  templateUrl: './add-edit-productsubcategory.component.html',
  styleUrls: ['./add-edit-productsubcategory.component.css']
})
export class AddEditProductsubcategoryComponent implements OnInit {
  @Output() emitData = new EventEmitter<boolean> ()
  // ProductCategory_errormsg="";
  Sub_Category_Name_errormsg = "";
  Sub_Category_Description_errormsg="";
  errormsg= false; 
  constructor(private service:SharedService, private_http:HttpClient) { }
  @Input() 
  productsubcategory:any;
  ProductSubCategoryID:any;
  ProductSubCategoryShortName:any;
  ProductSubCategoryDescription:any;
  ProductSubCategoryThumbNailPhotoPath:any;
  ProductSubCategoryLargePhotoPath:any;
  ProductSubCategoryThumbNailPhotoNamePath:any;
  ProductSubCategoryLargePhotoNamePath:any;
  IsActive:any;
  ActivateAddEditProductsubcategoryComp:boolean=false;
  ProductCategoryID:any;
  ProductCategoryList:any;
  ProductSubCategoryList:any;
  currentUser: any;
  currentUserID: any;
  activeLanguages: any = [];
  formSubmitted: boolean = false;

  ngOnInit(): void {
    this.onUserRoles();
  
    this.ProductCategoryID = this.productsubcategory.ProductCategoryID;
    this.ProductSubCategoryID = this.productsubcategory.ProductSubCategoryID;
    this.ProductSubCategoryShortName = this.productsubcategory.ProductSubCategoryShortName;
    this.ProductSubCategoryDescription = this.productsubcategory.ProductSubCategoryDescription;
    
    this.ProductSubCategoryLargePhotoPath = this.productsubcategory.ProductSubCategoryLargePhotoPath;
    this.ProductSubCategoryLargePhotoNamePath = this.productsubcategory.ProductSubCategoryLargePhotoNamePath;
    this.ProductSubCategoryLargePhotoNamePath = this.service.PhotoUrl+this.productsubcategory.ProductSubCategoryLargePhotoPath;
    
    this.ProductSubCategoryThumbNailPhotoPath = this.productsubcategory.ProductSubCategoryThumbNailPhotoPath;
    this.ProductSubCategoryThumbNailPhotoNamePath = this.productsubcategory.ProductSubCategoryThumbNailPhotoNamePath;
    this.ProductSubCategoryThumbNailPhotoNamePath = this.service.PhotoUrl+this.productsubcategory.ProductSubCategoryThumbNailPhotoPath

    this.IsActive = this.productsubcategory.IsActive;
    this.loadProductCategoryList();
    this.refreshProductSubCategoryList();

    this.getLanguage();

  }

  getLanguage(){    
    this.service.getLanguage(null).subscribe((data) => {
      if (data['status_code'] == 100) {               
        this.activeLanguages = JSON.parse(data['message']);    
        this.getProductSubCategoryLanguage();       
      } else {
        showSuccessToast('Some error occured');
      }
    });
  }

  
  getProductSubCategoryLanguage(){ 
    if(this.ProductSubCategoryID != 0)
    {      
      this.service.getSubCategoryLanguage({"ProductSubCategoryID" : this.ProductSubCategoryID}).subscribe((data)=>{
        if (data['status_code'] == 100) {     
          var categoryLanguage = JSON.parse(data['message']);
                    
          this.activeLanguages.forEach( (lang:any) => {
            const categoryLang = categoryLanguage.find(
              (catLang:any) => catLang.LanguageID === lang.LanguageId
            );
            if (categoryLang) {
              lang.Name = categoryLang.ProductSubCategoryShortName;
              lang.Description = categoryLang.ProductSubCategoryDescription;
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

  addProductsubcategory(){
    // this.ProductCategory_errormsg = "";
    // if (this.ProductCategoryID.trim().length === 0) {
    //   this.ProductCategory_errormsg = "Select this field";
    //   this.errormsg=true;
    // }

    this.formSubmitted = true; 

     // Check if form is valid
     const isValid = this.activeLanguages.every(
      (lang:any) => lang.Name?.trim() && lang.Description?.trim()
    );

    this.Sub_Category_Name_errormsg = "";
    if (this.ProductSubCategoryShortName.trim().length === 0) {
      this.Sub_Category_Name_errormsg = "Please enter sub-category name";
      this.errormsg=true;
    }
    this.Sub_Category_Description_errormsg = "";
    if (this.ProductSubCategoryDescription.trim().length === 0) {
      this.Sub_Category_Description_errormsg = "Please enter sub-category description";
      this.errormsg=true;
    }

    if(!isValid){
      return;
    }

    if(isValid && this.ProductSubCategoryShortName.trim().length != 0 &&  this.ProductSubCategoryDescription.trim().length != 0) {
      this.errormsg = false;
    var val = {      
      ProductCategoryID:this.ProductCategoryID,
      ProductSubCategoryShortName:this.ProductSubCategoryShortName,
      ProductSubCategoryDescription:this.ProductSubCategoryDescription,     
      ProductSubCategoryLargePhotoPath:this.ProductSubCategoryLargePhotoPath,
      ProductSubCategoryThumbNailPhotoPath:this.ProductSubCategoryThumbNailPhotoPath,
      IsActive:this.IsActive,
      CreatedBy:this.currentUserID,
      
    };
    this.service.addProductSubcategory(val).subscribe(data=>{

      if(data["status_code"] == 100){
        closePopup('exampleModal');
        //sending false value to ShowCompont to destroy this component 
        this.emitData.emit(false);

        var subCategoryID :number = JSON.parse(data['message'])[0]['identity'];

        alert('SubCategory Inserted Successfully');

          const payload = {
              CaptionDetails: this.activeLanguages,
              ProductSubCategoryID:  subCategoryID// Captured Name & Description
            };


            this.service.addSubCategoryLanguage(payload).subscribe((data_language) =>{

              if(data_language['status_code'] == 100){
                showSuccessToast(JSON.parse(data_language['message']));
              }
              else{
                showSuccessToast('Some error occured, data not saved');
              }
  
            })

        // showSuccessToast(JSON.parse(data["message"])[0]["message"]);      
      }
      else if(data["status_code"] == 300){      
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else{
        showSuccessToast("Some error occured, data not saved");
      }    
      this.refreshProductSubCategoryList();
    });
  }
}
  updateProductsubcategory(){

    this.formSubmitted = true; 

     // Check if form is valid
     const isValid = this.activeLanguages.every(
      (lang:any) => lang.Name?.trim() && lang.Description?.trim()
    );  


    this.Sub_Category_Name_errormsg = "";
    if (this.ProductSubCategoryShortName.trim().length === 0) {
      this.Sub_Category_Name_errormsg = "Please enter sub-category name";
      
      this.errormsg=true;
    }
    this.Sub_Category_Description_errormsg = "";
    if (this.ProductSubCategoryDescription.trim().length === 0) {
      this.Sub_Category_Description_errormsg = "Please enter sub-category description";
      this.errormsg=true;
    }

    if(!isValid || this.ProductSubCategoryShortName.trim().length == 0 || this.ProductSubCategoryDescription.trim().length == 0){
      return;
    }
    else
    {
    var val = {
      ProductCategoryID:this.ProductCategoryID,
      ProductSubCategoryID:this.ProductSubCategoryID,
      ProductSubCategoryShortName:this.ProductSubCategoryShortName,
      ProductSubCategoryDescription:this.ProductSubCategoryDescription,
      ProductSubCategoryLargePhotoPath:this.ProductSubCategoryLargePhotoPath,
      ProductSubCategoryThumbNailPhotoPath:this.ProductSubCategoryThumbNailPhotoPath,
      IsActive:this.IsActive,
      ModifiedBy:this.currentUserID,     
    };  
    this.service.updateProductSubcategory(val).subscribe(data=>{
      if(data["status_code"] == 100){

        const payload = {
          CaptionDetails: this.activeLanguages,
          ProductSubCategoryID:  this.ProductSubCategoryID// Captured Name & Description
        };

        this.service.addSubCategoryLanguage(payload).subscribe((data_language) =>{

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
            showSuccessToast(JSON.parse(data["message"])[0]["message"]); 
            this.ProductCategoryID = 0 ;
            this.ProductSubCategoryID = 0 ;
            this.ProductSubCategoryShortName = '';
            this.ProductSubCategoryDescription = '';
            this.ProductSubCategoryLargePhotoPath = '';
            this.ProductSubCategoryThumbNailPhotoPath = '';
            this.IsActive = false;     
          }
          else if(data["status_code"] == 300){      
            showSuccessToast(JSON.parse(data["message"])[0]["message"]);
          }
          else{
            showSuccessToast("Some error occured, data not saved");
          }   
        this.refreshProductSubCategoryList();
      });
    }
    }
loadProductCategoryList(){
  let val = {IsActive:1};
  this.service.getProductcategoryList(val).subscribe(data=>{
    if(data["status_code"] == 100){
    this.ProductCategoryList=JSON.parse(data["message"]);
    }
  });
}

refreshProductSubCategoryList(){
  let val = {}
  this.service.getProductSubcategoryList(val).subscribe(data=>{    
    if(data["status_code"] == 100){
      this.ProductSubCategoryList=JSON.parse(data["message"]);
      }
    });
  }
  uploadthumbnailphoto(event:File[]){

    if (!event || event.length === 0) {
      alert('No file selected.');
      return;
    }

    var file =event[0];

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
    if (!validImageTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, SVG).');
      return;
    }

    // Validate file size (optional, e.g., limit to 5MB)
    const maxSizeInMB = 5;
    if (file.size > maxSizeInMB * 1024 * 1024) {
      alert(`File size should not exceed ${maxSizeInMB} MB.`);
      return;
    }

    const fromData:FormData = new FormData();
    fromData.append('uploaded File',file,file.name);
    this.service.uploadSubCategoryPhoto(fromData).subscribe((data:any)=>{
      this.ProductSubCategoryThumbNailPhotoPath=data.toString();
      this.ProductSubCategoryThumbNailPhotoNamePath=this.service.PhotoUrl+this.ProductSubCategoryThumbNailPhotoPath;
    })
  }
  uploadlargephoto(event:File[]){

     if (!event || event.length === 0) {
      alert('No file selected.');
      return;
    }

  

    var file =event[0];

  // Validate file type
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
    if (!validImageTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, SVG).');
      return;
    }


    // Validate file size (optional, e.g., limit to 5MB)
  const maxSizeInMB = 5;
  if (file.size > maxSizeInMB * 1024 * 1024) {
    alert(`File size should not exceed ${maxSizeInMB} MB.`);
    return;
  }
  

    const fromData:FormData = new FormData();
    fromData.append('uploaded File',file,file.name);
    this.service.uploadSubCategoryPhoto(fromData).subscribe((data:any)=>{
      this.ProductSubCategoryLargePhotoPath=data.toString();
      this.ProductSubCategoryLargePhotoNamePath=this.service.PhotoUrl+this.ProductSubCategoryLargePhotoPath;
    })

}


loadDefaultImage(event: Event) {   
  (event.target as HTMLImageElement).src = this.service.PhotoUrl + "anonymous.png";
}

}

