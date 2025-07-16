import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderWalletComponent } from './service-provider-wallet.component';

describe('ServiceProviderWalletComponent', () => {
  let component: ServiceProviderWalletComponent;
  let fixture: ComponentFixture<ServiceProviderWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceProviderWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProviderWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
