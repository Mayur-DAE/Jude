import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesstypesComponent } from './businesstypes.component';

describe('BusinesstypesComponent', () => {
  let component: BusinesstypesComponent;
  let fixture: ComponentFixture<BusinesstypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinesstypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinesstypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
