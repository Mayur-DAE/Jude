import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCompanySourcesComponent } from './show-company-sources.component';

describe('ShowCompanySourcesComponent', () => {
  let component: ShowCompanySourcesComponent;
  let fixture: ComponentFixture<ShowCompanySourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCompanySourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCompanySourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
