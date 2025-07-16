import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
declare function showSuccessToast(msg: any): any;
declare function showDangerToast(msg: any): any;
declare function closePopup(id: any): any;

@Component({
  selector: 'app-update-edit-rev',
  templateUrl: './update-edit-rev.component.html',
  styleUrls: ['./update-edit-rev.component.css']
})
export class UpdateEditRevComponent implements OnInit {
  @Output() emitData = new EventEmitter<boolean>();
  constructor(private service: SharedService, private_http: HttpClient) { }

  @Input()
  rev: any;
  CustomerCompanyRatingID: any;
  CustomerName: any;
  ActivateAddEditUsertypeComp: boolean = false;

  ngOnInit(): void {
    this.CustomerCompanyRatingID = this.rev.CustomerCompanyRatingID;
    this.CustomerName = this.rev.CustomerName;
  }

  updatepublish() {
    var val = {
      CustomerCompanyRatingID: this.CustomerCompanyRatingID,
      CustomerName: this.CustomerName,
    };
    this.service.updatepublishReview(val).subscribe(data => {
      if (data["status_code"] == 100) {
        closePopup('exampleModal');
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
        this.CustomerCompanyRatingID = 0;
        this.CustomerName = ''
      }
      else if (data["status_code"] == 300) {
        showSuccessToast(JSON.parse(data["message"])[0]["message"]);
      }
      else {
        showSuccessToast("Some error occured, data not saved");
      }
    });
  }
}
