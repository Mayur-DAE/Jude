import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service'; 
@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  CartID: any;
  CartCount = 0;
  selectedLanguageId: string | null = '';
  constructor(private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.cartCount$.subscribe((count) => {
      this.CartCount = count;
      //
    });
    this.getCount();
    this.selectedLanguageId = localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : "1"; 

  }

  getCount() {
    this.CartID = localStorage.getItem('CartID');
    this.selectedLanguageId = localStorage.getItem('selectedLanguage') || "1";
    if (this.CartID != null) {
      var val: any = { CartID: this.CartID,  LanguageID: this.selectedLanguageId };
      this.sharedService.getCartProducts(val).subscribe((data) => {
        if (data['status_code'] == 100) {
          var CartProductsList = JSON.parse(data['message']);
          this.CartCount = CartProductsList.length;
          // 
          this.sharedService.updateCartCount(this.CartCount);
        }
      });
    }
    else {
      this.sharedService.updateCartCount(0);
    }
  }
  yourCart() {
    this.CartID = localStorage.getItem('CartID');
    this.router.navigateByUrl('/Yourcart/' + this.CartID);
  }

}
