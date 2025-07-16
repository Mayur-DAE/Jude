import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUsertypeComponent } from './show-usertype.component';

describe('ShowUsertypeComponent', () => {
  let component: ShowUsertypeComponent;
  let fixture: ComponentFixture<ShowUsertypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUsertypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowUsertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
