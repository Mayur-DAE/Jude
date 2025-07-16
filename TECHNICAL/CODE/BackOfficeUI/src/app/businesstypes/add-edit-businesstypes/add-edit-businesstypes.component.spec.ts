import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBusinesstypesComponent } from './add-edit-businesstypes.component';

describe('AddEditBusinesstypesComponent', () => {
  let component: AddEditBusinesstypesComponent;
  let fixture: ComponentFixture<AddEditBusinesstypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBusinesstypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBusinesstypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
