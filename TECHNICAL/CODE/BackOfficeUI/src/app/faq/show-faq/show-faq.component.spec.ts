import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFaqComponent } from './show-faq.component';

describe('ShowFaqComponent', () => {
  let component: ShowFaqComponent;
  let fixture: ComponentFixture<ShowFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFaqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
