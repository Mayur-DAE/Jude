import { Component, OnInit, Input } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { SharedService } from 'src/app/shared.service';
declare function showSuccessToast(msg: any): any;


@Component({
  selector: 'app-show-company-sources',
  templateUrl: './show-company-sources.component.html',
  styleUrls: ['./show-company-sources.component.css']
})
export class ShowCompanySourcesComponent implements OnInit {

  constructor(private service: SharedService) { }
  CompanySourceList: any = [];
  ModalTitle: any;
  ActiveAddEditCompanySource: boolean = false;
  compsource: any;
  currentPage = 1;
  itemsPerPage = 5;

  @Input()
  CompanySourceID: any;
  CompanySource: any;
  IsActive: any;

  ngOnInit(): void {
    this.refreshCompanySourceList();
  }
  emittedDataByChild(data: boolean) {
    this.ActiveAddEditCompanySource = data;
    if (!data) {
      this.refreshCompanySourceList();
    }
  }
  addClick() {
    this.compsource = {
      CompanySourceID: 0,
      CompanySource: "",
      ModifiedBy: 1,
      IsActive: true
      
    }
    this.ModalTitle = "Add Shop Source";
    this.ActiveAddEditCompanySource = true;
  }
  editClick(item: any) {
    this.compsource = item;
    this.ModalTitle = "Edit Shop Source";
    this.ActiveAddEditCompanySource = true;
    this.refreshCompanySourceList();
  }
  closeClick() {
    this.ActiveAddEditCompanySource = false;
    this.refreshCompanySourceList();
  }
  refreshCompanySourceList() {
    let val = {}
    this.service.GetCompanySource(val).subscribe(data => {
      if (data["status_code"] == 100) {
        this.CompanySourceList = JSON.parse(data["message"]);
      }
    });
  }
  Inactive(item: any) {
    var val = {
      CompanySourceID: item.CompanySourceID,
      IsActive: 0,
      ModifiedBy: 1

    }
    this.service.updateIsActiveCompanySource(val).subscribe(data => {
      if (data["status_code"] == 100) {
        showSuccessToast("Source Inactivated Successfully");
      }
      else if (data["status_code"] == 300) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showSuccessToast("Some error occured, data not saved");
      }
      this.refreshCompanySourceList();
    });
  }


  Active(item: any) {
    var val = {
      CompanySourceID: item.CompanySourceID,
      IsActive: 1,
      ModifiedBy: 1
    }
    this.service.updateIsActiveCompanySource(val).subscribe(data => {
      if (data["status_code"] == 100) {
        showSuccessToast("Source Activated Successfully");
      }
      else if (data["status_code"] == 300) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showSuccessToast("Some error occured, data not saved");
      }
      this.refreshCompanySourceList();
    }
    );
  }

  get paginatedCompanySource() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.CompanySourceList.slice(start, start + this.itemsPerPage);
  }
  
  get totalPages() {
    return Math.ceil(this.CompanySourceList.length / this.itemsPerPage);
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
