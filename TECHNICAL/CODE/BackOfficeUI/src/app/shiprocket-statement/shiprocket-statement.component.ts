import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
declare function showInfoToast(msg: any): any;

@Component({
  selector: 'app-shiprocket-statement',
  templateUrl: './shiprocket-statement.component.html',
  styleUrls: ['./shiprocket-statement.component.css'],
})
export class ShiprocketStatementComponent implements OnInit {
  constructor(private service: SharedService) { }

  ShiprocketstatementList: any;
  FromDate: any;
  ToDate: any;

  PODOrders: any;
  CODOrders: any;
  CODReceived: any;
  CODOutStanding: any;
  FromDate_errormsg: any;
  ToDate_errormsg: any;
  countrydata: any = [];
  currency: any;

  ngOnInit(): void {
    this.getData();
    this.currencySign();
  }

  getData() {
    let val = {};
    this.service.getShiprocketStatement(val).subscribe((data) => {
      console.log(data);
      this.ShiprocketstatementList = data.Table;

      this.PODOrders = data.Table1[0]['POD Orders'];
      this.CODOrders = data.Table2[0]['COD Orders'];
      this.CODReceived = data.Table3[0]['COD Received'];
      this.CODOutStanding = this.CODOrders - this.CODReceived;
    });
  }

  search() {
    if (this.validate()) {
      let val = {
        FromDate: this.FromDate,
        ToDate: this.ToDate,
      };
      this.service.getShiprocketStatement(val).subscribe((data) => {
        if (data.Table1 != null) {
          this.ShiprocketstatementList = data.Table;

          this.PODOrders = data.Table1[0]['POD Orders'];
          this.CODOrders = data.Table2[0]['COD Orders'];
          this.CODReceived = data.Table3[0]['COD Received'];
          this.CODOutStanding = this.CODOrders - this.CODReceived;
        } else {
          showInfoToast('Data not found');
        }
      });
    }
  }

  validate() {
    let returnvalue = true;
    this.FromDate_errormsg = '';
    this.ToDate_errormsg = '';
    if (this.FromDate == null || this.FromDate == '') {
      this.FromDate_errormsg = 'Select valid from date';
      return false;
    }

    if (this.ToDate == null || this.ToDate == '') {
      this.ToDate_errormsg = 'Select valid to date';
      return false;
    }
    return returnvalue;
  }

  currencySign() {
    var val: any = {
      IsActive: true,
    };
    this.service.getcurrency(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.countrydata = JSON.parse(data['message']);
        this.currency = this.countrydata[0].Symbol;

      }
    });
  }

}
