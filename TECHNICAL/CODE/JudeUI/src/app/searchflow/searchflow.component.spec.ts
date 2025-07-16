import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchflowComponent } from './searchflow.component';

describe('SearchflowComponent', () => {
  let component: SearchflowComponent;
  let fixture: ComponentFixture<SearchflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
