import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-show-enquiry',
  templateUrl: './show-enquiry.component.html',
  styleUrls: ['./show-enquiry.component.css']
})
export class ShowEnquiryComponent implements OnInit {

 EnquiryList:any=[];
 selectedEnquiry: any = null;
 currentPage = 1;
 itemsPerPage = 5;

  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.refreshEnquiryList();
  }

  refreshEnquiryList(){
    let val ={}
    this.service.getenquiry(val).subscribe(data=>{
      if(data["status_code"]==100){
        this.EnquiryList=JSON.parse(data["message"]);
      }
     });
  }

  openModal(enquiry: any) {
    this.selectedEnquiry = enquiry;
  }

  get paginatedEnquiry() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.EnquiryList.slice(start, start + this.itemsPerPage);
  }
  
  get totalPages() {
    return Math.ceil(this.EnquiryList.length / this.itemsPerPage);
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
