import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOrderDeliveryTypeComponent } from './add-edit-order-delivery-type.component';

describe('AddEditOrderDeliveryTypeComponent', () => {
  let component: AddEditOrderDeliveryTypeComponent;
  let fixture: ComponentFixture<AddEditOrderDeliveryTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditOrderDeliveryTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditOrderDeliveryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
