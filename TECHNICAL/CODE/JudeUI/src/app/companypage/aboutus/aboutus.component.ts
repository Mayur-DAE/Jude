import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
})
export class AboutusComponent implements OnInit {
  constructor(
    private service: SharedService,
    private activatedRoute: ActivatedRoute
  ) {}
  @Input()
  companydata: any = [];

  ngOnInit(): void {}
}
