import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBusinesstypesComponent } from './show-businesstypes.component';

describe('ShowBusinesstypesComponent', () => {
  let component: ShowBusinesstypesComponent;
  let fixture: ComponentFixture<ShowBusinesstypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBusinesstypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBusinesstypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
