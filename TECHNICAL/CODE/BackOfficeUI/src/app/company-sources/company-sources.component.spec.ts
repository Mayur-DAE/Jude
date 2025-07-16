import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySourcesComponent } from './company-sources.component';

describe('CompanySourcesComponent', () => {
  let component: CompanySourcesComponent;
  let fixture: ComponentFixture<CompanySourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanySourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
