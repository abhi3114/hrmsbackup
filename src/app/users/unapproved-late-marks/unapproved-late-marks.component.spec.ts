import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnapprovedLateMarksComponent } from './unapproved-late-marks.component';

describe('UnapprovedLateMarksComponent', () => {
  let component: UnapprovedLateMarksComponent;
  let fixture: ComponentFixture<UnapprovedLateMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnapprovedLateMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnapprovedLateMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
