import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEnquiryComponent } from './show-enquiry.component';

describe('ShowEnquiryComponent', () => {
  let component: ShowEnquiryComponent;
  let fixture: ComponentFixture<ShowEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowEnquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
