import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRevComponent } from './show-rev.component';

describe('ShowRevComponent', () => {
  let component: ShowRevComponent;
  let fixture: ComponentFixture<ShowRevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRevComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowRevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
