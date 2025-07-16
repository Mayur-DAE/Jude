import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSettlementComponent } from './add-edit-settlement.component';

describe('AddEditSettlementComponent', () => {
  let component: AddEditSettlementComponent;
  let fixture: ComponentFixture<AddEditSettlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSettlementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
