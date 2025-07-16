import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMembershipComponent } from './show-membership.component';

describe('ShowMembershipComponent', () => {
  let component: ShowMembershipComponent;
  let fixture: ComponentFixture<ShowMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMembershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
