import { Component,Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-add-edit-settlement',
  templateUrl: './add-edit-settlement.component.html',
  styleUrls: ['./add-edit-settlement.component.css']
})
export class AddEditSettlementComponent implements OnInit {

  constructor(private service:SharedService, private_http:HttpClient) { }
 
  @Input()
  settlement:any;
  CustomerList:any;
  FromDate:any;
  ToDate:any;
  UserID:any;
  UsersList:any=[];

  ngOnInit(): void {
    this.CustomerList = this.settlement.CustomerList;
    this.FromDate = this.settlement.FromDate;
    this.ToDate = this.settlement.ToDate;
    this.UsersList=this.UsersList;
    this.UserID=this.UserID;
    this.loadUserList()
  }
  loadUserList(){
    let val = {}
    this.service.getUsertypeList(val).subscribe((data:any)=>{
      this.UsersList=data;    
    });
  }
}
