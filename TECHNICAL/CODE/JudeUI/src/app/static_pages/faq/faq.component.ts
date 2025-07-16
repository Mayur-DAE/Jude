import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {
  constructor(private service: SharedService) {}

  FaqList: any = [];

  ngOnInit(): void {
    this.refreshFaqList();
  }
  refreshFaqList() {
    let val = { IsPublished: 1 };
    this.service.getfaqList(val).subscribe((data) => {
      if (data['status_code'] == 100) {
        this.FaqList = JSON.parse(data['message']);
      }
    });
  }
}
