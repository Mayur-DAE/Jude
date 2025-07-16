import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMembershipComponent } from './add-edit-membership.component';

describe('AddEditMembershipComponent', () => {
  let component: AddEditMembershipComponent;
  let fixture: ComponentFixture<AddEditMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMembershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
