import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEditRevComponent } from './update-edit-rev.component';

describe('UpdateEditRevComponent', () => {
  let component: UpdateEditRevComponent;
  let fixture: ComponentFixture<UpdateEditRevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEditRevComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateEditRevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
