import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductsubcategoryComponent } from './add-edit-productsubcategory.component';

describe('AddEditProductsubcategoryComponent', () => {
  let component: AddEditProductsubcategoryComponent;
  let fixture: ComponentFixture<AddEditProductsubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditProductsubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditProductsubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
