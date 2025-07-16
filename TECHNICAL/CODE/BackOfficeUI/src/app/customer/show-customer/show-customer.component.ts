import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

declare function showSuccessToast(msg:any): any;
declare function showDangerToast(msg:any): any;
declare function bindDataTable():any;
declare function excelExport(id: any, name:string): any;

interface EndUser{
  Srno : number;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  UserType: string;
  EmaiID:string;
  MobileNumber:number;
}

@Component({
  selector: 'app-show-customer',
  templateUrl: './show-customer.component.html',
  styleUrls: ['./show-customer.component.css']
})
export class ShowCustomerComponent implements OnInit {

  constructor(private service:SharedService) { }
  customerList:any=[];
  ModalTitle:any;
  ActivateAddEditfaq:boolean=false;
  user:any;
  currentPage = 1;
  itemsPerPage = 5;

  ngOnInit(): void {
    this.refresMemberList();
  }
  emittedDataByChild(data: boolean) {
    this.ActivateAddEditfaq = data;
    if (!data) {
      // this.onUserRoles();
      this.refresMemberList();
    }
  }


  closeClick(){
    this.ActivateAddEditfaq=false;
    this.refresMemberList();
  }

  editClick(item:any){ 
    console.log("item",item)
    this.user=item;    
    this.ModalTitle="Edit User"
    this.ActivateAddEditfaq=true;

  }

  refresMemberList(){    
    let val = {
      UserTypeID: 5
    }
    this.service.getUsersList(val).subscribe(data=>{        
      if(data["status_code"]== 100){
        this.customerList= JSON.parse(data["message"]);         
       }    
    });
  }
  // exportToExcel(){
  //   excelExport("show-enduser","EndUser");
  //   console.log(this.customerList);
  // }

  exportToExcel(): void {
    let htmlContent = `
      <table border="1">
        <thead>
          <tr>
            <th><b>Sr no</b></th>
            <th><b>Name</b></th>
            <th><b>Type</b></th>
            <th><b>Email</b></th>
            <th><b>Mobile Number</b></th>
          </tr>
        </thead>
        <tbody>
    `;
  
    this.customerList.forEach((user: EndUser, index: number) => {
      const fullName = `${user.FirstName} ${user.LastName}`;
  
      htmlContent += `
        <tr>
          <td>${index + 1}</td> 
          <td>${fullName}</td>
          <td>${user.UserType}</td>
          <td>${user.EmaiID}</td>
          <td>${user.MobileNumber}</td>
        </tr>
      `;
    });
  
    htmlContent += `</tbody></table>`;
  
    let blob = new Blob([htmlContent], { type: "application/vnd.ms-excel" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "EndUsers.xls";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } 

  get paginatedCustomer() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.customerList.slice(start, start + this.itemsPerPage);
  }
  
  get totalPages() {
    return Math.ceil(this.customerList.length / this.itemsPerPage);
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
