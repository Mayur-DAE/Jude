import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOffersComponent } from './add-edit-offers.component';

describe('AddEditOffersComponent', () => {
  let component: AddEditOffersComponent;
  let fixture: ComponentFixture<AddEditOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
