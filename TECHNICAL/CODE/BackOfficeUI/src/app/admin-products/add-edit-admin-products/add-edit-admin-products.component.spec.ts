import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAdminProductsComponent } from './add-edit-admin-products.component';

describe('AddEditAdminProductsComponent', () => {
  let component: AddEditAdminProductsComponent;
  let fixture: ComponentFixture<AddEditAdminProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAdminProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAdminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
