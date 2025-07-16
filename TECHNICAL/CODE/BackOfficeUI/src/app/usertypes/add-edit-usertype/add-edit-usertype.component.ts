import { Component, OnInit ,Input,Output, EventEmitter} from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';

declare function showSuccessToast(msg:any): any;
declare function closePopup(id:any):any;

@Component({
  selector: 'app-add-edit-usertype',
  templateUrl: './add-edit-usertype.component.html',
  styleUrls: ['./add-edit-usertype.component.css']
})
export class AddEditUsertypeComponent implements OnInit {
  User_errormsg ="";
  errormsg = false;
  @Output() emitData = new EventEmitter<boolean> ();
  
  constructor(private service:SharedService, private_http:HttpClient) { }
  @Input() 
  utype:any;
  UserTypeID:any;
  UserType:any;
  IsActive:any;
  ActivateAddEditUsertypeComp:boolean=false;

  ngOnInit(): void {
    this.UserTypeID = this.utype.UserTypeID;
    this.UserType = this.utype.UserType;
    this.IsActive = this.utype.IsActive
  }

  addUsertype(){
    this.User_errormsg = "";
    if (this.UserType.trim().length === 0) {
      this.User_errormsg = "Please enter user type";
      this.errormsg = true;
    }
    else {
      this.errormsg = false;
    var val = {
      UserType:this.UserType,
      IsActive:this.IsActive,
      CreatedBy:1,
    };
    this.service.addUsertype(val).subscribe(data=>{

      if(data["status_code"] == 100){
        closePopup('exampleModal');
        //sending false value to ShowCompont to destroy this component 
        this.emitData.emit(false);
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);      
      }
      else if(data["status_code"] == 300){      
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else{
        showSuccessToast("Some error occured, data not saved");
      }    
  });

}
  }
  updateUsertype(){
    
    var val = {
      UserTypeID:this.UserTypeID,
      UserType:this.UserType,
      IsActive:this.IsActive,
      ModifiedBy:2,     
    };
  this.service.updateusertype(val).subscribe(data=>{
  if(data["status_code"] == 100){
        closePopup('exampleModal');
        //sending false value to ShowCompont to destroy this component 
        this.emitData.emit(false);
        showSuccessToast(JSON.parse(data["message"])[0]["message"]); 
        this.UserTypeID = 0 ;
        this.UserType = '';
        this.IsActive = false;     
      }
      else if(data["status_code"] == 300){      
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else{
        showSuccessToast("Some error occured, data not saved");
      }    
  });
  
}
}
