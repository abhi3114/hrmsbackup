import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedMissingAttendanceComponent } from './approved-missing-attendance.component';

describe('ApprovedMissingAttendanceComponent', () => {
  let component: ApprovedMissingAttendanceComponent;
  let fixture: ComponentFixture<ApprovedMissingAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedMissingAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedMissingAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
