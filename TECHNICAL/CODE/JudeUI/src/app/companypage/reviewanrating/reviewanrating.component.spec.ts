import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewanratingComponent } from './reviewanrating.component';

describe('ReviewanratingComponent', () => {
  let component: ReviewanratingComponent;
  let fixture: ComponentFixture<ReviewanratingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewanratingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewanratingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
