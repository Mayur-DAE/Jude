import { Component, Input, OnInit, EventEmitter, Output, Pipe, PipeTransform } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SharedService } from 'src/app/shared.service';
import * as pdfMake from 'pdfmake/build/pdfmake';

@Component({
  selector: 'app-generateinvoice',
  templateUrl: './generateinvoice.component.html',
  styleUrls: ['./generateinvoice.component.css']
})
export class GenerateinvoiceComponent implements OnInit {
  @Output() emitData = new EventEmitter<boolean>();

  constructor(private service: SharedService) { }
  @Input()
  Invoicedata: any;
  pdf: any;
  InvoiceNumber: any;
  InvoiceDate: any;
  CompanyName: any;
  Address1: any;
  Address2: any;
  CityName: any;
  StateName: any;
  CountryName: any;
  Zip: any;
  CompanyMobileNo1: any;
  // CompanyGSTNumber: any;
  InvoiceAmount: any;
  TaxSlabPercentage: any;
  CGST: any;
  SGST: any;
  InvoiceTotal: any;
  CompanyMemberShipName: any;
  CompanyMemberShipExpiryDate: any;
  CompanyMemberShipStartDate: any;

  days: any;
  countrydata: any = [];
  currency: any;
  CompanyLogoPath: any;
  pdfMakeModule: any;
  pdfFontsModule: any;
  pdfMake: any;
  docDefination: any = {};
  
  ngOnInit(): void {
    console.log(this.Invoicedata);

    this.InvoiceNumber = this.Invoicedata.InvoiceNumber;
    this.InvoiceDate = this.Invoicedata.InvoiceDate;
    this.CompanyName = this.Invoicedata.CompanyName;
    this.Address1 = this.Invoicedata.Address1;
    this.Address2 = this.Invoicedata.Address2;
    this.CityName = this.Invoicedata.CityName;
    this.StateName = this.Invoicedata.StateName;
    this.CountryName = this.Invoicedata.CountryName;
    this.Zip = this.Invoicedata.Zip;
    this.CompanyMobileNo1 = this.Invoicedata.CompanyMobileNo1;
    // this.CompanyGSTNumber = this.Invoicedata.CompanyGSTNumber;
    this.InvoiceAmount = this.Invoicedata.InvoiceAmount;
    this.TaxSlabPercentage = this.Invoicedata.TaxSlabPercentage;
    this.CGST = this.Invoicedata.CGST;
    this.SGST = this.Invoicedata.SGST;
    this.InvoiceTotal = this.Invoicedata.InvoiceTotal;
    this.CompanyMemberShipName = this.Invoicedata.CompanyMemberShipName;
    //this.days=this.Invoicedata.CompanyMemberShipStartDate-this.Invoicedata.CompanyMemberShipExpiryDate;
    this.CompanyMemberShipExpiryDate = this.Invoicedata.CompanyMemberShipExpiryDate;
    this.CompanyMemberShipStartDate = this.Invoicedata.CompanyMemberShipStartDate;
    //this.days= ((Date.UTC(this.CompanyMemberShipExpiryDate.getFullYear(), this.CompanyMemberShipExpiryDate.getMonth(), this.CompanyMemberShipExpiryDate.getDate()) - Date.UTC(this.CompanyMemberShipStartDate.getFullYear(), this.CompanyMemberShipStartDate.getMonth(), this.CompanyMemberShipStartDate.getDate()) ) /(1000 * 60 * 60 * 24));
    this.currencySign();
    this.loadLibs()





  }

  // isGeneratingPDF: boolean = false;

  // public openPDF(): void {
  //   this.isGeneratingPDF = true;
  
  //   setTimeout(() => {
  //     let DATA: any = document.getElementById('htmlData');
  //     if (!DATA) {
  //      alert("Content not available to export.")
  //       this.isGeneratingPDF = false;
  //       return;
  //     }
  
  //     html2canvas(DATA).then((canvas) => {
  //       let fileWidth = 208;
  //       let fileHeight = (canvas.height * fileWidth) / canvas.width;
  //       const FILEURI = canvas.toDataURL('image/png');
  //       let PDF = new jsPDF('p', 'mm', 'a4');
  //       let position = 0;
  //       PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
  //       PDF.save(this.InvoiceNumber + '.pdf');
  //       this.isGeneratingPDF = false;
  //     }).catch((err) => {
  //       console.error("PDF generation failed:", err);
  //       this.isGeneratingPDF = false;
  //     });
  //   }, 100);
  // }
  

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

