import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverypricesettlementComponent } from './deliverypricesettlement.component';

describe('DeliverypricesettlementComponent', () => {
  let component: DeliverypricesettlementComponent;
  let fixture: ComponentFixture<DeliverypricesettlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverypricesettlementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverypricesettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
