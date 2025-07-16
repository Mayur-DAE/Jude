import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSettlementComponent } from './show-settlement.component';

describe('ShowSettlementComponent', () => {
  let component: ShowSettlementComponent;
  let fixture: ComponentFixture<ShowSettlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSettlementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
