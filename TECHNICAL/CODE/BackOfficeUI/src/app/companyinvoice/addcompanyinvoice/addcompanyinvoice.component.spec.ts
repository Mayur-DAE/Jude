import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcompanyinvoiceComponent } from './addcompanyinvoice.component';

describe('AddcompanyinvoiceComponent', () => {
  let component: AddcompanyinvoiceComponent;
  let fixture: ComponentFixture<AddcompanyinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcompanyinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcompanyinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
