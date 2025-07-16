import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelPartnerSignUpComponent } from './channel-partner-sign-up.component';

describe('ChannelPartnerSignUpComponent', () => {
  let component: ChannelPartnerSignUpComponent;
  let fixture: ComponentFixture<ChannelPartnerSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelPartnerSignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelPartnerSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
