import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportExpiredShopComponent } from './report-expired-shop.component';

describe('ReportExpiredShopComponent', () => {
  let component: ReportExpiredShopComponent;
  let fixture: ComponentFixture<ReportExpiredShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportExpiredShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportExpiredShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
