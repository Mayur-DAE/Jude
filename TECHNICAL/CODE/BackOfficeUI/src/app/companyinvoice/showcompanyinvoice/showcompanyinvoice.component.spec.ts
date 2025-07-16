import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcompanyinvoiceComponent } from './showcompanyinvoice.component';

describe('ShowcompanyinvoiceComponent', () => {
  let component: ShowcompanyinvoiceComponent;
  let fixture: ComponentFixture<ShowcompanyinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowcompanyinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcompanyinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
