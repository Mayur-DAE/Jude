import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryorderreportComponent } from './summaryorderreport.component';

describe('SummaryorderreportComponent', () => {
  let component: SummaryorderreportComponent;
  let fixture: ComponentFixture<SummaryorderreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryorderreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryorderreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
