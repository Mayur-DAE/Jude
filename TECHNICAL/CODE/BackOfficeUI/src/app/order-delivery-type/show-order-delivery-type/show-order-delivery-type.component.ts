import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
@Component({
  selector: 'app-show-order-delivery-type',
  templateUrl: './show-order-delivery-type.component.html',
  styleUrls: ['./show-order-delivery-type.component.css']
})
export class ShowOrderDeliveryTypeComponent implements OnInit {

  constructor(private service: SharedService) { }

  OrderDeliveryList: any = [];

  ModalTitle: any;
  ActiveAddEditOrderDeliveryTypeComponent: boolean = false;
  orderdelivery: any;

  @Input()
  OrderDeliveryTypeID: any;
  OrderDeliveryTypeName: any;
  IsActive: any;

  ngOnInit(): void {
    this.refreshOrderDeliveryType();
  }
  emittedDataByChild(data: boolean) {
    this.ActiveAddEditOrderDeliveryTypeComponent = data;
    if (!data) {
      this.refreshOrderDeliveryType();
    }
  }
  addClick() {
    this.orderdelivery = {

      OrderDeliveryTypeID: "",
      OrderDeliveryTypeName: "",
      IsActive: ""
    }
    this.ModalTitle = "Add Order";
    this.ActiveAddEditOrderDeliveryTypeComponent = true;
  }
  editClick(item: any) {

    
    this.orderdelivery = item;
    this.ModalTitle = "Edit Department";
    this.ActiveAddEditOrderDeliveryTypeComponent = true;
  }
  closeClick() {
    this.ActiveAddEditOrderDeliveryTypeComponent = false;
    this.refreshOrderDeliveryType();
  }

  refreshOrderDeliveryType() {
    let val = {}
    this.service.GetOrderDeliveryType(val).subscribe(data => {
      if (data["status_code"] == 100) {
      this.OrderDeliveryList = JSON.parse(data["message"]);
      }
    });
  }
 

  Inactive(item: any) {
    var val = {
      OrderDeliveryTypeID: item.OrderDeliveryTypeID,
      IsActive: 0
    }
    this.service.UpdateOrderDeliveryTypeIsActive(val).subscribe(data => {
      if (data["status_code"] == 100) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else if (data["status_code"] == 300) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showSuccessToast("Some error occured, data not saved");
      }
      this.refreshOrderDeliveryType();
    });
  }
  Active(item: any) {
    
    var val = {
      OrderDeliveryTypeID: item.OrderDeliveryTypeID,
      IsActive: 1
    }
    this.service.UpdateOrderDeliveryTypeIsActive(val).subscribe(data => {
     
      if (data["status_code"] == 100) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else if (data["status_code"] == 300) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showSuccessToast("Some error occured, data not saved");
      }
      this.refreshOrderDeliveryType();
    }
    );
  }
}