import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css'],
})
export class ViewInvoiceComponent implements OnInit {
  constructor(
    private service: SharedService,
    private route: ActivatedRoute,
    private router: Router,
    private_http: HttpClient
  ) { }
  @Input()
  orderinvoice: any;
  OrderList: any = [];
  OrderInvoiceList: any = [];
  OrderProductList: any = [];
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
  CompanyLogoPath: any;
  TotalPrice: any = 0;
  ShippingPrice: any = 0;
  TotalOrderPrice: any = 0;
  OrderInvoiceNumber: any;
  actionClick: any;
  countrydata: any = [];
  currency: any;
  pdfMakeModule: any;
  pdfFontsModule: any;
  pdfMake: any;
  docDefination: any = {};
  
  ngOnInit(): void {
    this.loadLibs()
    // this.OrderId = this.orderinvoice['OrderID'];
    // this.CompanyId = this.orderinvoice.CompanyID;
    let param = this.route.snapshot.params['id'];
    var splits = param.split("%?");
    this.OrderId = splits[0];
    this.actionClick = splits[1];

    //this.CompanyId = this.orderinvoice.CompanyID;
    this.CompanyLogoPath = this.service.PhotoUrl;
    this.refreshOrderList();
    this.refreshOrderInvoiceList();
  }
  refreshOrderList() {
    console.log('OrderId', this.OrderId);
    
    let val = { OrderId: this.OrderId };
    this.service.getOrderList(val).subscribe((data) => {
      console.log('data233223323', data);
      
      if (data['status_code'] == 100) {
        this.OrderList = JSON.parse(data['message']);
        console.log('OrderList', this.OrderList);
        
        
        this.TotalPrice = this.OrderList[0]['OrderPrice'];
        console.log('TotalPrice', this.TotalPrice);
        
        this.ShippingPrice = this.OrderList[0]['ShippingPrice'];
        this.TotalOrderPrice = this.OrderList[0]['TotalOrderPrice'];
        this.OrderInvoiceNumber = this.OrderList[0]['OrderInvoiceNumber']

      }
    });
  }

