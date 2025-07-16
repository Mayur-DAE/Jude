import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyproductComponent } from './companyproduct.component';

describe('CompanyproductComponent', () => {
  let component: CompanyproductComponent;
  let fixture: ComponentFixture<CompanyproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
