import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyinvoiceComponent } from './companyinvoice.component';

describe('CompanyinvoiceComponent', () => {
  let component: CompanyinvoiceComponent;
  let fixture: ComponentFixture<CompanyinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
