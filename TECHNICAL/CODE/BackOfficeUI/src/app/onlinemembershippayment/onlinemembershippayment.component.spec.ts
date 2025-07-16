import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinemembershippaymentComponent } from './onlinemembershippayment.component';

describe('OnlinemembershippaymentComponent', () => {
  let component: OnlinemembershippaymentComponent;
  let fixture: ComponentFixture<OnlinemembershippaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlinemembershippaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinemembershippaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
