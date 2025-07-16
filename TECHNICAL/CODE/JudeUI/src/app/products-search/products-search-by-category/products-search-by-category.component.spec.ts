import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSearchByCategoryComponent } from './products-search-by-category.component';

describe('ProductsSearchByCategoryComponent', () => {
  let component: ProductsSearchByCategoryComponent;
  let fixture: ComponentFixture<ProductsSearchByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsSearchByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSearchByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
