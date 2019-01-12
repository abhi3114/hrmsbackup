import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnapprovedMissingAttendanceComponent } from './unapproved-missing-attendance.component';

describe('UnapprovedMissingAttendanceComponent', () => {
  let component: UnapprovedMissingAttendanceComponent;
  let fixture: ComponentFixture<UnapprovedMissingAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnapprovedMissingAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnapprovedMissingAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
