import { Component, OnInit,Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

declare function showSuccessToast(msg:any): any;
declare function showDangerToast(msg:any): any;
declare function excelExport(id: any, name:string): any;

interface Faq{
SrNo:number;
FAQTitle: string;
FAQAnswer: string;
IsApproved:boolean;
IsPublished:boolean;
}

@Component({
  selector: 'app-show-faq',
  templateUrl: './show-faq.component.html',
  styleUrls: ['./show-faq.component.css']
})
export class ShowFaqComponent implements OnInit {

  constructor(private service:SharedService) { }

  FaqList:any=[];
  ModalTitle:any;
  ActivateAddEditfaq:boolean=false;
  faq:any;
  currentPage = 1;
  itemsPerPage = 5;

  @Input() 
  FAQID:any;
  IsApproved:any;
  IsPublished:any;


  ngOnInit(): void {
    this.refreshFaqList();
  }

  emittedDataByChild(data:boolean) {      
    this.ActivateAddEditfaq = data;
    if(!data){
      this.refreshFaqList();
    }
  }

  addClick(){
    this.faq={
      FAQID:0,
      FAQTitle:"",
      FAQAnswer:"",
      IsApproved:true,
      IsPublished:true
    }
    this.ModalTitle="Add FAQ";
    this.ActivateAddEditfaq=true;
  }

  closeClick(){
    this.ActivateAddEditfaq=false;
    this.refreshFaqList();
  }

  editClick(item:any){
    console.log(item);
    this.faq=item;    
    this.ModalTitle="Edit FAQ"
    this.ActivateAddEditfaq=true;
  }
  
  refreshFaqList(){
    let val ={}
    this.service.getfaqList(val).subscribe(data=>{
      if(data["status_code"]==100){
        this.FaqList=JSON.parse(data["message"]);
      }
     });
  }

  Unapproved(item: any) {
    this.Unpublishboth(item.FAQID);
    var val = {
      FAQID: item.FAQID,
      IsApproved: 0
    }
    this.service.updateapproval(val).subscribe(data => {
      if (data["status_code"] == 100) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else if (data["status_code"] == 300) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showSuccessToast("Some error occured, data not saved");
      }
      this.refreshFaqList();
    }
    );
  }
  Unpublishboth(FAQID: any) {
    var val = {
      FAQID:FAQID,
      IsPublished: 0
    }
    this.service.updatepublish(val).subscribe(data => {
      if (data["status_code"] == 100) {
        
      }
      else if (data["status_code"] == 300) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showSuccessToast("Some error occured, data not saved");
      }
      this.refreshFaqList();
    }
    );
  }

  approved(item: any) {
    console.log(item);
    var val = {
      FAQID: item.FAQID,
      IsApproved: 1
    }
    this.service.updateapproval(val).subscribe(data => {
      if (data["status_code"] == 100) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else if (data["status_code"] == 300) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showSuccessToast("Some error occured, data not saved");
      }
      this.refreshFaqList();
    }
    );
  }

  Unpublish(item: any) {
    var val = {
      FAQID: item.FAQID,
      IsPublished: 0
    }
    this.service.updatepublish(val).subscribe(data => {
      if (data["status_code"] == 100) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else if (data["status_code"] == 300) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showSuccessToast("Some error occured, data not saved");
      }
      this.refreshFaqList();
    }
    );
  }

  Publish(item: any) {
    var val = {
      FAQID: item.FAQID,
      IsPublished: 1
    }
    this.service.updatepublish(val).subscribe(data => {
      if (data["status_code"] == 100) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else if (data["status_code"] == 300) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showSuccessToast("Some error occured, data not saved");
      }
      this.refreshFaqList();
    }
    );
  }
  // exportToExcel(){
  //   excelExport("show-faq","FAQ");
  //   console.log(this.FaqList);
  // }

  exportToExcel(): void {
  
    let htmlContent = `
      <table border="1">
        <thead>
          <tr>
            <th><b>Sr No</b></th>
            <th><b>FAQ Title</b></th>
            <th><b>FAQ Answer</b></th>
            <th><b>Approval</b></th>
            <th><b>Publish</b></th>
          </tr>
        </thead>
        <tbody>
    `;
  
    this.FaqList.forEach((faq: Faq, index: number) => {
      const Approval = faq.IsApproved ? "Approved" : "Pending";
      const Publish = faq.IsPublished ? "Published" : ""; 
  
      htmlContent += `
        <tr>
          <td>${index + 1}</td>  
          <td>${faq.FAQTitle}</td>
          <td>${faq.FAQAnswer}</td>
          <td>${Approval}</td>
          <td>${Publish}</td>
        </tr>
      `;
    });
  
    htmlContent += `</tbody></table>`;
  
    let blob = new Blob([htmlContent], { type: "application/vnd.ms-excel" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "FAQ.xls";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  get paginatedFAQ() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.FaqList.slice(start, start + this.itemsPerPage);
  }
  
  get totalPages() {
    return Math.ceil(this.FaqList.length / this.itemsPerPage);
  }
  
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }
  
  min(a: number, b: number) {
    return Math.min(a, b);
  }
  
  getMiddlePages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    
    if (total <= 5) return Array.from({ length: total - 2 }, (_, i) => i + 2);
  
    if (current <= 3) return [2, 3, 4,5];
    if (current >= total - 2) return [total - 3, total - 2, total - 1];
  
    return [current - 1, current, current + 1];
  }
  
  onItemsPerPageChange(event: Event) {
    this.itemsPerPage = +(event.target as HTMLSelectElement).value;
    this.currentPage = 1;
  }

}