  openPDF(){
    console.log("clicked");
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
          { text: item.CompanyMemberShipName.toString(), bold: false, fontSize: this.fontSizes.data, fontWeight: 300, alignment: 'left', margin: [0, 5, 0, 0] } as any,
          { text: "( " + 
              new Date(item.CompanyMemberShipStartDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) + 
              " - " + 
              new Date(item.CompanyMemberShipExpiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) + 
              " )",
            bold: false, fontSize: this.fontSizes?.data,alignment: 'left', margin: [0, 5, 0, 0] } as any,
         { text: this.currency+' '+item.InvoiceAmount.toFixed(2), bold: false, fontSize: this.fontSizes?.data, alignment: 'right', margin: [10, 5, 0, 0] } as any,
        ]);
      });
  
      return rows;
  }
  async generatePDF(){
       console.log("clicked");
    this.pdfMake = this.pdfMakeModule.default;
    (pdfMake as any).vfs = this.pdfFontsModule.default.vfs;
    

    const fontSizestext = 
    {
      data: 10,
      heading: 12,
      note: 11,
    };
    const imageUrl = 'assets/images/backoffice/jude-logo.png';
    // const Shoplogo =this.CompanyLogoPath + 'listing/' + this.CompanyLogoPath?.CompanyLogoPath;
    const imageBase64 = await this.getBase64FromUrl(imageUrl);

    const InvoiceToDetails ={
      ToName:"Jude",
      ToHouseNo:"Abebe Kebede",
      ToArea:" Churchill Avenue No. 123",
      ToCity:"1000 Addis Ababa",
      ToState:"ETHIOPIA",
      ToEmailID:"info@jude.com",
      ToWebsite:"www.jude.in"
    }
      const ShopDetails ={
      CompanyName:this.CompanyName,
      CompanyAddress:this.Address1 +
      ", " +this.Address2+
      // ", " +this.CityName+
      // ", " +this.StateName+
      ", " +this.CountryName,
      CompanyPhone:this.CompanyMobileNo1,
      // CompanyLogo:await this.getBase64FromUrl(Shoplogo),
    }
    const FooterSection ={
      SubTotal:this.InvoiceAmount,
      Tax:this.CGST + this.SGST,
      TotalAmount:this.InvoiceTotal
    }
    this.docDefination = {
       
      content: [
        {
          image: imageBase64,
          width: 100, // Adjust width as needed
          alignment: 'center'
        },
        { text: 'Membership Invoice', style: 'title', alignment: 'center', fontSize: fontSizestext.note, bold: true },
        { text: '\n' },
        { text: `Invoice Date : ${this.formatDate(this.InvoiceDate)}`, alignment: 'left', fontSize: fontSizestext.data },
        { text: `Invoice Number: ${this.InvoiceNumber}`, alignment: 'left', fontSize: fontSizestext.data },
        { text: '\n' },
        {
          columns: [
            {
              width: 150,
              stack: [
                { text: InvoiceToDetails.ToName, bold: true, alignment: 'left', fontSize: 12 },
                { text: InvoiceToDetails.ToHouseNo + ' ' + InvoiceToDetails.ToArea, alignment: 'left', fontSize: fontSizestext.data },
                { text: InvoiceToDetails.ToCity, alignment: 'left', fontSize: fontSizestext.data },
                { text: `Email ID : ${InvoiceToDetails.ToEmailID}`, alignment: 'left', fontSize: fontSizestext.data },
                { text: `Website : ${InvoiceToDetails.ToWebsite}`, alignment: 'left', fontSize: fontSizestext.data }
              ]
            },
            {
              width: 150,
              stack: [
                ...(ShopDetails.CompanyName ? [{ text: ShopDetails.CompanyName, bold: true, alignment: 'left', fontSize: 12}] : []),
                ...(ShopDetails.CompanyAddress ? [{ text: ShopDetails.CompanyAddress, alignment: 'left', fontSize: fontSizestext.data }] : []),
                ...(ShopDetails.CompanyPhone ? [{ text: `Contact : ${ShopDetails.CompanyPhone}`, alignment: 'left', fontSize: fontSizestext.data }] : [])
              ]
            }
          ],
          columnGap: 210
        },
        { text: '\n' },
        {
          table: {
            widths: ['40%','40%', '20%'],
            innerHeight: ['10%','10%','10%'],
            body: [
              [
                { text: 'Membership Type', bold: true, color: 'white',fillColor: '#00a300', margin: [0, 3, 0, 3], alignment: 'left', fontSize: fontSizestext.note },
                { text: 'Membership Duration', bold: true,  color: 'white',fillColor: '#00a300', margin: [0, 3, 0, 3 ], alignment: 'left', fontSize: fontSizestext.note },
                { text: 'Amount', bold: true,  color: 'white',fillColor: '#00a300', margin: [0, 3, 0, 3], alignment: 'right', fontSize: fontSizestext.note },
              ]
            ]
          },
          layout: {
            hLineWidth: () => 0,
            vLineWidth: () => 0,
          }
        },
        {
          table: {
            //headerRows: 1,
            widths: ['40%','40%', '20%'],
            // border: [true, true, true, true],
            body: [
              ...this.generateTableRows(Array.isArray(this.Invoicedata) ? this.Invoicedata : [this.Invoicedata]),
            ]
          },
          layout: {
            hLineWidth: (i: number, node: any) => 0,
            vLineWidth: (i: number) => 0,
          }
        },
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
                  text: 'Sub Total',
                  alignment: 'left',
                  bold: true,
                  margin: [0, 3, 0, 0],
                  fontSize: fontSizestext.data
                },
                {
                  text: this.currency+' '+FooterSection.TotalAmount.toFixed(2),
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
                  text: 'Tax',
                  alignment: 'left',
                  bold: true,
                  margin: [0, 3, 0, 0],
                  fontSize: fontSizestext.data
                },
                {
                  text: this.currency+' '+FooterSection.Tax.toFixed(2),
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
                  text: 'Total Amount',
                  alignment: 'left',
                  bold: true,
                  margin: [0, 3, 0, 0],
                  fontSize: fontSizestext.data
                },
                {
                  text: this.currency+' '+FooterSection.TotalAmount.toFixed(2),
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

        { text: '***This is computer generated invoice and does not require sign and stamp***', alignment:"center", fontSize: fontSizestext.data },
        { text: `\nThank you for choosing Jude.`, alignment:"center", fontSize: fontSizestext.data },
        
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

    pdfMake.createPdf(this.docDefination).download(`Invoice Number -${this.InvoiceNumber}.pdf`);
    
  }

}
