import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl } from '@angular/forms';

@Component({
  selector: 'app-businesstypes',
  templateUrl: './businesstypes.component.html',
  styleUrls: ['./businesstypes.component.css']
})
export class BusinesstypesComponent implements OnInit {
  BusinessForm =new FormGroup({
    BusinessTypeName: new FormControl(''),
  })
  constructor() { }

  ngOnInit(): void {
  }

}
