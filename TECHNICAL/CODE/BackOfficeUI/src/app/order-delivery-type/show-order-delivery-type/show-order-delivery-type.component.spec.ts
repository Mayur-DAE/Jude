import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrderDeliveryTypeComponent } from './show-order-delivery-type.component';

describe('ShowOrderDeliveryTypeComponent', () => {
  let component: ShowOrderDeliveryTypeComponent;
  let fixture: ComponentFixture<ShowOrderDeliveryTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOrderDeliveryTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOrderDeliveryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
