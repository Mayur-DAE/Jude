import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDeliveryTypeComponent } from './order-delivery-type.component';

describe('OrderDeliveryTypeComponent', () => {
  let component: OrderDeliveryTypeComponent;
  let fixture: ComponentFixture<OrderDeliveryTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDeliveryTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDeliveryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
