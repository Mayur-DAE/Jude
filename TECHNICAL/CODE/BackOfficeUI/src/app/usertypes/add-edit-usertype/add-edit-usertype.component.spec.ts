import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUsertypeComponent } from './add-edit-usertype.component';

describe('AddEditUsertypeComponent', () => {
  let component: AddEditUsertypeComponent;
  let fixture: ComponentFixture<AddEditUsertypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditUsertypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditUsertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
