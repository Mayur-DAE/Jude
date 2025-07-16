import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductcategoryComponent } from './show-productcategory.component';

describe('ShowProductcategoryComponent', () => {
  let component: ShowProductcategoryComponent;
  let fixture: ComponentFixture<ShowProductcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProductcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProductcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
