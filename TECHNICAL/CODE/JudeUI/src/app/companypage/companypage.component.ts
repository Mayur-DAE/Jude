import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-companypage',
  templateUrl: './companypage.component.html',
  styleUrls: ['./companypage.component.css'],
})
export class CompanypageComponent implements OnInit {
  @Input()
  CompanyLogoImageNamePath: any;
  companydata: any = [];
  CompanyID: any;
  selectedLanguageId: string | null = '';

  constructor(private route: ActivatedRoute, private service: SharedService) {
    this.route.params.subscribe((params: Params) => {
      if (params['id'] != '') {
        this.CompanyID = params['id'];
        this.service.setCompanyID(this.CompanyID);
        this.refreshCompanydata();
      }
    });
  }

  ngOnInit(): void {
    this.CompanyID = this.route.snapshot.params['id'];
    this.CompanyLogoImageNamePath = this.service.PhotoUrl;
    this.refreshCompanydata();
    this.service.setCompanyID(this.CompanyID);
    this.selectedLanguageId = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : "1"; 

  }

  refreshCompanydata() {
    this.selectedLanguageId = localStorage.getItem('selectedLanguage') || "1";
    var val: any = {LanguageID: this.selectedLanguageId};
    if (this.CompanyID?.trim().length !== 0) {
      val.CompanyID = this.CompanyID;
    }

    this.service.getCompanyName(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.companydata = JSON.parse(data['message']);
        // 
      }
    });
  }
}
