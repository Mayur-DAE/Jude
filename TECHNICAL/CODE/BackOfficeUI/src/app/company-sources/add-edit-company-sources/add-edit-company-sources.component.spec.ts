import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCompanySourcesComponent } from './add-edit-company-sources.component';

describe('AddEditCompanySourcesComponent', () => {
  let component: AddEditCompanySourcesComponent;
  let fixture: ComponentFixture<AddEditCompanySourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCompanySourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCompanySourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
