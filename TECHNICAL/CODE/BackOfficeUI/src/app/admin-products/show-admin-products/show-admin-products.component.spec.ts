import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAdminProductsComponent } from './show-admin-products.component';

describe('ShowAdminProductsComponent', () => {
  let component: ShowAdminProductsComponent;
  let fixture: ComponentFixture<ShowAdminProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAdminProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAdminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
