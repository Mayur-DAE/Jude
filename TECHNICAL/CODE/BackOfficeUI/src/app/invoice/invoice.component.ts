import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ActivatedRoute } from '@angular/router';

declare function showSuccessToast(msg: any): any;
declare function showDangerToast(message: any): any;

declare function bindDataTable(id: any): any;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  shiprocketToken: any;
  OrderShipmentReferenceID: any;

  constructor(private services: SharedService, private route: ActivatedRoute) { }

  @Input()
  OrderList: any = [];
  OrderInvoiceList: any = [];
  bindDataTableDoIt = true;
  CompanyAddress: any;
  Username: any;
  OrderId: any;
  UserId: any;
  CompanyId: any;
  Address1: any;
  Address2: any;
  OrderDate: any;
  ProductName: any;
  Quantity: any;
  OrderPrice: any;
  TotalPrice: any = 0;
  ShippingPrice: any = 0;
  TotalOrderPrice: any = 0;
  ShiprocketCourierID: any = 0;
  ProductImageThumbnailPath: any;

  loading: any = false;
  countrydata: any = [];
  currency: any;

  ngOnInit(): void {
    this.OrderId = this.route.snapshot.params['id'];
    this.ProductImageThumbnailPath = this.services.PhotoUrl;
    this.refreshOrderInvoiceList();
    this.refreshOrderList();
    this.currencySign();


    //this.services.sendTrackingLink('9820312449', 'mayur', this.OrderId, 'awb');
    // this.services.sendTrackingLink(
    //   '9820312449',
    //   'mayur',
    //   '123',
    //   '319502571988'
    // );
  }
  refreshOrderList() {
    let val = { OrderId: this.OrderId };
    this.services.getorderList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.OrderList = JSON.parse(data['message']);
        this.TotalPrice = this.OrderList[0]['OrderPrice'];
        this.ShippingPrice = this.OrderList[0]['ShippingPrice'];
        this.TotalOrderPrice = this.OrderList[0]['TotalOrderPrice'];
        this.OrderShipmentReferenceID =
          this.OrderList[0]['OrderShipmentReferenceID'];
        this.ShiprocketCourierID = this.OrderList[0]['ShiprocketCourierID'];
        console.log(this.OrderList[0]['ShippingPrice']);
      }
    });
  }

  refreshOrderInvoiceList() {
    let val = { OrderId: this.OrderId };
    this.services.getOrderInvoiceList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.OrderInvoiceList = JSON.parse(data['message']);
        // this.OrderInvoiceList.forEach((element: any) => {
        //   this.TotalPrice = element.TotalPrice + this.TotalPrice;
        // });
        console.log('OrderInvoiceList23232323',this.OrderInvoiceList );
      }
    });

  }

  serviceprovider_price() {
    let val = {
      Price: this.OrderList[0]['ShippingPrice'],
      ServiceProviderID: 1
    };
    this.services.walletupdate(val).subscribe((data) => {
      if (data['status_code'] == 100) {

      }
    });

  }




  confirmOrder() {
    this.loading = true;
    this.generateShiprocketAWB();

    // var val = { OrderStatusID: 2005, OrderID: this.OrderId };
    // this.services.OrderStatusUpdate(val).subscribe((data) => {
    //   if (data['status_code'] == 100) {
    //     showSuccessToast(JSON.parse(data['message'])[0]['message']);

    //     this.refreshOrderInvoiceList();
    //   }
    // });
  }

  generateShiprocketAWB() {
    this.services.generateShiprocketToken().subscribe((tokenData: any) => {
      this.shiprocketToken = tokenData.token;

      var val = {
        shipment_id: this.OrderShipmentReferenceID,
        Token: this.shiprocketToken,
        courier_id: this.ShiprocketCourierID,
      };

      console.log(val);

      this.services.GenerateAWBforShipment(val).subscribe(
        (result: any) => {
          console.log(result);
          console.log(result.response);

          //alert(result.response.data.awb_code);

          if (result.response != null) {
            if (result.awb_assign_status == 1) {
              var val = { OrderStatusID: 2005, OrderID: this.OrderId };
              this.services.OrderStatusUpdate(val).subscribe((data) => {
                if (data['status_code'] == 100) {
                  showSuccessToast(JSON.parse(data['message'])[0]['message']);
                  var vall = { OrderID: this.OrderId };
                  this.services.OrderInvoiceupdate(vall).subscribe((data) => {
                    if (data['status_code'] == 100) {
                      showSuccessToast(JSON.parse(data['message'])[0]['message']);


                      this.refreshOrderInvoiceList();
                    }
                  });

                  this.refreshOrderInvoiceList();
                }
              });

              let awb = result.response.data.awb_code;

              this.services.sendTrackingLink(
                this.OrderInvoiceList[0].MobileNumber,
                this.OrderInvoiceList[0].FirstName + " " + this.OrderInvoiceList[0].LastName,
                this.OrderId,
                awb);
              let whatappval = {
                type: "richTemplate",
                templateId: "order_acception_conformation",
                templateLanguage: "en",
                namespace: "95ff4944_d726_464f_8363_64d127c7fea7",
                templateArgs: [
                  this.OrderId,
                  this.OrderInvoiceList[0].CompanyName,
                  this.OrderInvoiceList[0].CompanyMobileNo1,
                  'https://areaonline.shiprocket.co/tracking/' + awb

                ],
                sender_phone: '91' + this.OrderInvoiceList[0].MobileNumber

              }
              this.services.sendWhatsappSMS(whatappval).subscribe((data) => {
                console.log(data);
                this.loading = false;
              })

              this.serviceprovider_price();

            } else {
              showDangerToast('Faild to generate AWB');
              this.loading = false;
            }
          } else {
            showDangerToast('Faild to generate AWB');
            this.loading = false;
          }

        },
        (err) => {
          console.log(err);
          showDangerToast('Faild to generate AWB');
          this.loading = false;
        }
      );
    });

  }





  cancelOrder() {
    this.loading = true;

    var val = { OrderStatusID: 4, OrderID: this.OrderId };
    this.services.OrderStatusUpdate(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        showSuccessToast(JSON.parse(data['message'])[0]['message']);
        let whatappval = {
          type: "template",
          templateId: "order_cancel_alert",
          templateLanguage: "en",
          namespace: "95ff4944_d726_464f_8363_64d127c7fea7",
          templateArgs: [
            this.OrderId,
            this.TotalOrderPrice,

          ],
          sender_phone: '91' + this.OrderInvoiceList[0].MobileNumber

        }
        console.log(whatappval);
        this.services.sendWhatsappSMS(whatappval).subscribe((data) => {
          console.log(data);
          this.loading = false;



        })

        let whatappvall = {
          type: "template",
          templateId: "order_cancel_alert",
          templateLanguage: "en",
          namespace: "95ff4944_d726_464f_8363_64d127c7fea7",
          templateArgs: [
            this.OrderId,
            this.TotalOrderPrice,

          ],
          sender_phone: '91' + this.OrderInvoiceList[0].CompanyMobileNo2

        }
        console.log(whatappvall);
        this.services.sendWhatsappSMS(whatappvall).subscribe((data) => {
          console.log(data);
          this.loading = false;
        })

        this.services.sendCancelSMS(
          this.OrderInvoiceList[0].MobileNumber + ',' + this.OrderInvoiceList[0].CompanyMobileNo1,
          //'9820312449',
          this.TotalOrderPrice,
          this.OrderId
        );





        this.refreshOrderInvoiceList();

      }
    });


  }

  currencySign() {
    var val: any = {
      IsActive: true,
    };
    this.services.getcurrency(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.countrydata = JSON.parse(data['message']);
        this.currency = this.countrydata[0].Symbol;

      }
    });
  }

}
