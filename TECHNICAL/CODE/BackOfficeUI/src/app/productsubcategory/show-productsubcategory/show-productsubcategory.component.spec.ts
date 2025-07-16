import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductsubcategoryComponent } from './show-productsubcategory.component';

describe('ShowProductsubcategoryComponent', () => {
  let component: ShowProductsubcategoryComponent;
  let fixture: ComponentFixture<ShowProductsubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProductsubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProductsubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
