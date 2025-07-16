import { Component, OnInit ,Input ,Output, EventEmitter} from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';

declare function showSuccessToast(msg:any): any;
declare function showDangerToast(msg:any): any;
declare function closePopup(id:any):any;

@Component({
  selector: 'app-add-edit-order-delivery-type',
  templateUrl: './add-edit-order-delivery-type.component.html',
  styleUrls: ['./add-edit-order-delivery-type.component.css']
})

export class AddEditOrderDeliveryTypeComponent implements OnInit {

  @Output() emitData = new EventEmitter<boolean> ();
  constructor(private service:SharedService, private_http:HttpClient) { }

  @Input() 
  orderdelivery:any;
  OrderDeliveryTypeID:any;
  OrderDeliveryTypeName:any;
  IsActive:any;
  CreatedBy:any;

  ngOnInit(): void 
  {
    this.OrderDeliveryTypeID=this.orderdelivery.OrderDeliveryTypeID;
    this.OrderDeliveryTypeName=this.orderdelivery.OrderDeliveryTypeName;
    this.IsActive=this.orderdelivery.IsActive;
    this.CreatedBy=this.CreatedBy;
  }
  AddOrderDelivery()
  {    
    var val = {         
       OrderDeliveryTypeName:this.OrderDeliveryTypeName,
       IsActive:this.IsActive ,   
       CreatedBy:1
       // ModifiedBy:1
     }
     
   this.service.AddOrderDeliveryType(val).subscribe(data=>{
    if (data["status_code"] == 100) {
      closePopup('ordertype-Module');
      showSuccessToast(JSON.parse(data["message"])[0]["message"]);
    }
    else if (data["status_code"] == 300) {
      showDangerToast(JSON.parse(data["message"])[0]["message"]);
    }
    else {
      showDangerToast("Some error occured, data not saved");
    }
  
    });
 } 
  UpdateOrderDelivery()
  {
    var val = {
      OrderDeliveryTypeID:this.OrderDeliveryTypeID,
      OrderDeliveryTypeName:this.OrderDeliveryTypeName,
      IsActive:this.IsActive,
      ModifiedBy:1
    };
    this.service.UpdateOrderDeliveryType(val).subscribe(data=>{

    if (data["status_code"] == 100) {
      showSuccessToast(JSON.parse(data["message"])[0]["message"]);

      //Closing module popup using js function
      closePopup('ordertype-Module');

      //sending false value to ShowCompont to destroy this component 
      this.emitData.emit(false);  
        this.OrderDeliveryTypeID = 0 ;
        this.OrderDeliveryTypeName = '';
        this.IsActive= false;
      }
     
      else if (data["status_code"] == 300) {
        showDangerToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showDangerToast("Some error occured, data not saved");
      }
    });
  }
}
