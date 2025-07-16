import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivaryPolicyComponent } from './privary-policy.component';

describe('PrivaryPolicyComponent', () => {
  let component: PrivaryPolicyComponent;
  let fixture: ComponentFixture<PrivaryPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivaryPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivaryPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