  refreshOrderInvoiceList() {
    console.log('OrderId2133123', this.OrderId);
    
    let val = { OrderId: this.OrderId };
    this.service.getOrderInvoiceList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.currencySign();
        console.log('hi', data);
        
        this.OrderInvoiceList = JSON.parse(data['message']);
        console.log('OrderInvoiceListweddwd', this.OrderInvoiceList);
        
        

        // this.OrderInvoiceList.forEach( (element: any) => {
        //   this.TotalPrice = element.TotalPrice + this.TotalPrice ;
        // });
      }
    });
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
  closeInvoice() {
    this.router.navigate(['/Login/Home']).then(() => {
      setTimeout(() => {
        const ordersTab = document.getElementById('pills-orders-tab');
        if (ordersTab) {
          (ordersTab as HTMLElement).click(); 
        }
      }, 10);
    });
  }
  openPDF(){
    this.generatePDF()
  }

  async loadLibs() {
    this.pdfMakeModule = await import('pdfmake/build/pdfmake');
    this.pdfFontsModule = await import('pdfmake/build/vfs_fonts');
    
  }
  async getBase64FromUrl(url: string): Promise<string> {
    const response = await fetch(url);
    console.log(response)
    const blob = await response.blob();
    console.log(blob)
    if(blob.size>0){
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => reader.result && resolve(reader?.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }else{
      return ''
    }
   
    
   
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    
    const formattedDate = date.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  
    // Insert a comma after the weekday
    const parts = formattedDate.split(' ');
    return `${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}`;
    }
    fontSizes = 
    {
      data: 10,
      heading: 12,
      note: 11,
    };
    generateTableRows(dataArray: any[]) {
      let rows: any[] = [];
  
      dataArray.forEach((item: any, index: number) => {
        rows.push([
          { text: (index + 1).toString(), bold: false, fontSize: this.fontSizes.data, fontWeight: 300, alignment: 'left', margin:[0, 5, 0, 0] } as any,
          { text: item.MasterProductName.toUpperCase(), bold: false, fontSize: this.fontSizes.data, fontWeight: 300, alignment: 'left', margin: [0, 5, 0, 0] } as any,
          { text: item.Quantity.toString(), bold: false, fontSize: this.fontSizes?.data, alignment: 'center', margin: [0, 5, 0, 0] } as any,
          // { text: .toUpperCase(), bold: false, fontSize: this.fontSizes?.data, alignment: 'center', margin: [0, 5, 0, 0] } as any,
          { text: this.currency +' '+ item.ProductPrice.toFixed(2), bold: false, fontSize: this.fontSizes?.data, alignment: 'center', margin: [0, 5, 0, 0] } as any,
          { text: this.currency +' '+ item.TotalPrice.toFixed(2), bold: false, fontSize: this.fontSizes?.data, alignment: 'center', margin: [10, 5, 0, 0] } as any
        ]);
      });
  
      return rows;
  }
  async generatePDF(){
   
    this.pdfMake = this.pdfMakeModule.default;
    (pdfMake as any).vfs = this.pdfFontsModule.default.vfs;
    

    const fontSizestext = 
    {
      data: 10,
      heading: 11,
      note: 11,
    };
    const imageUrl = 'assets/images/logo/jude-logo.png';
    // const Shoplogo =this.CompanyLogoPath + 'listing/' + this.OrderInvoiceList[0].CompanyLogoPath;
    const imageBase64 = await this.getBase64FromUrl(imageUrl);
    const ShopDetails ={
      CompanyName:this.OrderInvoiceList[0].CompanyName,
      CompanyAddress:this.OrderInvoiceList[0].CompanyAddress1 +
      ", " +this.OrderInvoiceList[0].CompanyAddress2,
      CompanyPhone:this.OrderInvoiceList[0].CompanyMobileNo1,
      // CompanyLogo:await this.getBase64FromUrl(Shoplogo),
    }
    const InvoiceToDetails ={
      ToName:this.OrderInvoiceList[0].fullname,
      ToHouseNo:this.OrderInvoiceList[0].address1,
      ToArea:this.OrderInvoiceList[0].address2,
      ToCity:this.OrderInvoiceList[0].landmark,
      ToState:"Maharashtra",
      ToPincode:"400068",
      ToPhoneNumber:this.OrderInvoiceList[0].mobilenumber
    }
    const FooterSection ={
      TotalAmount:this.TotalPrice,
      SippingAmount:this.ShippingPrice,
      FinalAmount:this.TotalOrderPrice
    }
    this.docDefination = {
       
      content: [
        // { text: `Tax Invoice/Bill of Supply/Cash Memo`, style: 'subheader', alignment: 'right', fontSize: fontSizestext.heading , bold: true},
        // { text: `(Original for Recipient)`, style: 'subheader', alignment: 'right',fontSize: fontSizestext.note , bold: true },
        {
          image: imageBase64,
          width: 80, // Adjust width as needed
          alignment: 'center'
        },
        { text: '\n' },
        { text: 'Invoice Report', style: 'title', alignment: 'center', fontSize: fontSizestext.note, bold: true },
        { text: '\n' },
        {
          columns: [
            // ShopDetails.CompanyLogo !== "" ? [
            //   {
            //     columns: [
            //       {
            //         width: 60, // fixed width
            //         stack: [
            //           {
            //             image: ShopDetails.CompanyLogo,
            //             width: 50,
            //             height: 50
            //           }
            //         ]
            //       },
            //       {
            //         width: 140,
            //         stack: [
            //           // { text: `Sold By :`, style: 'subheader', alignment: 'left', fontSize: fontSizestext.heading , bold: true},
            //           ShopDetails.CompanyName ? { text: ShopDetails.CompanyName,  fontSize: fontSizestext.data } : {},
            //           ShopDetails.CompanyAddress ? { text: ShopDetails.CompanyAddress,  fontSize: fontSizestext.data } : {},
            //           ShopDetails.CompanyPhone ? { text: `Contact : ${ShopDetails.CompanyPhone}`, fontSize: fontSizestext.data } : {}
            //         ]
            //       }
            //     ]
            //   }
            // ] : 
            [
              {
                columns: [
                  
                  {
                    width: 160,
                    stack: [
                      { text: '\n'},
                      ShopDetails.CompanyName ? { text: ShopDetails.CompanyName,  alignment: 'left',fontSize: fontSizestext.data,bold:true } : {},
                      ShopDetails.CompanyAddress ? { text: ShopDetails.CompanyAddress,  alignment: 'left',fontSize: fontSizestext.data } : {},
                      ShopDetails.CompanyPhone ? { text: `Contact : ${ShopDetails.CompanyPhone}`,  alignment: 'left',fontSize: fontSizestext.data } : {}
                    ]
                  },]
                  // { width: '*', text: '' }]
              }
            ],
            
            [{
              columns: [
                // { width: '*', text: '' },
                {
                  width: 160,
                  stack: [
                    { text: `Invoice to :`, style: 'subheader', alignment: 'left', fontSize: fontSizestext.heading , bold: true},
                    { text: InvoiceToDetails.ToName, alignment: 'left', fontSize: fontSizestext.data, bold:true },
                    { text: InvoiceToDetails.ToHouseNo + ' ' + InvoiceToDetails.ToArea,  alignment: 'left', fontSize: fontSizestext.data },
                    { text: InvoiceToDetails.ToCity,  alignment: 'left', fontSize: fontSizestext.data },
                    // { text:  InvoiceToDetails.ToState + ', ' + InvoiceToDetails.ToPincode, alignment: 'right', fontSize: fontSizestext.data },
                    { text: `Contact : ${InvoiceToDetails.ToPhoneNumber}`,  alignment: 'left', fontSize: fontSizestext.data }
                  ]
                }]
            }
            ]
          ],
          columnGap: 210
        },
        { text: '\n' },
        { text: `Invoice Date : ${this.formatDate(this.OrderInvoiceList[0].OrderDate)}`, margin: [0, 8, 0, 0],  alignment: 'left', fontSize: fontSizestext.data },
        { text: `Order ID: ${this.OrderId}`, alignment: 'left', margin: [0, 0, 0, 8], fontSize: fontSizestext.data },
       
        {
          table: {
            widths: ['10%','50%', '10%', '15%', '15%'],
            body: [
              [
                { text: 'Sr No.', bold: true, color: 'white', alignment: 'left', fillColor: '#00a300', margin: [0, 3, 0, 3], fontSize: fontSizestext.note },
                { text: 'Product', bold: true, color: 'white', alignment: 'left', fillColor: '#00a300', margin: [0, 3, 0, 3], fontSize: fontSizestext.note },
                { text: 'Quantity', bold: true, color: 'white', alignment: 'center',fillColor: '#00a300', margin: [0, 3, 0, 3], fontSize: fontSizestext.note },
                // { text: 'Curr.', bold: true, color: 'white', alignment: 'center',fillColor: '#00a300', margin: [0, 3, 0, 3], fontSize: fontSizestext.note },
                { text: 'Unit Cost', bold: true, color: 'white', alignment: 'center', fillColor: '#00a300', margin: [0, 3, 0, 3], fontSize: fontSizestext.note },
                { text: 'Total', bold: true, color: 'white', alignment: 'center',fillColor: '#00a300', margin: [0, 3, 0, 3], fontSize: fontSizestext.note }
              ]
            ]
          },
          layout: {
            // hLineWidth: (i: number, node: any) => ((i == 0 || i == 1) ? 0.5 : 0),
            // vLineWidth: (i: number) => ((i === 0 || i === 6) ? 0.5 : 0),
            hLineWidth: () => 0,
            vLineWidth: () => 0,
          }
        },
        {
          table: {
            //headerRows: 1,
            widths: ['10%','50%', '10%', '15%', '15%'],
            border: [true, true, true, true],
            body: [
              ...this.generateTableRows(this.OrderInvoiceList),
            ]
          },
          layout: {
            hLineWidth: (i: number, node: any) => 0,
            vLineWidth: (i: number) => 0,
          }
        },
        // { text: '\n' },
        {
          margin: [0, 10, 0, 10],
          pageBreakBefore: function (currentNode: any, followingNodesOnPage: any) {
            // If less than 200 points left on the page, move to next page
            return currentNode.pageNumbers.length &&
              currentNode.startPosition.verticalRatio > 0.75;
          },
          unbreakable: true,
          stack: [
            {
              canvas: [
                {
                  type: 'line',
                  x1: 0,
                  y1: 0,
                  x2: 515,
                  y2: 0,
                  lineWidth: 0.7,
                  lineColor: 'black'
                }
              ]
            }]
        },
        {
          table: {
            widths: ['50%', '50%'],
            bold: true,
            body: [
              [
                {
                  text: 'Total Amount',
                  alignment: 'left',
                  bold: true,
                  margin: [0, 3, 0, 0],
                  fontSize: fontSizestext.data
                },
                {
                  text: this.currency +' '+ FooterSection.TotalAmount.toFixed(2),
                  alignment: 'right',
                  margin: [0, 3, 0, 0],
                  bold: true,
                  fontSize: fontSizestext.data
                },
              ],
            ]
          },
          layout: 'noBorders'
        },
        {
          table: {
            widths: ['50%', '50%'],
            bold: true,
            body: [
              [
                {
                  text: 'Shipping Amount',
                  alignment: 'left',
                  bold: true,
                  margin: [0, 3, 0, 0],
                  fontSize: fontSizestext.data
                },
                {
                  text: this.currency +' '+FooterSection.SippingAmount.toFixed(2),
                  alignment: 'right',
                  margin: [0, 3, 0, 0],
                  bold: true,
                  fontSize: fontSizestext.data
                },
              ],
            ]
          },
          layout: 'noBorders'
        },
        {
          table: {
            widths: ['50%', '50%'],
            bold: true,
            body: [
              [
                {
                  text: 'Final Amount',
                  alignment: 'left',
                  bold: true,
                  margin: [0, 3, 0, 0],
                  fontSize: fontSizestext.data
                },
                {
                  text: this.currency +' '+FooterSection.FinalAmount.toFixed(2),
                  alignment: 'right',
                  margin: [0, 3, 0, 0],
                  bold: true,
                  fontSize: fontSizestext.data
                },
              ],
            ]
          },
          layout: 'noBorders'
        },
        {stack: [
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 515,
                y2: 0,
                lineWidth: 0.7,
                lineColor: 'black'
              }
            ]
          }], margin: [0, 10, 0, 10]},
        {text: '\n'},
        { text: '***This is computer generated invoice and does not require sign and stamp***', alignment:"center", fontSize: fontSizestext.data },
        { text: `\nThank you for choosing ${ShopDetails.CompanyName}.`, alignment:"center", fontSize: fontSizestext.data },
        
      ],
   
       footer: function(currentPage:number, pageCount:number) {
        return {
           margin: [40, 10, 40, 0],
          stack: [
            {
              canvas: [
                {
                  type: 'line',
                  x1: 0,
                  y1: 0,
                  x2: 515,
                  y2: 0,
                  lineWidth: 0.5,
                  lineColor: 'black'
                }
              ]
            },
            {
              columns: [
                {
text: `Print Date: ${new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
}).replace(',', ' ~')}`,
                  fontSize:7.5,
                  alignment: 'left',
                  margin: [0, 5, 0, 0]
                },
                {
                  text: `Page ${currentPage} of ${pageCount}`,
                  fontSize: 7.5,
                  alignment: 'right',
                  margin: [0, 5, 0, 0]
                }
              ]
            }
          ]
        };
      },
      styles: {
        header: {
        fontSize: 7.5,
          bold: true,
          alignment: 'left',
          margin: [0, 0, 0, 10],
        }
      }
    };


    pdfMake.createPdf(this.docDefination).download(`Order ID -${this.OrderId}.pdf`);
    
  }

}
