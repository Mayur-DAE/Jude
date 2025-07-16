import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css'],
})
export class OrderSuccessComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  OrderID: any;
  ngOnInit(): void {
    this.OrderID = this.route.snapshot.params['id'];
    
  }
}
