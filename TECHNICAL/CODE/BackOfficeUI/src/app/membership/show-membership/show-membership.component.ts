import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
declare function showSuccessToast(msg: any): any;

@Component({
  selector: 'app-show-membership',
  templateUrl: './show-membership.component.html',
  styleUrls: ['./show-membership.component.css']
})
export class ShowMembershipComponent implements OnInit {

  constructor(private service: SharedService) { }
  membershipList: any = [];
  ModalTitle: any;
  AddEditMemberShipComponent: boolean = false;
  membership: any;
  currentPage = 1;
  itemsPerPage = 5;

  @Input()
  CompanyMemberShipTypeID: any;
  CompanyMemberShipName: any;
  CompanyMembershipFees: any;
  TaxSlabID: any;
  IsActive: any;
  ngOnInit(): void {
    this.refreshmembershipList();
  }
  emittedDataByChild(data: boolean) {
    this.AddEditMemberShipComponent = data;
    if (!data) {
      this.refreshmembershipList();
    }
  }
  addClick() {
    this.membership = {
      CompanyMemberShipTypeID: 0,
      CompanyMemberShipName: "",
      CompanyMembershipFees: "",
      TaxSlabID: "",
      IsActive: true
    }
    this.ModalTitle = "Add Membership";
    this.AddEditMemberShipComponent = true;
   
  }

  editClick(item: any) {
    this.membership = item;
    this.ModalTitle = "Edit Membership";
    this.AddEditMemberShipComponent = true;
    this.refreshmembershipList();
  }
  closeClick() {
    this.AddEditMemberShipComponent = false;
    this.refreshmembershipList();
  }
  refreshmembershipList() {
    let val = {}
    this.service.GetCompanyMemberShip(val).subscribe(data => {
      this.membershipList = JSON.parse(data["message"]);
    });
  }
  Inactive(item: any) {
    var val = {
      CompanyMemberShipTypeID: item.CompanyMemberShipTypeID,
      IsActive: 0
    }
    this.service.UpdateIsActiveMembership(val).subscribe(data => {

      if (data["status_code"] == 100) {
        showSuccessToast("Membership Inactivated Successfully");
      }
      else if (data["status_code"] == 300) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showSuccessToast("Some error occured, data not saved");
      }
      this.refreshmembershipList();
    });
  }
  Active(item: any) {
    
    var val = {
      CompanyMemberShipTypeID: item.CompanyMemberShipTypeID,
      IsActive: 1
    }
    this.service.UpdateIsActiveMembership(val).subscribe(data => {
      if (data["status_code"] == 100) {
        showSuccessToast("Membership Activated Successfully");
      }
      else if (data["status_code"] == 300) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showSuccessToast("Some error occured, data not saved");
      }
      this.refreshmembershipList();
    });
  }
  
  get paginatedMemberships() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.membershipList.slice(start, start + this.itemsPerPage);
  }
  
  get totalPages() {
    return Math.ceil(this.membershipList.length / this.itemsPerPage);
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





