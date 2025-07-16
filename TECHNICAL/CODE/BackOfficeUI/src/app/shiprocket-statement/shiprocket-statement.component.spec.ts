import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiprocketStatementComponent } from './shiprocket-statement.component';

describe('ShiprocketStatementComponent', () => {
  let component: ShiprocketStatementComponent;
  let fixture: ComponentFixture<ShiprocketStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiprocketStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiprocketStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
