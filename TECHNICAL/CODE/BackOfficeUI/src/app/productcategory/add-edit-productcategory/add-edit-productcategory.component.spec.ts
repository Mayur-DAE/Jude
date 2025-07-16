import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductcategoryComponent } from './add-edit-productcategory.component';

describe('AddEditProductcategoryComponent', () => {
  let component: AddEditProductcategoryComponent;
  let fixture: ComponentFixture<AddEditProductcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditProductcategoryComponent ]
    })
    .compileComponents();
  
    fixture = TestBed.createComponent(AddEditProductcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
