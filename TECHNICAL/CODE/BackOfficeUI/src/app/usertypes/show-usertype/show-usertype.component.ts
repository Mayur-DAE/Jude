import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

declare function showSuccessToast(msg:any): any;
declare function bindDataTable(id:any): any;

@Component({
  selector: 'app-show-usertype',
  templateUrl: './show-usertype.component.html',
  styleUrls: ['./show-usertype.component.css']
})
export class ShowUsertypeComponent implements OnInit 
{

  constructor(private service:SharedService) { }

  ModalTitle:any;
  ActivateAddEditUsertypeComp:boolean=false;
  utype:any;
  UsertypeList:any=[];
  bindDataTableDoIt = true;
  currentPage = 1;
  itemsPerPage = 5;
   
  ngOnInit(): void {
    this.refreshUsertypeList();
    
  }

  bindDatatableTS(){
    if(this.bindDataTableDoIt){
      bindDataTable('order-listing');
      this.bindDataTableDoIt = false;
    }
  }
  emittedDataByChild(data:boolean) {      
    this.ActivateAddEditUsertypeComp = data;
    if(!data){
      this.refreshUsertypeList();
    }
  }
  addClick(){
    this.utype={
      UserTypeID:0,
      UserType:'',
      IsActive: true
    }
    this.ModalTitle="Add User";
    this.ActivateAddEditUsertypeComp=true;
  }

  editClick(item:any){  
    
    this.utype=item;
    console.log(item)
    this.ModalTitle="Edit User";
    this.ActivateAddEditUsertypeComp=true;
  }

  closeClick(){
    this.ActivateAddEditUsertypeComp=false;
    this.refreshUsertypeList();
  }
  Inactive(item:any){
    var val = {
      UserTypeID:item.UserTypeID,
        IsActive:0
    }
    this.service.IsActiveUsertype(val).subscribe(data=>{
    if(data["status_code"] == 100){
      showSuccessToast("User Type Inactivated Successfully");
    }
    else if(data["status_code"] == 300){
      showSuccessToast(JSON.parse(data["message"])[0]["message"]);
    }
    else{
      showSuccessToast("Some error occured, data not saved");
    }


    this.refreshUsertypeList();
    });
  }


  Active(item:any){    
    var val = {
      UserTypeID:item.UserTypeID,
        IsActive:1
    }
    this.service.IsActiveUsertype(val).subscribe(data=>{

      console.log(data);
    
    if(data["status_code"] == 100){
      showSuccessToast("User Type Activated Successfully");
    }
    else if(data["status_code"] == 300){
      showSuccessToast(JSON.parse(data["message"])[0]["message"]);
    }
    else{
      showSuccessToast("Some error occured, data not saved");
    }

    this.refreshUsertypeList();
    });
  }
 
  refreshUsertypeList(){
    let val ={}
    this.service.getUsertypeList(val).subscribe(data=>{
      if(data["status_code"] == 100){
        this.UsertypeList= JSON.parse(data["message"]);
      }
      
    });
  } 

  get paginatedUsertypeList() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.UsertypeList.slice(start, start + this.itemsPerPage);
  }
  
  get totalPages() {
    return Math.ceil(this.UsertypeList.length / this.itemsPerPage);
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


