import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

declare function showSuccessToast(msg: any): any;
declare function bindDataTable(id: any): any;
@Component({
  selector: 'app-show-businesstypes',
  templateUrl: './show-businesstypes.component.html',
  styleUrls: ['./show-businesstypes.component.css']
})
export class ShowBusinesstypesComponent implements OnInit {

  constructor(private service: SharedService) { }

  buinesstypeList: any = [];
  ModalTitle: any;
  ActivateAddEditbuinesstypeComp: boolean = false;
  bindDataTableDoIt = true;
  buinesstype: any;
  currentPage = 1;
  itemsPerPage = 5;

  @Input()
  BusinessTypeID: any;
  BusinessTypeName: any;

  ngOnInit(): void {
    this.refreshbuinesstypeList();
  }
  bindDatatableTS() {
    if (this.bindDataTableDoIt) {
      bindDataTable('order-listing');
      this.bindDataTableDoIt = false;
    }
  }
  addClick() {
    this.buinesstype = {
      BusinessTypeID: 0,
      BusinessTypeName: "",
      IsActive: true
    }
    this.ModalTitle = "Add Business Type";
    this.ActivateAddEditbuinesstypeComp = true;
  }
  emittedDataByChild(data: boolean) {
    this.ActivateAddEditbuinesstypeComp = data;
    if (!data) {
      this.refreshbuinesstypeList();
    }
  }
  editClick(item: any) {

    this.buinesstype = item;
    this.ModalTitle = "Edit Business Type";
    this.ActivateAddEditbuinesstypeComp = true;
  }
  closeClick() {
    this.ActivateAddEditbuinesstypeComp = false;
    this.refreshbuinesstypeList();
  }
  refreshbuinesstypeList() {
    this.currentPage = 1;
    let val = {}
    this.service.GetComplist(val).subscribe(data => {

      if (data["status_code"] == 100) {
        this.buinesstypeList = JSON.parse(data["message"]);
      }
    })
  }
  Inactive(item: any) {
    var val = {
      BusinessTypeID: item.BusinessTypeID,
      IsActive: 0
    }
    this.service.updateIsActiveBusinessTypeName(val).subscribe(data => {
      if (data["status_code"] == 100) {
        showSuccessToast("Business Inactivated Successfully");
      }
      else if (data["status_code"] == 300) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showSuccessToast("Some error occured, data not saved");
      }
      this.refreshbuinesstypeList();
    });
  }
  Active(item: any) {

    var val = {
      BusinessTypeID: item.BusinessTypeID,
      IsActive: 1
    }
    this.service.updateIsActiveBusinessTypeName(val).subscribe(data => {
      if (data["status_code"] == 100) {
        showSuccessToast("Business Activated Successfully");
      }
      else if (data["status_code"] == 300) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showSuccessToast("Some error occured, data not saved");
      }
      this.refreshbuinesstypeList();
    }
    );
  }

  
  get paginatedbusinesstypes() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.buinesstypeList.slice(start, start + this.itemsPerPage);
  }
  
  get totalPages() {
    return Math.ceil(this.buinesstypeList.length / this.itemsPerPage);
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
